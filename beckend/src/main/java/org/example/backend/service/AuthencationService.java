package org.example.backend.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.example.backend.dto.request.LoginRequest;
import org.example.backend.dto.response.AccountResponse;
import org.example.backend.dto.response.LoginResponse;
import org.example.backend.dto.response.RefeshReponse;
import org.example.backend.entity.Account;
import org.example.backend.entity.Token;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.AccountRepository;
import org.example.backend.repository.TokenRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthencationService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${spring.sercurity.sigKey}")
    private String SIG_KEY;

    @Value("${jwt.ExpirationTime}")
    private long EXPIRATION_TIME;

    @Value("${jwt.refreshTime}")
    private long REFESH_TIME;


    //Method for login

    public LoginResponse login(LoginRequest request) {

        Account account = accountRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_EXIST));

        PasswordEncoder encoder = new BCryptPasswordEncoder(10);
        boolean check = encoder.matches(request.getPassword(), account.getPassword());

        //If passowrd not matched throw Exception
        if (!check) {
            throw new AppException(ErrorMessage.WROND_PASSWORD);
        }
        if (!account.isStatus()) {
            throw new AppException(ErrorMessage.USER_IS_BLOCK);
        }
        return LoginResponse
                .builder()
                .token(generateToken(account))
                .account(modelMapper.map(account, AccountResponse.class))
                .build();
    }

    public boolean valid(String token) throws ParseException, JOSEException {
        boolean isValid = true;
        try {
            SignedJWT signedJWT = verify(token, false);

        } catch (AppException e) {
            isValid = false;
        }
        return isValid;
    }

    //Method for valid token
    public SignedJWT verify(String token, boolean isRefesh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIG_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date dateEx = isRefesh ?
                new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFESH_TIME, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        //check token  verify and date not expiration
        boolean valid = signedJWT.verify(verifier) && dateEx.after(new Date());


        if (!valid) {
            throw new AppException(ErrorMessage.UNAUTHENCATED);
        }
        String username = signedJWT.getJWTClaimsSet().getStringClaim("username");
        Account account = accountRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorMessage.USER_NOT_EXIST));
        if (!account.isStatus()) {
            throw new AppException(ErrorMessage.USER_IS_BLOCK);
        }
        String idToken = signedJWT.getJWTClaimsSet().getJWTID();

        if (tokenRepository.existsById(idToken)) {
            throw new AppException(ErrorMessage.UNAUTHENCATED);
        }

        return signedJWT;
    }

    public void logout(String token) throws JOSEException, ParseException {

        SignedJWT signedJWT = verify(token, true);

        String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
        Date dateExp = signedJWT.getJWTClaimsSet().getExpirationTime();

        Token logoutToken = Token.builder()
                .id(jwtId)
                .exDate(dateExp)
                .build();

        tokenRepository.save(logoutToken);
    }
    public RefeshReponse refesh(String token){
        boolean isValid = true;
        SignedJWT signedJWT;
        String role = null;

        try {
             signedJWT = verify(token, true);
             role = signedJWT.getJWTClaimsSet().getStringClaim("scope");
            System.out.println(role);

        } catch (AppException e) {
            isValid = false;
        } catch (ParseException e) {
            isValid = false;
        } catch (JOSEException e) {
            isValid = false;
        }
        return RefeshReponse.builder()
                .valid(isValid)
                .permission(role)
                .build();
    }


    //Method generate Token for jwt
    private String generateToken(Account account) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getId().toString()).issuer("manger.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(EXPIRATION_TIME, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("username",account.getUsername())
                .claim("scope", account.getPermission())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(SIG_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }


    }


}

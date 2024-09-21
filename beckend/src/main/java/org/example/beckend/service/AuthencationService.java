package org.example.beckend.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import org.example.beckend.entity.Account;
import org.example.beckend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthencationService {
    @Autowired
    private AccountRepository accountRepository;

    @Value("${spring.sercurity.sigKey}")
    private String SIG_KEY;

    @Value("${jwt.ExpirationTime}")
    private long EXPIRATION_TIME;

    @Value("${jwt.refreshTime}")
    private long REFESH_TIME;



    private String generateToken(Account account) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getId().toString()).issuer("manger.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(EXPIRATION_TIME, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",account.getPermission())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader,payload);

        try {
            jwsObject.sign(new MACSigner(SIG_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }


    }


}

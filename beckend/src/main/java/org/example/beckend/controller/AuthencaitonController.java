package org.example.beckend.controller;

import com.nimbusds.jose.JOSEException;
import org.example.beckend.contains.SuccessCode;
import org.example.beckend.dto.request.LoginRequest;
import org.example.beckend.dto.request.LogoutRequest;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.dto.response.LoginResponse;
import org.example.beckend.service.AuthencationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/authen")
public class AuthencaitonController {
    @Autowired
    private AuthencationService authencationService;

    //URL for login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse
                        .builder()
                        .data(authencationService.login(request))
                        .build()
        );
    }


    //URL For logout
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authencationService.logout(request.getToken());
        return ResponseEntity.ok(ApiResponse
                .builder()
                .code(SuccessCode.SUCCESS)
                .message("Logout Succesful")
                .build());
    }
}

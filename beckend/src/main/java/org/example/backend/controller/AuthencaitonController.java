package org.example.backend.controller;

import com.nimbusds.jose.JOSEException;
import org.example.backend.contains.SuccessCode;
import org.example.backend.dto.request.LoginRequest;
import org.example.backend.dto.request.LogoutRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.service.AuthencationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/authen")
public class AuthencaitonController {
    @Autowired
    private AuthencationService authencationService;

    //URL for login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse
                        .builder()
                        .code(SuccessCode.SUCCESS)
                        .message("Login successful")
                        .data(authencationService.login(request))
                        .build()
        );
    }

    @PostMapping("/refesh")
    public ResponseEntity<ApiResponse> refesh(@RequestBody LogoutRequest request) {


        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse
                        .builder()
                        .code(SuccessCode.SUCCESS)
                        .message("Check token successful")
                        .data(authencationService.refesh(request.getToken()))
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

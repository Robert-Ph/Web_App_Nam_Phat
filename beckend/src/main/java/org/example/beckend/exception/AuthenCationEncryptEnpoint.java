package org.example.beckend.exception;

import java.io.IOException;

import javax.print.attribute.standard.Media;

import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;


import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenCationEncryptEnpoint implements AuthenticationEntryPoint {
	
	
	//Enpoint catch if token not valid
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		ErrorMessage erro = ErrorMessage.UNAUTHENCATED;
		
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		
		ApiResponse<ErrorMessage> standardResponse =
				new ApiResponse<>();
		standardResponse.setCode(erro.getCode());
		standardResponse.setMessage(erro.getMessage());
		
		ObjectMapper obj = new ObjectMapper();
		
		response.getWriter().write(obj.writeValueAsString(standardResponse));
		response.flushBuffer();
	}
	

}

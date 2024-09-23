package org.example.beckend.message;

import lombok.Getter;
import org.example.beckend.contains.ErrorCode;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorMessage {

    UNUNCATEGORIZED(ErrorCode.UNUNCATEGORIZED,"Error ",HttpStatus.BAD_REQUEST),
    UNAUTHENCATED(ErrorCode.UNAUTHENTICATED,"UNAUTHENTICATED",HttpStatus.UNAUTHORIZED),


    EMPLOYEE_NOT_FOUND(ErrorCode.BAD_REQUEST,"ID EMPLOYEE NOT FOUND",HttpStatus.BAD_REQUEST),


    USERNAME_EXIST(ErrorCode.BAD_REQUEST,"User name is exist in system",HttpStatus.BAD_REQUEST),
    USER_NOT_EXIST(ErrorCode.USER_NOT_FOUND, "Account is not found",HttpStatus.BAD_REQUEST),
    WROND_PASSWORD(ErrorCode.WRONG_PASSWORD,"Wrong password",HttpStatus.BAD_REQUEST);






    private final int code;
    private final String message;
    private final HttpStatus httpStatusCode;

    ErrorMessage(int code, String message, HttpStatus httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

}

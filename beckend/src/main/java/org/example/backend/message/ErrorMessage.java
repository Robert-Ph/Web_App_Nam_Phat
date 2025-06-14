package org.example.backend.message;

import lombok.Getter;
import org.example.backend.contains.ErrorCode;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorMessage {

    UNUNCATEGORIZED(ErrorCode.UNUNCATEGORIZED,"Error ",HttpStatus.BAD_REQUEST),
    UNAUTHENCATED(ErrorCode.UNAUTHENTICATED,"UNAUTHENTICATED",HttpStatus.UNAUTHORIZED),
    PERMISSION_DENIED(ErrorCode.DENIED_PERMISSION, "You not permission", HttpStatus.FORBIDDEN),

    EMPLOYEE_NOT_FOUND(ErrorCode.BAD_REQUEST,"ID EMPLOYEE NOT FOUND",HttpStatus.BAD_REQUEST),


    USERNAME_EXIST(ErrorCode.USER_EXIST,"User name is exist in system",HttpStatus.BAD_REQUEST),
    USER_NOT_EXIST(ErrorCode.USER_NOT_FOUND, "Account is not found",HttpStatus.BAD_REQUEST),
    WROND_PASSWORD(ErrorCode.WRONG_PASSWORD,"Wrong password",HttpStatus.BAD_REQUEST),
    USER_IS_BLOCK(ErrorCode.ACCOUNT_IS_BLOCK,"Account is block",HttpStatus.BAD_REQUEST),
    EMPLOYEE_HAVE_ACCOUNT(ErrorCode.EMPLOYEE_HAVE_ACCOUNT,"Employee have had account",HttpStatus.BAD_REQUEST),

    PRODUCT_NOT_FOUND(ErrorCode.BAD_REQUEST,"Product not found",HttpStatus.BAD_REQUEST),
    INVENTORY_NOT_FOUND(ErrorCode.BAD_REQUEST,"Inventory not found",HttpStatus.BAD_REQUEST),
    INVENTORY_QUANLITY_NOT_ALLOW(ErrorCode.BAD_REQUEST,"Insufficient quantity of products in stock",HttpStatus.BAD_REQUEST),

    CUSTOMER_EXIST(ErrorCode.BAD_REQUEST,"Matching information",HttpStatus.BAD_REQUEST),
    CUSTOMER_NOT_FOUND(ErrorCode.CUSTOMER_NOT_FOUND,"Customer not found",HttpStatus.BAD_REQUEST),

    INVOICE_NOT_FOUND(ErrorCode.INVOICE_NOT_FOUND,"Invoice not found",HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(ErrorCode.ORDER_NOT_FOUND,"Order not found",HttpStatus.BAD_REQUEST),

    IMAGE_IS_REQUIRE(ErrorCode.IMAGE_IS_REQUIRE,"File image not emtry",HttpStatus.BAD_REQUEST),
    IMAGE_NOT_VALID(ErrorCode.IMAGE_NOT_VALID,"Image must end with .jpg or .png",HttpStatus.BAD_REQUEST),
    IMAGE_NOT_FOUND(ErrorCode.IMAGE_NOT_FOUND,"Image not found in server",HttpStatus.BAD_REQUEST),

    FILE_NOT_FOUND(ErrorCode.SERVER_NOT_FOUND,"File not found",HttpStatus.BAD_REQUEST),
    NOT_FOUND(ErrorCode.SERVER_NOT_FOUND,"NOT FOUND",HttpStatus.BAD_REQUEST),


    MISSING_ARGUMENT(ErrorCode.MISSING_ARGUMENT,"Missing argument for request",HttpStatus.BAD_REQUEST),
    SERVER_NOT_FOUND(ErrorCode.SERVER_NOT_FOUND,"Not found", HttpStatus.BAD_REQUEST),
    SERVER_ERROR(ErrorCode.SERVER_ERROR,"Server error try again",HttpStatus.INTERNAL_SERVER_ERROR),

    PAPER_NOT_FOUND(ErrorCode.BAD_REQUEST,"ID EMPLOYEE NOT FOUND",HttpStatus.BAD_REQUEST),
    PAPER_ALREADY_EXITSTS(ErrorCode.BAD_REQUEST,"ID EMPLOYEE NOT FOUND",HttpStatus.BAD_REQUEST);




    private final int code;
    private final String message;
    private final HttpStatus httpStatusCode;

    ErrorMessage(int code, String message, HttpStatus httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

}

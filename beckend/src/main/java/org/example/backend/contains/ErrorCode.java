package org.example.backend.contains;

public class ErrorCode {
    public final static int UNUNCATEGORIZED = 9999;
    public final  static int BAD_REQUEST = 400;
    public final static int UNAUTHENTICATED = 401;
    public final static int DENIED_PERMISSION = 403;

    public final static int SERVER_NOT_FOUND = 404;

    public final static int METHOD_NOT_ALLOW = 405;

    public final static int USER_NOT_FOUND = 420;
    public final static int USER_EXIST = 421;


    public final static int WRONG_PASSWORD = 422;
    public final static int ACCOUNT_IS_BLOCK = 423;
    public final static int EMPLOYEE_HAVE_ACCOUNT = 424;


    public final static int CUSTOMER_EXIST = 801;
    public final static int CUSTOMER_NOT_FOUND = 802;




    public final static int IMAGE_IS_REQUIRE = 452;

    public final static int IMAGE_NOT_VALID = 453;
    public final static int IMAGE_NOT_FOUND = 454;

    public final static int INVOICE_NOT_FOUND = 464;

    public final  static int ORDER_NOT_FOUND = 474;

    public final  static int MISSING_ARGUMENT = 490;

    public final static int SERVER_ERROR =500;

}

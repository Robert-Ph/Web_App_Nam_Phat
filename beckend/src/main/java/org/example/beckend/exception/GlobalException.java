package org.example.beckend.exception;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.contains.ErrorCode;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.StringJoiner;

@ControllerAdvice
@Slf4j
public class GlobalException {

    //Catch Exception for UNUNCATEGORIZED
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
        log.error("Exception: ", exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorMessage.UNUNCATEGORIZED.getCode());
        apiResponse.setMessage(ErrorMessage.UNUNCATEGORIZED.getMessage() +" (" + exception.getMessage()+ ")");
        return ResponseEntity.badRequest().body(apiResponse);
    }

    //Exception for App
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        ErrorMessage errorCode = exception.getErrorMessage();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getHttpStatusCode()).body(apiResponse);
    }

    //Catch Exception for validation in project
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> handleNotValid(MethodArgumentNotValidException exception){
        StringJoiner join = new StringJoiner(". ");

        exception.getBindingResult().getAllErrors().forEach((error) ->{
            join.add(error.getDefaultMessage());
        });

        log.error(join.toString());

         return new ResponseEntity<>(new ApiResponse<>(ErrorCode.BAD_REQUEST, join.toString(),null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = MissingPathVariableException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotValid(MissingPathVariableException exception){
        String missingVariable = exception.getVariableName();
        String message = String.format("Missing path variable: %s", missingVariable);
        return  new ResponseEntity<>(ApiResponse.builder().code(ErrorCode.SERVER_ERROR).message(message).build(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

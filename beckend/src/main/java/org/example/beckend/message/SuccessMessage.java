package org.example.beckend.message;

import lombok.Getter;
import org.example.beckend.contains.SuccessCode;
@Getter
public enum SuccessMessage {

    CREATE_DATA_SUCCESS(SuccessCode.CREATE,"Create Successful"),
    GET_DATA_SUCCESS(SuccessCode.SUCCESS,"Get data successful"),
    UPDATE_DATE_SUCCESS(SuccessCode.SUCCESS,"Update data successful");

    SuccessMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private final int code;
    private final String message;
}

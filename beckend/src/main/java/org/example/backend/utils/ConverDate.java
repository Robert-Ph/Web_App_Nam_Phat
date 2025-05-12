package org.example.backend.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ConverDate {

    public LocalDateTime date(LocalDateTime dateTime) {
        // Định dạng nếu cần (không ảnh hưởng đến giá trị trả về)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        dateTime.format(formatter);


        return dateTime; // Trả lại đúng kiểu LocalDateTime
    }



}

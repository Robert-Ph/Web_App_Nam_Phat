package org.example.beckend.controller;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


import lombok.extern.slf4j.Slf4j;

import org.example.beckend.dto.response.ApiResponse;



import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/download/export")

public class DatabaseExportController {
    @Value("image.storage.path")
    private String path;
    @GetMapping
    public ResponseEntity<ApiResponse> downloadDatabaseExport() throws IOException, InterruptedException {
       backup("root","","it",path);
        return ResponseEntity.ok(ApiResponse.builder().build());
    }

    public static boolean backup(String dbUsername, String dbPassword, String dbName, String outputFile)
            throws IOException, InterruptedException {
        String command = String.format("mysqldump -u%s -p%s --add-drop-table --databases %s -r %s",
                dbUsername, dbPassword, dbName, outputFile);
        Process process = Runtime.getRuntime().exec(command);
        int processComplete = process.waitFor();
        return processComplete == 0;
    }
}

package org.example.beckend.controller;

import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.HttpServletResponse;
import org.example.beckend.dto.response.ApiResponse;
import org.example.beckend.message.SuccessMessage;
import org.example.beckend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Value("${image.storage.path}")
    private String path;



    @Autowired
    FileService fileService;

    @GetMapping("/{fileName}")
    public void serverFileHandle(@PathVariable String fileName, HttpServletResponse response) throws IOException {

        InputStream resourceFile = fileService.getResourceFile(path, fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        try {
            StreamUtils.copy(resourceFile, response.getOutputStream());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        resourceFile.close();
    }


}

package org.example.beckend.service;

import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {


    public InputStream getResourceFile(String path, String name) throws FileNotFoundException {
        String filePath = path + File.separator + name;
        return new FileInputStream(filePath);
    }


    public File uploadFile(String path, String name, MultipartFile multipartFile) {
        String filePath = path + File.separator + name;
        File f = new File(path);

        if (!f.exists()) {
            f.mkdir();
        }

        try {
            Files.copy(multipartFile.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            multipartFile.getInputStream().close();

        } catch (IOException e) {
            throw new AppException(ErrorMessage.SERVER_ERROR);
        }
        return new File(filePath);
    }
}

package org.example.backend.service;

import org.example.backend.entity.enums.LogLevel;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {

    @Autowired
    private LogService logService;

    //Get resource file in system
    public InputStream getResourceFile(String path, String name)  {
        String filePath = path + File.separator + name;
        try {
            return new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            throw new AppException(ErrorMessage.IMAGE_NOT_FOUND);
        }
    }

    //Method for upload file on system
    public File uploadFile(String path, String name, MultipartFile multipartFile) {
        String filePath = path + File.separator + name;
        File f = new File(path);

        if (!f.exists()) {
            f.mkdir();
        }

        try {
            Files.copy(multipartFile.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            logService.log(LogLevel.WARNING,"Tải file lên server với tên file là:" + name);
            multipartFile.getInputStream().close();

        } catch (IOException e) {
            throw new AppException(ErrorMessage.SERVER_ERROR);
        }
        return new File(filePath);
    }
}

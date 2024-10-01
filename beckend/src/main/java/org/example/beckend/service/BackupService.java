package org.example.beckend.service;

import com.smattme.MysqlExportService;
import jakarta.persistence.RollbackException;
import org.example.beckend.contains.LogLevel;
import org.example.beckend.contains.StatusProcessing;
import org.example.beckend.dto.response.AccountResponse;
import org.example.beckend.dto.response.BackupResponse;
import org.example.beckend.entity.Account;
import org.example.beckend.entity.Backup;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.BackupRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Properties;

@Service
public class BackupService {

    @Autowired
    private BackupRepository backupRepository;

    @Autowired
    private SercurityService sercurityService;

    @Value("${spring.datasource.username}")
    private String DB_USERNAME;

    @Value("${spring.datasource.password}")
    private String DB_PASSWORD;

    @Value("${spring.datasource.url}")
    private String JDBC_CONNECTION_STRING;

    @Value("${spring.databse.name}")
    private String DB_NAME;


    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private LogService logService;


    private BackupResponse converToAccountResponse(Backup backup) {
        modelMapper.typeMap(Backup.class, BackupResponse.class).addMappings(mapper ->
                mapper.map(src -> src.getAccount().getUsername(), BackupResponse::setUsername));


        return modelMapper.map(backup, BackupResponse.class);
    }

    @Transactional
    public String create() {

        //Set up connect for mysql connect
        Properties properties = new Properties();
        properties.setProperty(MysqlExportService.DB_NAME, DB_NAME);
        properties.setProperty(MysqlExportService.DB_USERNAME, DB_USERNAME);
        properties.setProperty(MysqlExportService.DB_PASSWORD, DB_PASSWORD);
        properties.setProperty(MysqlExportService.JDBC_CONNECTION_STRING, JDBC_CONNECTION_STRING);

        properties.setProperty(MysqlExportService.SQL_FILE_NAME, "backup");
        properties.setProperty(MysqlExportService.ADD_IF_NOT_EXISTS, "true");

        MysqlExportService mysqlExportService = new MysqlExportService(properties);
        try {

            //export sql
            mysqlExportService.export();

            Account account = sercurityService.getAccountIsLogin();

            //Get sql for string
            String generateSql = mysqlExportService.getGeneratedSql();

            if (generateSql.isEmpty() || generateSql.isBlank()) {
                throw new AppException(ErrorMessage.SERVER_ERROR);
            }

            //Get size data for file in kb
            double lengthFileInKb = (double) generateSql.getBytes(StandardCharsets.UTF_8).length / 1024;


            try {
                Backup backup = Backup.builder()
                        .capacity(Math.round(lengthFileInKb * 10.0) / 10.0)// In Kb
                        .account(account)
                        .status(StatusProcessing.SUCCESS)
                        .build();
                backupRepository.save(backup);

                logService.log(LogLevel.INFOR,"Tạo file backup");
            } catch (Exception e) {

                logService.log(LogLevel.DANGER,"Tạo file backup thất bại");

                throw new AppException(ErrorMessage.SERVER_ERROR);

            }


            return generateSql;
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }


    public BackupResponse insertBackup(double lengthByte) {
        Account account = sercurityService.getAccountIsLogin();
        Backup backup = Backup.builder()
                .capacity(Math.round(lengthByte * 10.0) / 10.0)// In Kb
                .account(account)
                .status(StatusProcessing.SUCCESS)
                .build();
        return converToAccountResponse(backupRepository.save(backup));
    }

    public List<Backup> getAll() {
        return backupRepository.findAll();
    }


    public BackupResponse getLastBackup() {
        return converToAccountResponse(backupRepository.findLatestBackup());
    }

    public PagedModel<BackupResponse> getAll(Pageable pageable) {

        logService.log(LogLevel.INFOR,"Lấy danh sách lịch sử thực hiện backup");
        Page<Backup> backupPage = backupRepository.findAll(pageable);
        Page<BackupResponse> page = backupPage.map(entity -> {
            return converToAccountResponse(entity);
        });


        return new PagedModel<>(page);
    }
}

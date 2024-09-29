package org.example.beckend.service;

import com.smattme.MysqlExportService;
import org.example.beckend.entity.Backup;
import org.example.beckend.repository.BackupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public Backup create(){
        Properties properties = new Properties();
        properties.setProperty(MysqlExportService.DB_NAME, DB_NAME);
        properties.setProperty(MysqlExportService.DB_USERNAME, DB_USERNAME);
        properties.setProperty(MysqlExportService.DB_PASSWORD, DB_PASSWORD);
        properties.setProperty(MysqlExportService.JDBC_CONNECTION_STRING, JDBC_CONNECTION_STRING);

        properties.setProperty(MysqlExportService.SQL_FILE_NAME, "backup");
        properties.setProperty(MysqlExportService.ADD_IF_NOT_EXISTS, "true");
        return null;
    }
}

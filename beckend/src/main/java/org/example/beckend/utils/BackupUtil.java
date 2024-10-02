package org.example.beckend.utils;

import com.smattme.MysqlExportService;
import org.springframework.beans.factory.annotation.Value;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class BackupUtil {

    public static void generationDB() throws SQLException, IOException, ClassNotFoundException {

        Properties properties = new Properties();
        properties.setProperty(MysqlExportService.DB_NAME, "it");
        properties.setProperty(MysqlExportService.DB_USERNAME, "root");
        properties.setProperty(MysqlExportService.DB_PASSWORD, "");
        properties.setProperty(MysqlExportService.JDBC_CONNECTION_STRING, "jdbc:mysql://localhost:3306/it");
//        properties.setProperty(MysqlExportService.JDBC_DRIVER_NAME, "com.mysql.cj.jdbc.Driver");
        properties.setProperty(MysqlExportService.SQL_FILE_NAME, "backup");
        properties.setProperty(MysqlExportService.ADD_IF_NOT_EXISTS, "true");



//set the outputs temp dir
//        properties.setProperty(MysqlExportService.TEMP_DIR, "D://happy");

        try {
            MysqlExportService mysqlExportService = new MysqlExportService(properties);
            mysqlExportService.export();

            System.out.println(mysqlExportService.getGeneratedSql());

//            BufferedWriter writer = new BufferedWriter(new FileWriter("D://happy//backupdata.sql"));
//            writer.write(mysqlExportService.getGeneratedSql());
//            writer.flush();
//            writer.close();

            FileOutputStream outputStream = new FileOutputStream("D://happy//backupdata.sql");
            outputStream.write(mysqlExportService.getGeneratedSql().getBytes());

            System.out.println(Math.round((double)mysqlExportService.getGeneratedSql().getBytes().length/ 1024));
            outputStream.close();

           mysqlExportService.clearTempFiles();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }



    }

    public static void main(String[] args) throws SQLException, IOException, ClassNotFoundException {
        generationDB();
    }

}

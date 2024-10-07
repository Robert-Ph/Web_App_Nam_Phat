package org.example.beckend.utils;

import java.io.File;
import java.nio.file.Files;
import java.text.NumberFormat;
import java.util.*;


import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.DottedLine;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Tab;
import com.itextpdf.layout.element.TabStop;

import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.properties.TabAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.properties.VerticalAlignment;

import org.example.beckend.entity.Company;
import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Order;
import org.example.beckend.entity.OrderItem;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;

import org.springframework.stereotype.Component;

@Component
public class PDFUtils {


    private Cell mergeCol(String title, int col, TextAlignment textAlignment) {
        return new Cell(1, col).add(new Paragraph(title)).setTextAlignment(textAlignment);
    }

    private String convertHeader(String companyName) {

        String[] split = companyName.split(" ");
        StringBuilder sb = new StringBuilder();

        if (split.length <= 8) {
            return companyName;
        }
        Queue<String> stack = new LinkedList<String>();
        stack.addAll(Arrays.asList(split));

        for (int i = 0; i < 8; i++) {
            sb.append(stack.poll() + " ");
        }
        sb.append("\n");
        while (!stack.isEmpty()) {
            sb.append(stack.poll() + " ");
        }

        return sb.toString();
    }

    private Cell convertCellNoBorderBotTop(String text, TextAlignment textAlignment, int minHeigth) {
        Cell cell = new Cell();
        cell.add(new Paragraph().add(new Text(text)));
        cell.setBorderBottom(Border.NO_BORDER);
        cell.setBorderTop(Border.NO_BORDER);
        cell.setTextAlignment(textAlignment);
        cell.setVerticalAlignment(VerticalAlignment.MIDDLE);
        cell.setMinHeight(minHeigth);
        return cell;
    }

    private String formatCurrency(long amount) {
        Locale locale = new Locale("vi", "VN");

        // Tạo đối tượng NumberFormat cho định dạng tiền tệ
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(locale);

        // Định dạng số và trả về
        return currencyFormatter.format(amount);
    }

    private String formatCurrency(double amount) {
        Locale locale = new Locale("vi", "VN");

        // Tạo đối tượng NumberFormat cho định dạng tiền tệ
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(locale);

        // Định dạng số và trả về
        return currencyFormatter.format(amount);
    }


    public void createPDF(Company company, String fileName, Order order) {

        String fontPath = "src/main/resources/static/font" + File.separatorChar + "vuArial.ttf"; // Chỉnh url về nơi lưu font

//        String pathStorage = "src/main/resources/static/invoice" + File.separator + fileName;

        try {
            // Tạo file PDF
            PdfWriter writer = new PdfWriter(fileName);

            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A4, false);


            //Set font
            PdfFont font = PdfFontFactory.createFont(fontPath);
            document.setFont(font);
            document.setMargins(20, 40, 40, 50);


            float width = pdfDoc.getDefaultPageSize().getWidth() - document.getRightMargin() - 50;

            //Setting tab
            TabStop tabHeader = new TabStop(260, TabAlignment.LEFT);
            TabStop tabCenter = new TabStop(250, TabAlignment.CENTER);
            TabStop tabRigth = new TabStop(width, TabAlignment.RIGHT);

            System.out.println(width);


            //Trỏ đến vị trí lưu logo
            String logoPath = "src/main/resources/static/logo/logo.png";
            ImageData imageData = ImageDataFactory.create(logoPath);

            System.out.println(imageData);
            Image logo = new Image(imageData);

            logo.setWidth(60); // Đặt kích thước logo
            logo.setHeight(60);

            // Tao table cho logo va ten cong ty
            Table table = new Table(2);
            table.setMargins(0, 20, 20, 20);

            Cell cellImageHeader = new Cell().add(logo);
            cellImageHeader.setBorder(Border.NO_BORDER);

            table.setWidth(UnitValue.createPercentValue(100));

            Paragraph title = new Paragraph(Objects.isNull(company.getName()) ? "" : convertHeader(company.getName()))
                    .setBold()
                    .setFontSize(16)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setVerticalAlignment(VerticalAlignment.MIDDLE);

            Cell cellNameCompany = new Cell();
            cellNameCompany.add(title).setVerticalAlignment(VerticalAlignment.MIDDLE);
            cellNameCompany.setBorder(Border.NO_BORDER);

            table.addCell(cellImageHeader);
            table.addCell(cellNameCompany);

            document.add(table);


            //Header ma so thue va va so dien thoai
            document.add(new Paragraph()
                    .add(new Text("Mã số thuế: ").setBold())
                    .add(new Text(Objects.isNull(company.getIdTax()) ? "" : company.getIdTax()).setBold())
                    .addTabStops(tabHeader)
                    .add(new Tab())
                    .add(new Text("Số điện thoại: ").setBold())
                    .add(new Text(Objects.isNull(company.getPhone()) ? "" : company.getPhone()))
            );
            //Header email va so tai khoan
            document.add(new Paragraph()
                    .add(new Text("Email: ").setBold())
                    .add(new Text(company.getEmail() != null ? company.getEmail() : ""))
                    .addTabStops(tabHeader)
                    .add(new Tab())
                    .add(new Text("Số tài khoản: ").setBold())
                    .add(new Text(Objects.isNull(company.getIdBank()) ? "" : company.getIdBank()))
            );

            document.add(
                    new Paragraph()
                            .add(new Text("Địa chỉ: ").setBold())
                            .add(new Text(Objects.isNull(company.getAddress()) ? "" : company.getAddress()))
            );


            document.add(
                    new Paragraph("Phiếu Giao Hàng").setBold().setFontSize(24).setTextAlignment(TextAlignment.CENTER)
                            .setMargins(4, 0, 0, 0));

            document.add(new Paragraph()
                    .addTabStops(tabCenter, tabRigth)
                    .add(new Tab())
                    .add(new Text("Ngày ......tháng......năm 2024"))
                    .add(new Tab())
                    .add(new Text("Số:.............."))
                    .setMarginBottom(10)
            );

            if (Objects.isNull(order.getCustomer())) {
                // Customer information section
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Text("Tên khách hàng:"))
                        .add(new Tab())
                );
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width / 2 + 10, TabAlignment.CENTER, new DottedLine(1.5f)))
                        .add(new Text("Số điện thoại:"))
                        .add(new Tab())
                        .add(new Text(", Email:"))
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Tab())
                );
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width / 2 + 10, TabAlignment.CENTER, new DottedLine(1.5f)))
                        .add(new Text("Mã số thuế:"))
                        .add(new Tab())
                        .add(new Text(", Hình thức thanh toán:"))
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Tab())

                );
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Text("Địa chỉ:"))
                        .add(new Tab())
                        .setMarginBottom(20)
                );
            } else {

                Customer customer = order.getCustomer();
                // Customer information section
                document.add(new Paragraph()
                        .add(new Text("Tên khách hàng: "))
                        .add(new Text(customer.getFullName()).setBold())
                        .add(new Tab())

                );


                document.add(new Paragraph()
                        .addTabStops(new TabStop(width / 2 + 10, TabAlignment.CENTER))
                        .add(new Text("Số điện thoại: "))
                        .add(new Text(customer.getPhone()).setBold())
                        .add(new Tab())
                        .add(new Text(", Email: " ))
                        .add(new Text(customer.getEmail()).setBold())

                );
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width / 2 + 10, TabAlignment.CENTER, new DottedLine(1.5f)))
                        .add(new Text("Mã số thuế:"))
                        .add(new Tab())
                        .add(new Text(", Hình thức thanh toán:"))
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Tab())

                );
                document.add(new Paragraph()
                        .add(new Text("Địa chỉ: " + order.getAddress()).setBold())
                        .setMarginBottom(20)
                );
            }

            // Table
            float[] columnWidths = {1, 4, 3, 1, 3, 3};
            Table table1 = new Table(UnitValue.createPercentArray(columnWidths));
            table1.setWidth(UnitValue.createPercentValue(100));
            table1.addHeaderCell(new Cell().add(new Paragraph("STT").setTextAlignment(TextAlignment.CENTER)));
            table1.addHeaderCell(new Cell().add(new Paragraph("Tên sản phẩm").setTextAlignment(TextAlignment.CENTER)));
            table1.addHeaderCell(new Cell().add(new Paragraph("Quy cách").setTextAlignment(TextAlignment.CENTER)));
            table1.addHeaderCell(new Cell().add(new Paragraph("Số lượng ").setTextAlignment(TextAlignment.CENTER)));
            table1.addHeaderCell(new Cell().add(new Paragraph("Đơn giá").setTextAlignment(TextAlignment.CENTER)));
            table1.addHeaderCell(new Cell().add(new Paragraph("Thành tiền").setTextAlignment(TextAlignment.CENTER)));


            if (Objects.isNull(order)) {
                //Tao bảng trống
                for (int i = 0; i < 7; i++) {
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));
                    table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 26));

                }


                table1.addCell(mergeCol("Tổng:", 5, TextAlignment.CENTER));


                table1.addCell(mergeCol("", 1, TextAlignment.LEFT));

                table1.addCell(mergeCol("Thuế giá trị gia tăng - VAT(...%)", 5, TextAlignment.CENTER));
                table1.addCell(mergeCol("", 1, TextAlignment.LEFT));

                table1.addCell(mergeCol("Tổng Cộng:", 5, TextAlignment.CENTER));
                table1.addCell(mergeCol("", 1, TextAlignment.LEFT));


                document.add(table1);

                // Signature section
                document.add(new Paragraph()
                        .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                        .add(new Text("Số tiền viết bằng chữ:"))
                        .add(new Tab())
                        .setMarginTop(15)
                );
                document.add(new Paragraph()
                        .addTabStops(new TabStop(document.getLeftMargin() + 20, TabAlignment.CENTER))
                        .add(new Tab())
                        .add(new Text("Người nhận"))
                        .addTabStops(new TabStop(width - 100, TabAlignment.CENTER))
                        .add(new Tab())
                        .add(new Text("Kế toán"))
                        .setMarginTop(10)
                );

            } else {
                OrderItem item;
                for (int i = 0; i < order.getOrderItems().size(); i++) {
                    item = order.getOrderItems().get(i);

                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(i), TextAlignment.CENTER, 15));
                    table1.addCell(convertCellNoBorderBotTop(item.getNameProduct(), TextAlignment.CENTER, 15));
                    table1.addCell(convertCellNoBorderBotTop(item.getMode(), TextAlignment.CENTER, 15));
                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(item.getQuanlityProduct()), TextAlignment.CENTER, 15));
                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(formatCurrency(item.getPricePerOne())), TextAlignment.CENTER, 15));
                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(formatCurrency(item.getPricePerOne() * item.getQuanlityProduct())), TextAlignment.CENTER, 15));

                }


                table1.addCell(mergeCol("Tổng:", 5, TextAlignment.CENTER));


                table1.addCell(mergeCol(String.valueOf(formatCurrency(order.getTotal_price())), 1, TextAlignment.CENTER));

                table1.addCell(mergeCol("Thuế giá trị gia tăng - VAT(...%):", 5, TextAlignment.CENTER));
                table1.addCell(mergeCol(String.valueOf(order.getVat()), 1, TextAlignment.CENTER));

                table1.addCell(mergeCol("Tổng Cộng:", 5, TextAlignment.CENTER));
                table1.addCell(mergeCol(String.valueOf(String.valueOf(formatCurrency(order.getTotal_price() + order.getTotal_price() * order.getVat()))), 1, TextAlignment.CENTER));


                document.add(table1);

                // Signature section
               if(Objects.isNull(order)){
                   document.add(new Paragraph()
                           .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                           .add(new Text("Số tiền viết bằng chữ:"))
                           .add(new Tab())
                           .setMarginTop(15)
                   );
               }else {
                   Double total = (order.getTotal_price() + order.getTotal_price() *order.getVat());
                   document.add(new Paragraph()
                           .add(new Text("Số tiền viết bằng chữ:"))
                           .add(new Text(ConvertNumberToText.convert(Math.round(total))).setItalic())
                           .setMarginTop(15)
                   );
               }
                document.add(new Paragraph()
                        .addTabStops(new TabStop(document.getLeftMargin() + 20, TabAlignment.CENTER))
                        .add(new Tab())
                        .add(new Text("Người nhận"))
                        .addTabStops(new TabStop(width - 100, TabAlignment.CENTER))
                        .add(new Tab())
                        .add(new Text("Kế toán"))
                        .setMarginTop(10)
                );

            }


            document.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new AppException(ErrorMessage.SERVER_ERROR);
        }
    }


}

package org.example.backend.utils;

import java.io.File;
import java.text.NumberFormat;
import java.time.LocalDate;
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

import org.example.backend.entity.Company;
import org.example.backend.entity.Customer;
import org.example.backend.entity.Order;
import org.example.backend.entity.OrderItem;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;

import org.springframework.stereotype.Component;

@Component
public class PDFUtils {

    LocalDate currentDate = LocalDate.now();

    int ngay = currentDate.getDayOfMonth();
    int thang = currentDate.getMonthValue();
    int nam = currentDate.getYear();

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

    private void addInvoiceContent(Document document, PdfFont font, float width, Company company, Order order, String id) throws Exception {
        document.setFont(font);

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
        Table headerTable = new Table(UnitValue.createPercentArray(new float[]{1, 8})).useAllAvailableWidth();
        headerTable.addCell(new Cell().add(logo).setBorder(Border.NO_BORDER));

        Paragraph companyInfo = new Paragraph()
                .add(new Text(company.getName() + "\n").setBold().setFontSize(16))
                .add(new Text("Địa chỉ: " + company.getAddress() + "\n")).setFontSize(10)
                .add(new Text("Mã số thuế: " + company.getIdTax() + "    Email: " + (company.getEmail() != null ? company.getEmail() : "") + "\n")).setFontSize(10)
                .add(new Text("Số điện thoại: " + company.getPhone()).setFontSize(10));
        headerTable.addCell(new Cell().add(companyInfo).setBorder(Border.NO_BORDER));

        document.add(headerTable);
//
        document.add(
                new Paragraph("Phiếu Giao Hàng").setBold().setFontSize(20).setTextAlignment(TextAlignment.CENTER)
                        .setMargins(4, 0, 0, 0));

        document.add(new Paragraph()
                        .addTabStops(tabCenter, tabRigth)
//                    .add(new Tab())
                        .add(new Text("Ngày "+ ngay +" tháng "+thang+" năm "+nam))
                        .add(new Tab())
                        .add(new Text("Số: "+id))
                        .setTextAlignment(TextAlignment.CENTER)
//                    .setMarginBottom(5)
        );

        if (Objects.isNull(order.getCustomer())) {
            // Customer information section
            document.add(new Paragraph()
                    .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                    .add(new Text("Tên khách hàng:"))
                    .add(new Tab())
                    .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng
            );
            document.add(new Paragraph()
                    .addTabStops(new TabStop(width / 2 + 5, TabAlignment.CENTER, new DottedLine(1.5f)))
                    .add(new Text("Số điện thoại:"))
                    .add(new Tab())
                    .add(new Text(", Email:"))
                    .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                    .add(new Tab())
                    .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng
            );
            document.add(new Paragraph()
                    .addTabStops(new TabStop(width / 2 + 5, TabAlignment.CENTER, new DottedLine(1.5f)))
                    .add(new Text("Mã số thuế:"))
                    .add(new Tab())
                    .add(new Text(", Hình thức thanh toán:"))
                    .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                    .add(new Tab())
                    .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng

            );
            document.add(new Paragraph()
                    .addTabStops(new TabStop(width, TabAlignment.RIGHT, new DottedLine(1.5f)))
                    .add(new Text("Địa chỉ:"))
                    .add(new Tab())
                    .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng

            );
        } else {

            Customer customer = order.getCustomer();
            // Customer information section
            document.add(new Paragraph()
                    .add(new Text("Tên khách hàng: "))
                    .add(new Text(customer.getFullName()))
                    .addTabStops(new TabStop(width / 2 + 5, TabAlignment.CENTER))
                    .add(new Tab())
                    .add(new Text("Mã số thuế: ")).add(new Text(customer.getTax()))
                    .add(new Tab())
                    .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng

            );


            document.add(new Paragraph()
                            .addTabStops(
                                    new TabStop(200, TabAlignment.LEFT),
                                    new TabStop(350, TabAlignment.LEFT),
                                    new TabStop(450, TabAlignment.LEFT)
                            )
                            .add(new Text("Số điện thoại: "))
                            .add(new Text(customer.getPhone()))
                            .add(new Tab())
                            .add(new Text(",Email: "))
                            .add(new Text(customer.getEmail()))
                            .add(new Tab())
                            .add(new Text(",Hình thức thanh toán: "))
//                        .add(new Text("")
                            .setMarginBottom(0)
                            .setMultipliedLeading(1)
            );

//                document.add(new Paragraph()
//                        .addTabStops(new TabStop(width / 2 + 5, TabAlignment.CENTER))
//                        .add(new Text("Mã số thuế:"))
//                        .add(new Tab())
////                        .add(new Text(", Hình thức thanh toán:"))
//                        .addTabStops(new TabStop(width, TabAlignment.RIGHT))
//                        .add(new Tab())
//                        .setMarginBottom(0) // Loại bỏ khoảng cách dưới đoạn này
//                        .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng
//
//                );
            document.add(new Paragraph()
                    .add(new Text("Địa chỉ: "))
                    .add(new Text(customer.getEmail()).setBold())
                    .setMarginBottom(10) // Loại bỏ khoảng cách dưới đoạn này
                    .setMultipliedLeading(1) // Giảm khoảng cách giữa các dòng
            );
        }

        // Table
        float[] columnWidths = {1, 4, 5, 1, 3, 3};
        Table table1 = new Table(UnitValue.createPercentArray(columnWidths));
        table1.setWidth(UnitValue.createPercentValue(100));
        table1.addHeaderCell(new Cell().add(new Paragraph("STT").setTextAlignment(TextAlignment.CENTER).setBold()));
        table1.addHeaderCell(new Cell().add(new Paragraph("Tên sản phẩm").setTextAlignment(TextAlignment.CENTER).setBold()));
        table1.addHeaderCell(new Cell().add(new Paragraph("Quy cách").setTextAlignment(TextAlignment.CENTER).setBold()));
        table1.addHeaderCell(new Cell().add(new Paragraph("SL").setTextAlignment(TextAlignment.CENTER).setBold()));
        table1.addHeaderCell(new Cell().add(new Paragraph("Đơn giá").setTextAlignment(TextAlignment.CENTER).setBold()));
        table1.addHeaderCell(new Cell().add(new Paragraph("Thành tiền").setTextAlignment(TextAlignment.CENTER).setBold()));


        if (Objects.isNull(order)) {
            //Tao bảng trống
            for (int i = 0; i < 8; i++) {
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 10));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));
                table1.addCell(convertCellNoBorderBotTop("", TextAlignment.CENTER, 16));

                // Thêm dòng kẻ ngang sau mỗi hàng
//                    table1.addCell(createSeparatorCell(7)); // 7 là số cột của bảng
            }


            table1.addCell(mergeCol("Tổng:", 5, TextAlignment.CENTER));
            table1.addCell(mergeCol("", 1, TextAlignment.LEFT));

            table1.addCell(mergeCol("Giảm:", 5, TextAlignment.CENTER));
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
            for (int i = 1; i < order.getOrderItems().size()+1; i++) {
                item = order.getOrderItems().get(i-1);

                table1.addCell(new Cell().add(new Paragraph(String.valueOf(i)).setTextAlignment(TextAlignment.CENTER)));
//                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(i), TextAlignment.CENTER, 15));
                table1.addCell(new Cell().add(new Paragraph(item.getNameProduct()).setTextAlignment(TextAlignment.CENTER)));
//                    table1.addCell(convertCellNoBorderBotTop(item.getNameProduct(), TextAlignment.CENTER, 15));
                table1.addCell(new Cell().add(new Paragraph(item.getMode()).setTextAlignment(TextAlignment.CENTER)));
//                    table1.addCell(convertCellNoBorderBotTop(item.getMode(), TextAlignment.CENTER, 15));
                table1.addCell(new Cell().add(new Paragraph(String.valueOf(item.getQuanlityProduct())).setTextAlignment(TextAlignment.CENTER)));
//                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(item.getQuanlityProduct()), TextAlignment.CENTER, 15));
                table1.addCell(new Cell().add(new Paragraph(String.valueOf(formatCurrency(item.getPricePerOne()))).setTextAlignment(TextAlignment.CENTER)));
//                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(formatCurrency(item.getPricePerOne())), TextAlignment.CENTER, 15));
                table1.addCell(new Cell().add(new Paragraph(String.valueOf(formatCurrency(item.getPricePerOne() * (long)item.getQuanlityProduct()))).setTextAlignment(TextAlignment.CENTER)));

//                    table1.addCell(convertCellNoBorderBotTop(String.valueOf(formatCurrency(item.getPricePerOne() * (long)item.getQuanlityProduct())), TextAlignment.CENTER, 15));

            }


            table1.addCell(mergeCol("Tổng", 5, TextAlignment.CENTER));


            table1.addCell(mergeCol(String.valueOf(formatCurrency(order.getTotalPrice())), 1, TextAlignment.CENTER));

            table1.addCell(mergeCol("Giảm", 5, TextAlignment.CENTER));
            table1.addCell(mergeCol(formatCurrency(order.getReduce()), 1, TextAlignment.CENTER));

            table1.addCell(mergeCol("Thuế giá trị gia tăng - VAT( "+order.getVat()+"% )", 5, TextAlignment.CENTER));
            table1.addCell(mergeCol(String.valueOf(formatCurrency(order.getTotalPrice() * order.getVat()/100)), 1, TextAlignment.CENTER));

            table1.addCell(mergeCol("Tổng Cộng", 5, TextAlignment.CENTER));
            table1.addCell(mergeCol(String.valueOf(String.valueOf(formatCurrency(order.getTotalPrice() - order.getReduce() + order.getTotalPrice() * order.getVat()/100))), 1, TextAlignment.CENTER));


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
                Double total = (order.getTotalPrice() + order.getTotalPrice() *order.getVat()/100);
                document.add(new Paragraph()
                        .add(new Text("Số tiền viết bằng chữ:"))
                        .add(new Text(ConvertNumberToText.convert(Math.round(total))).setItalic())
                        .setMarginTop(15)
                );
            }
            document.add(new Paragraph()
                    .addTabStops(
                            new TabStop(100, TabAlignment.CENTER),
                            new TabStop(420, TabAlignment.CENTER),
                            new TabStop(700, TabAlignment.CENTER)
                    )
                    .add(new Tab()).add(new Text("Người nhận"))
                    .add(new Tab()).add(new Text("Người giao"))
                    .add(new Tab()).add(new Text("Kế toán"))
                    .setMarginTop(10)
            );


        }


    }


    public void createPDF(Company company, String fileName, Order order, Long id) {

        String fontPath = "src/main/resources/static/font" + File.separatorChar + "vuArial.ttf"; // Chỉnh url về nơi lưu font

//        String pathStorage = "src/main/resources/static/invoice" + File.separator + fileName;

        try {
            // Tạo file PDF
            PdfWriter writer = new PdfWriter(fileName);

            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A4.rotate(), false);

            //Set font
            PdfFont font = PdfFontFactory.createFont(fontPath);
            document.setFont(font);
            document.setMargins(20, 20, 20, 20);

            float width = pdfDoc.getDefaultPageSize().getWidth() - document.getRightMargin() - 50;

            // Trang 1
            addInvoiceContent(document, font, width, company, order, id+"_1");

            // Trang 2 giống hệt
            document.add(new com.itextpdf.layout.element.AreaBreak());
            addInvoiceContent(document, font, width, company, order, id+"_2");
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new AppException(ErrorMessage.SERVER_ERROR);
        }
    }


}

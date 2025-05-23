package org.example.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.response.InvoicesReponse;
import org.example.backend.entity.Invoice;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.InvoiceRepository;
import org.example.backend.utils.PDFUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Objects;

@Slf4j
@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PDFUtils pdfUtils;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${file.invoice.path}")
    private String pathOrdeFile;



    @Transactional
    public Invoice update(Long id, LocalDateTime dateTime) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.INVOICE_NOT_FOUND));
        // Xóa file PDF cũ nếu tồn tại
        String oldFilePath = pathOrdeFile + File.separator + invoice.getFile();
        File oldFile = new File(oldFilePath);
        if (oldFile.exists()) {
            oldFile.delete();
        }
        String fileName = "HD_" + id + ".pdf";

        invoice.setDateCreate(dateTime);
        invoice.setFile(fileName);
        Invoice response = invoiceRepository.save(invoice);

        pdfUtils.createPDF(companyService.getMyCompany(), pathOrdeFile + File.separator + "HD_"+invoice.getId() + ".pdf", invoice.getOrder(), invoice.getId());
        return response;
    }


    public Invoice newUpdate(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.INVOICE_NOT_FOUND));
        // Xóa file PDF cũ nếu tồn tại
        String oldFilePath = pathOrdeFile + File.separator + invoice.getFile();
        File oldFile = new File(oldFilePath);
        if (oldFile.exists()) {
            oldFile.delete();
        }
        String fileName = "HD_" + id + ".pdf";

        invoice.setDateCreate(null);
        invoice.setFile(fileName);
        Invoice response = invoiceRepository.save(invoice);

        pdfUtils.createPDF(companyService.getMyCompany(), pathOrdeFile + File.separator + "HD_"+invoice.getId() + ".pdf", invoice.getOrder(), invoice.getId());
        return response;
    }

    @Transactional
    public Invoice loadseen(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorMessage.INVOICE_NOT_FOUND));

        // Xóa file PDF cũ nếu tồn tại
        String oldFilePath = pathOrdeFile + File.separator + invoice.getFile();
        File oldFile = new File(oldFilePath);
        if (oldFile.exists() && !oldFile.delete()) {
            log.warn("Không thể xóa file cũ: {}", oldFilePath);
        }

        String fileName = "HD_" + id + ".pdf";
        invoice.setFile(fileName);
        Invoice response = invoiceRepository.save(invoice);

        try {
            pdfUtils.createPDF(
                    companyService.getMyCompany(),
                    pathOrdeFile + File.separator + fileName,
                    invoice.getOrder(),
                    invoice.getId()
            );
        } catch (Exception e) {
            log.error("Lỗi khi tạo PDF cho hóa đơn {}: {}", id, e.getMessage(), e);
        }

        return response;
    }


    public Invoice getById(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.INVOICE_NOT_FOUND));
        if (Objects.isNull(invoice.getDateCreate()) || Objects.isNull(invoice.getFile())) {
            log.warn("update");
            return update(id, LocalDateTime.now());
        } else {
            log.warn("get data");
            return invoice;
        }
    }

    public Invoice getByIdSeen(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.INVOICE_NOT_FOUND));
        if (Objects.isNull(invoice.getDateCreate()) || Objects.isNull(invoice.getFile())) {
            log.warn("update");
            return loadseen(id);
        } else {
            log.warn("get data");
            return invoice;
        }
    }
    private InvoicesReponse converToInvoicesReponse(Invoice invoice){
        modelMapper.typeMap(Invoice.class, InvoicesReponse.class).addMappings(mapper ->
                {
                        mapper.map(src -> src.getOrder().getCustomer().getFullName(), InvoicesReponse::setNameCustomer);
                    mapper.map(src -> src.getOrder().getId(), InvoicesReponse::setOrderId);
                }
        );


        return modelMapper.map(invoice, InvoicesReponse.class);
    }
    public PagedModel<InvoicesReponse> getAll(Pageable pageable) {
        return new PagedModel<>(invoiceRepository.findAll(pageable).map(invoice -> {
            return converToInvoicesReponse(invoice);
        }));
    }

    public PagedModel<InvoicesReponse> getByFilter(String filter,Pageable pageable) {
        return new PagedModel<>(invoiceRepository.findByIdOrNameCustomerOrOrderIdContains(filter,pageable).map(invoice -> {
            return converToInvoicesReponse(invoice);
        }));
    }
}

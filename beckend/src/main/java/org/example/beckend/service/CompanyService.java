package org.example.beckend.service;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.contains.LogLevel;
import org.example.beckend.dto.request.CompanyRequest;
import org.example.beckend.entity.Company;
import org.example.beckend.repository.CompanyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private LogService logService;

    public Company update(CompanyRequest request) {

        Company company = companyRepository.findAll().get(0);
        company.setName(request.getName());
        company.setPhone(request.getPhone());
        company.setAddress(request.getAddress());

        if (!Objects.isNull(request.getIdTax())) {
            company.setIdTax(request.getIdTax());
        }
        if (!Objects.isNull(request.getIdBank())) {
            company.setIdBank(request.getIdBank());
        }

        logService.log(LogLevel.WARNING,"Cập nhật thông tin công ty");

        return companyRepository.save(company);
    }

    public Company getMyCompany() {
        return companyRepository.findAll().get(0);
    }
}

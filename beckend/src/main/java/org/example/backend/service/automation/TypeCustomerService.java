package org.example.backend.service.automation;

import org.example.backend.dto.request.automation.TypeCutomerRequest;
import org.example.backend.entity.automation.TypeCustomer;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.TypeCustomerRepository;
import org.example.backend.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TypeCustomerService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private TypeCustomerRepository typeCustomerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public TypeCustomer createTypeCustomer(TypeCutomerRequest typeCustomer) {
        Optional<TypeCustomer> optional = typeCustomerRepository.findTypeCustomersByName(typeCustomer.getName());
        TypeCustomer typeCustomer1 = modelMapper.map(typeCustomer, TypeCustomer.class);
        if (optional.isPresent()) {
            throw new AppException(ErrorMessage.MAN_ALREADY_EXITSTS);
        }else {
            typeCustomer1 = typeCustomerRepository.save(typeCustomer1);
        }
        return typeCustomer1;
    }

    public TypeCustomer updateTypeCustomer(TypeCustomer typeCustomer) {
        TypeCustomer typeCustomer1 = typeCustomerRepository.findById(typeCustomer.getId()).get();
        if (typeCustomer1 != null) {
            typeCustomer1.setPrecentage(typeCustomer.getPrecentage());
            typeCustomerRepository.save(typeCustomer1);
        }else {
            throw  new AppException(ErrorMessage.MAN_NOT_FOUND);
        }
        return typeCustomer1;
    }
}

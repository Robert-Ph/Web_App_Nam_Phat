package org.example.beckend.service;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.dto.request.EmployeeCreateRequest;
import org.example.beckend.entity.Employee;
import org.example.beckend.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Employee create(EmployeeCreateRequest request){

        Employee employee = modelMapper.map(request,Employee.class);
        try {
            employee = employeeRepository.save(employee);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
        return employee;
    }
}

package org.example.beckend.service;


import lombok.extern.slf4j.Slf4j;
import org.example.beckend.dto.request.EmployeeRequest;
import org.example.beckend.entity.Employee;
import org.example.beckend.entity.Position;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.EmployeeRepository;
import org.example.beckend.repository.PositionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private ModelMapper modelMapper;


    //Method create new Employee
    public Employee create(EmployeeRequest request) {

        Employee employee = modelMapper.map(request, Employee.class);
        Optional<Position> position = positionRepository.findByName(request.getPosition());


        //Check Postion if exist in database
        if (position.isEmpty()) {
            throw new AppException(ErrorMessage.UNUNCATEGORIZED);
        }


        employee.setPosition(position.get());

        //If create new employee default isWork is true
        employee.setWork(true);

        try {
            employee = employeeRepository.save(employee);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return employee;
    }

    public Employee update(EmployeeRequest request,Long id){
        Optional<Employee> employee = employeeRepository.findById(id);

        if(employee.isEmpty()){
            throw new AppException(ErrorMessage.EMPLOYEE_NOT_FOUND);
        }

        log.error("Is work:" + request.toString());

        Optional<Position> position = positionRepository.findByName(request.getPosition());

        //Check Postion if exist in database
        if (position.isEmpty()) {
            throw new AppException(ErrorMessage.UNUNCATEGORIZED);
        }

        Employee save = modelMapper.map(request,Employee.class);
        save.setId(employee.get().getId());
        save.setPosition(position.get());

        return employeeRepository.save(save);
    }



    //Method for getAllEmployee with pageable
    public PagedModel<Employee> getAll(Pageable pageable) {

        return new PagedModel<>(employeeRepository.findAll(pageable));
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }
}

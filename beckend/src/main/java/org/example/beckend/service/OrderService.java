package org.example.beckend.service;

import org.example.beckend.dto.request.OrderRequest;
import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Order;
import org.example.beckend.entity.OrderItem;
import org.example.beckend.entity.enums.OrderStatus;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.OrderItemRepository;
import org.example.beckend.repository.OrderRepository;
import org.example.beckend.utils.PDFUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PDFUtils pdfUtils;


    @Autowired
    private CompanyService companyService;


    @Transactional
    public Order create(OrderRequest request){
        Customer customer = customerService.findCustomerByPhone(request.getPhone());

        Order order = modelMapper.map(request,Order.class);
        order.setCustomer(customer);
        order.setPhone(customer.getPhone());
        order.setAddress(customer.getAddress());
        order.setStatus(OrderStatus.CONFIM);
        order.setTotal_price(order.getOrderItems().stream().mapToLong(item -> item.getQuanlityProduct()*item.getPricePerOne()).sum());

        Order save = orderRepository.save(order);

        for (OrderItem item :
                order.getOrderItems()) {

            item.setOrder(save);
            orderItemRepository.save(item);

        }


        return save;
    }

    public String createPDF(Long idOrder){
        Order order = orderRepository.findById(idOrder).orElseThrow(()-> new AppException(ErrorMessage.SERVER_ERROR));
        String path =pdfUtils.createPDF(companyService.getMyCompany(),order.getId()+".pdf",order);
        return path;
    }
}

package org.example.beckend.service;


import org.example.beckend.dto.request.OrderRequest;

import org.example.beckend.dto.request.OrderUpdateRequest;
import org.example.beckend.dto.response.OrderResponseForList;
import org.example.beckend.entity.Customer;
import org.example.beckend.entity.Invoice;
import org.example.beckend.entity.Order;
import org.example.beckend.entity.OrderItem;
import org.example.beckend.entity.enums.OrderStatus;
import org.example.beckend.entity.enums.TypeOrder;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.InvoiceRepository;
import org.example.beckend.repository.OrderItemRepository;
import org.example.beckend.repository.OrderRepository;
import org.example.beckend.utils.PDFUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Value("${file.invoice.path}")
    private String pathOrdeFile;


    @Transactional
    public Order create(OrderRequest request) {
        Customer customer = customerService.findCustomerByPhone(request.getPhone());


        Order order = modelMapper.map(request, Order.class);
        order.setCustomer(customer);
        order.setPhone(customer.getPhone());
        if (Objects.isNull(request.getAddress())) {
            order.setAddress(customer.getAddress());
        } else {
            order.setAddress(request.getAddress());
        }

        order.setStatus(OrderStatus.CONFIM);
        order.setTotalPrice(order.getOrderItems().stream().mapToLong(item -> (long)item.getQuanlityProduct() * item.getPricePerOne()).sum());
        order.setVat(request.getVat());
        Order save = orderRepository.save(order);

        for (OrderItem item :
                order.getOrderItems()) {

            item.setOrder(save);
            orderItemRepository.save(item);

        }
        invoiceRepository.save(Invoice.builder()
                .priceNeedPay( (long) Math.round(order.getTotalPrice()))
                .order(order)
                .build());

        return save;
    }


    //get order by id
    public Order getById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.ORDER_NOT_FOUND));
    }


    private OrderResponseForList converToOrderForList(Order order) {
        modelMapper.typeMap(Order.class, OrderResponseForList.class).addMappings(mapper ->
                mapper.map(src -> src.getCustomer().getFullName(), OrderResponseForList::setNameCustomer));


        return modelMapper.map(order, OrderResponseForList.class);
    }

    public PagedModel<OrderResponseForList> getAllForList(Pageable pageable) {
        return new PagedModel<>(orderRepository.findAll(pageable).map(order -> {
            return converToOrderForList(order);
        }));
    }

    public PagedModel<OrderResponseForList> getByIdOrNameAndIspay(Pageable pageable, boolean ispay, String filter) {
        return new PagedModel<>(orderRepository.findByIdOrNameCustomerContainsAndIsPay(filter, ispay, pageable).map(order -> {
            return converToOrderForList(order);
        }));
    }

    public PagedModel<OrderResponseForList> getByIdOrNameAnd(Pageable pageable, String filter) {
        return new PagedModel<>(orderRepository.findByIdOrNameCustomerContains(filter, pageable).map(order -> {
            return converToOrderForList(order);
        }));
    }


    public List<Order> getListDebt(boolean ispay){
        return orderRepository.findByIsPay(ispay);

        }

//    public List<Order> getListStatus(String status){
//        return orderRepository.findByStatus(OrderStatus.valueOf(status));
//
//    }



    public List<Order> getListOrderCustomerById(Long id) {
        return orderRepository.findByCustomerId(id);
    }
    public PagedModel<OrderResponseForList> getByIdOrNameAndStatus(Pageable pageable, OrderStatus  status, String filter) {
        return new PagedModel<>(orderRepository.findByIdOrNameCustomerContainsAndStatus(filter, status, pageable).map(order -> {
            return converToOrderForList(order);
        }));

    }

    public void delete(Long id){
        orderRepository.delete(orderRepository.findById(id).get());
    }
    @Transactional
    public Order update(Long id, OrderUpdateRequest update) {
        Order order = orderRepository.findById(id).orElseThrow(()-> new AppException(ErrorMessage.NOT_FOUND));
        if(!Objects.isNull(update.getAddress())){
            order.setAddress(update.getAddress());
        }
        if(!Objects.isNull(update.getPhone())){
            order.setPhone(update.getPhone());
        }
        order.setVat(update.getVat());
        order.setStatus(OrderStatus.valueOf(update.getStatus()));
        order.setTypeOrder(TypeOrder.valueOf(update.getTypeOrder()));
        order.setDateShip(update.getDateShip());
        order.setPay(update.isPay());

        // Update order items if provided
        if (update.getOrderItems() != null) {
            order.getOrderItems().clear();
            List<OrderItem> updatedItems = update.getOrderItems();
            updatedItems.forEach(item -> item.setOrder(order)); // Set order reference
            order.getOrderItems().addAll(updatedItems);
        }



        order.setTotalPrice(order.getOrderItems().stream().mapToLong(item -> item.getQuanlityProduct() * item.getPricePerOne()).sum());
        return orderRepository.save(order);
    }


//    public void createPDF(Long idOrder) {
//        Order order = orderRepository.findById(idOrder).orElseThrow(() -> new AppException(ErrorMessage.SERVER_ERROR));
//        pdfUtils.createPDF(companyService.getMyCompany(), pathOrdeFile + File.separator +order.getId() + ".pdf", order);
//
//    }

}

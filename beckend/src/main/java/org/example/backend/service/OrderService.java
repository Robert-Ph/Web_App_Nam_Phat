package org.example.backend.service;


import jakarta.annotation.PostConstruct;
import org.example.backend.dto.request.CustomerRequest;
import org.example.backend.dto.request.OrderRequest;

import org.example.backend.dto.request.OrderUpdateRequest;
import org.example.backend.dto.response.OrderResponseForList;
import org.example.backend.entity.Customer;
import org.example.backend.entity.Invoice;
import org.example.backend.entity.Order;
import org.example.backend.entity.OrderItem;
import org.example.backend.entity.enums.OrderStatus;
import org.example.backend.entity.enums.TypeOrder;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.InvoiceRepository;
import org.example.backend.repository.OrderItemRepository;
import org.example.backend.repository.OrderRepository;
import org.example.backend.utils.ConverDate;
import org.example.backend.utils.PDFUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

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

    private ConverDate converDate;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Value("${file.invoice.path}")
    private String pathOrdeFile;


    @Transactional
    public Order create(OrderRequest request) {
        Order order = modelMapper.map(request, Order.class);
        if (order.isNew()){
            Customer customer = customerService.findCustomerByPhone(request.getPhone());
            order.setCustomer(customer);
            order.setPhone(customer.getPhone());
            order.setAddress(Optional.ofNullable(request.getAddress()).orElse(customer.getAddress()));
        }else{
            CustomerRequest customerRequest = new CustomerRequest(request.getCusomerNameNew(), request.getPhone(), null,null, request.getAddress(),"personally");
            Customer customer = customerService.create(customerRequest);
            order.setCustomer(customer);
            order.setPhone(request.getPhone());
            order.setAddress(request.getAddress());

        }
        order.setStatus(OrderStatus.CONFIM);
        order.setTotalPrice(order.getOrderItems().stream()
                .mapToLong(item -> (long) item.getQuanlityProduct() * item.getPricePerOne())
                .sum());
        order.setVat(request.getVat());
        order.setReduce(request.getReduce());

        // Lưu order trước để có ID cho OrderItem
        Order savedOrder = orderRepository.save(order);

        // Thiết lập quan hệ và lưu từng item
        order.getOrderItems().forEach(item -> {
            item.setOrder(savedOrder);
        });
        orderItemRepository.saveAll(order.getOrderItems()); // dùng saveAll thay vì vòng lặp thủ công

        // Lưu invoice
        invoiceRepository.save(Invoice.builder()
                .priceNeedPay((long) Math.round(order.getTotalPrice()))
                .order(savedOrder)
                .build());

        return savedOrder;
    }


    //get order by id
    public Order getById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.ORDER_NOT_FOUND));
    }



    private OrderResponseForList converToOrderForList(Order order) {
        // Tạo DTO thủ công để kiểm soát logic
        OrderResponseForList dto = modelMapper.map(order, OrderResponseForList.class);

            dto.setNameCustomer(order.getCustomer().getFullName());

        return dto;
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
        return orderRepository.findByIsPay(ispay)
                .stream()
                .filter(order -> !order.getStatus().equals(OrderStatus.CANCELLED))
                .collect(Collectors.toList());

        }



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

    public void updtateIsPay(Long id){
        Order order = orderRepository.findById(id).get();
        order.setPay(true);
        order.setDatePayment(converDate.date(LocalDateTime.now()));
        orderRepository.save(order);

    }
    public void updtateStatusCon(Long id){
        Order order = orderRepository.findById(id).get();
        order.setStatus(OrderStatus.CONFIM);
        orderRepository.save(order);

    }
    public void updtateStatusFis(Long id){
        Order order = orderRepository.findById(id).get();
        order.setStatus(OrderStatus.FISNISHED);
        orderRepository.save(order);

    }
    public void updtateStatusCan(Long id){
        Order order = orderRepository.findById(id).get();
        Invoice invoice = invoiceRepository.findByOrder(order).get();
        invoiceRepository.delete(invoice);
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

    }
    public void updtateStatusDevii(Long id){
        Order order = orderRepository.findById(id).get();
        order.setStatus(OrderStatus.DELIVERED);
        orderRepository.save(order);

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

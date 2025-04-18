package org.example.backend.service;

import org.example.backend.entity.enums.LogLevel;
import org.example.backend.dto.request.StockOutRequest;
import org.example.backend.entity.Product;
import org.example.backend.entity.StockOut;
import org.example.backend.repository.StockOutRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StockOutService {

    @Autowired
    private StockOutRepository stockOutRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LogService logService;


    //Create Stock Out
    @Transactional
    public StockOut create(StockOutRequest request){
        StockOut stockOut = new StockOut();
        Product product = productService.findById(request.getProductId());

        inventoryService.updateQuanlity(-request.getQuantity(), request.getProductId());

        stockOut.setProduct(product);
        stockOut.setQuantity(request.getQuantity());
        stockOut.setReson(request.getReson());
        stockOut = stockOutRepository.save(stockOut);

        logService.log(LogLevel.WARNING,"Tạo đơn hàng xuất kho với mã là " + stockOut.getId());

        return stockOut;
    }

    //Get list stock out
    public List<StockOut> getAll(){
        return stockOutRepository.findAll();
    }

    //Get list stock out with page able
    public PagedModel<StockOut> getAll(Pageable pageable){
        return new PagedModel<>(stockOutRepository.findAll(pageable));
    }

    public PagedModel<StockOut> getByFilter(String filter,Pageable pageable){
        return new PagedModel<>(stockOutRepository.findStockOutByFilter(filter,pageable));
    }



}

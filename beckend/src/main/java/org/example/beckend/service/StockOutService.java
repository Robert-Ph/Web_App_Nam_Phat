package org.example.beckend.service;

import org.example.beckend.dto.request.StockOutRequest;
import org.example.beckend.entity.Product;
import org.example.beckend.entity.StockOut;
import org.example.beckend.repository.StockOutRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    //Create Stock Out
    @Transactional
    public StockOut create(StockOutRequest request){
        StockOut stockOut = new StockOut();
        Product product = productService.findById(request.getProductId());

        inventoryService.updateQuanlity(-request.getQuantity(), request.getProductId());

        stockOut.setProduct(product);
        stockOut.setQuantity(request.getQuantity());
        stockOut.setReson(request.getReson());

        return stockOutRepository.save(stockOut);
    }

    //Get list stock out
    public List<StockOut> getAll(){
        return stockOutRepository.findAll();
    }

    //Get list stock out with page able
    public Page<StockOut> getAll(Pageable pageable){
        return stockOutRepository.findAll(pageable);
    }

}

package org.example.beckend.service;

import org.example.beckend.dto.request.InventoryRequest;
import org.example.beckend.dto.request.StockInDetailRequest;
import org.example.beckend.dto.request.StockInRequest;
import org.example.beckend.dto.response.InventoryReponse;
import org.example.beckend.entity.Product;
import org.example.beckend.entity.StockIn;
import org.example.beckend.entity.StockInDetail;
import org.example.beckend.repository.StockInRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class StockInService {
    @Autowired
    private StockInRepository stockInRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;


    @Transactional
    public StockIn create(StockInRequest request) {
        Product product;
        InventoryRequest inventoryRequest;
        InventoryReponse inventoryReponse;


        StockIn stockIn = new StockIn();

        StockInDetail temp;
        List<StockInDetail> stockInDetailList = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();




        for (StockInDetailRequest item:
             request.getListStockInDetails()) {
            if(Objects.isNull(item.getProductId())){
                inventoryRequest = modelMapper.map(item,InventoryRequest.class);
                inventoryReponse = inventoryService.create(inventoryRequest,now);
                temp = modelMapper.map(item,StockInDetail.class);
                temp.getProduct().setId(inventoryReponse.getProduct().getId());
            }else {
                inventoryReponse = inventoryService.updateQuanlity(item.getQuanlity(), item.getProductId());
                temp = modelMapper.map(item,StockInDetail.class);
                temp.setProduct(inventoryReponse.getProduct());
                temp.setId(temp.getId());

            }
            System.out.println(temp.toString());
            stockInDetailList.add(temp);
        }

        stockIn.setDateCreate(now);
        stockIn.setListStockInDetails(stockInDetailList);
//        stockIn.setSupplier(request.getSupplier());
//        stockIn.setTotalPrice(request.getTotalPrice());

        return null;

    }
}

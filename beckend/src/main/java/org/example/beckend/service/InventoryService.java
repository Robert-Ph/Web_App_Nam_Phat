package org.example.beckend.service;

import lombok.extern.slf4j.Slf4j;
import org.example.beckend.dto.request.InventoryRequest;
import org.example.beckend.dto.response.InventoryReponse;
import org.example.beckend.entity.Inventory;
import org.example.beckend.entity.Product;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.InventoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    ProductService productService;

    @Autowired
    private ModelMapper modelMapper;


    public InventoryReponse create(InventoryRequest request, LocalDateTime date) {
        Inventory inventory = new Inventory();
        inventory.setQuanlity(request.getQuanlity());
        inventory.setLastDateIn(date);

        Product product = modelMapper.map(request.getProduct(), Product.class);

        inventory.setProduct(product);

        return modelMapper.map(inventoryRepository.save(inventory), InventoryReponse.class);
    }

    public InventoryReponse create(InventoryRequest request) {
        Inventory inventory = new Inventory();
        inventory.setQuanlity(request.getQuanlity());


        Product product = modelMapper.map(request.getProduct(), Product.class);

        inventory.setProduct(product);

        return modelMapper.map(inventoryRepository.save(inventory), InventoryReponse.class);
    }

    public InventoryReponse updateQuanlity(int quanlity, Long proId) {
        Product product = productService.findById(proId);
        Inventory update = inventoryRepository.findByProduct(product);

        if (update == null) {
            throw new AppException(ErrorMessage.INVENTORY_NOT_FOUND);
        }
        update.setQuanlity(update.getQuanlity() + quanlity);
        return modelMapper.map(update, InventoryReponse.class);
    }

    public Page<InventoryReponse> getAll(Pageable pageable) {
        Page<Inventory> allInventory = inventoryRepository.findAll(pageable);
        return allInventory.map(entity -> {
            return modelMapper.map(entity, InventoryReponse.class);
        });
    }


}

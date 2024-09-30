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
import org.springframework.data.web.PagedModel;
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

    //Create iventory with time
    public InventoryReponse create(InventoryRequest request, LocalDateTime date) {
        Inventory inventory = new Inventory();
        inventory.setQuanlity(request.getQuanlity());
        inventory.setLastDateIn(date);

        Product product = modelMapper.map(request.getProduct(), Product.class);

        inventory.setProduct(product);

        return modelMapper.map(inventoryRepository.save(inventory), InventoryReponse.class);
    }

    //Create inventory with time is now
    public InventoryReponse create(InventoryRequest request) {
        Inventory inventory = new Inventory();
        inventory.setQuanlity(request.getQuanlity());


        Product product = modelMapper.map(request.getProduct(), Product.class);

        inventory.setProduct(product);

        return modelMapper.map(inventoryRepository.save(inventory), InventoryReponse.class);
    }

    //update inventory with dateUpdate is now
    public InventoryReponse updateQuanlity(int quanlity, Long proId) {
        Product product = productService.findById(proId);
        Inventory update = inventoryRepository.findByProduct(product);

        //Check if not found inventory with product
        if (update == null) {
            throw new AppException(ErrorMessage.INVENTORY_NOT_FOUND);
        }


        int quanlityAfterUpdate = update.getQuanlity() + quanlity;
        //Check if quanlity in warehouse smaller request
        if (quanlityAfterUpdate < 0) {
            throw new AppException(ErrorMessage.INVENTORY_QUANLITY_NOT_ALLOW);
        }

        update.setQuanlity(quanlityAfterUpdate);
        return modelMapper.map(inventoryRepository.save(update), InventoryReponse.class);
    }


    //Update inventory with localdate time
    public InventoryReponse updateQuanlity(int quanlity, Long proId, LocalDateTime dateTime) {
        Product product = productService.findById(proId);
        Inventory update = inventoryRepository.findByProduct(product);

        if (update == null) {
            throw new AppException(ErrorMessage.INVENTORY_NOT_FOUND);
        }

        int quanlityAfterUpdate = update.getQuanlity() + quanlity;
        //Check if quanlity in warehouse smaller request
        if (quanlityAfterUpdate < 0) {
            throw new AppException(ErrorMessage.INVENTORY_QUANLITY_NOT_ALLOW);
        }

        update.setQuanlity(quanlityAfterUpdate);
        update.setLastDateIn(dateTime);
        return modelMapper.map(inventoryRepository.save(update), InventoryReponse.class);
    }

    //Get all inventory with Pageable
    public PagedModel<InventoryReponse> getAll(Pageable pageable) {
        Page<Inventory> allInventory = inventoryRepository.findAll(pageable);
        Page<InventoryReponse> page =  allInventory.map(entity -> {
            return modelMapper.map(entity, InventoryReponse.class);
        });
        return new PagedModel<>(page);
    }

    //Method for get Inventory by product Id
    public InventoryReponse getInventoryByProductId(Long id) {
        Product product = productService.findById(id);

        Inventory inventory = inventoryRepository.findByProduct(product);
        return modelMapper.map(inventory, InventoryReponse.class);
    }


}

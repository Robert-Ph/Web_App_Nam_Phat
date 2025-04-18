package org.example.backend.service;

import org.example.backend.dto.request.ProductRequest;
import org.example.backend.entity.Product;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    //Create product
    public Product create(ProductRequest request) {
        Product product = modelMapper.map(request, Product.class);
        return productRepository.save(product);
    }


    //Update product
    public Product update(ProductRequest request,Long id){
        Optional<Product> productOld = productRepository.findById(id);
        if(productOld.isEmpty()){
            throw  new AppException(ErrorMessage.PRODUCT_NOT_FOUND);
        }
        Product save = productOld.get();
        modelMapper.map(request,save);
        return productRepository.save(save);
    }


    //Find product with id
    public Product findById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.PRODUCT_NOT_FOUND));
    }


    //Find product if contains  name
    public List<Product> findByName(String name){
        return productRepository.findByNameContains(name);
    }

    public List<Product> findByIdConstains(String id){
        return productRepository.findByIdPattern(id);
    }
}

package org.example.beckend.service;

import org.example.beckend.dto.request.ProductRequest;
import org.example.beckend.entity.Product;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Product create(ProductRequest request) {
        Product product = modelMapper.map(request, Product.class);
        return productRepository.save(product);
    }

    public Product update(ProductRequest request,Long id){
        Optional<Product> productOld = productRepository.findById(id);
        if(productOld.isEmpty()){
            throw  new AppException(ErrorMessage.PRODUCT_NOT_FOUND);
        }
        Product save = productOld.get();
        modelMapper.map(request,save);
        return save;
    }

    public Product findById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new AppException(ErrorMessage.PRODUCT_NOT_FOUND));
    }
}

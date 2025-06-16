package org.example.backend.service.automation;


import org.example.backend.dto.request.automation.EnhanceRequest;
import org.example.backend.entity.automation.Enhance;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.EnhanceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnhanceService {

    @Autowired
    private EnhanceRepository enhanceRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Enhance createEnhance(EnhanceRequest enhance) {
        Enhance enhanceEntity = modelMapper.map(enhance, Enhance.class);
        Optional<Enhance> enhanceEntityOptional = enhanceRepository.findEnhanceByName(enhanceEntity.getName());
        if (enhanceEntityOptional.isPresent()) {
            throw new AppException(ErrorMessage.MAN_ALREADY_EXITSTS);
        }else {
            enhanceEntity = enhanceRepository.save(enhanceEntity);
        }
        return enhanceEntity;
    }

    public Enhance updateEnhance(Enhance enhance) {
        Enhance enhanceEntity = modelMapper.map(enhance, Enhance.class);

        Enhance enhance1 = enhanceRepository.findById(enhance.getId()).get();
        if (enhance1 != null) {
            enhance1.setName(enhance.getName());
            enhance1.setPrice(enhance.getPrice());
            enhance1 = enhanceRepository.save(enhanceEntity);
        }else {
            throw new AppException(ErrorMessage.MAN_NOT_FOUND);
        }
        return enhance1;
    }

    public Enhance getEnhanceById(long id) {
        return enhanceRepository.findById(id).get();
    }
}

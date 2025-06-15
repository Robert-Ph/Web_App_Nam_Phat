package org.example.backend.service.automation;

import org.example.backend.dto.request.automation.MansRequest;
import org.example.backend.entity.automation.Mans;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.MansRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MansService {

    @Autowired
    private MansRepository mansRepository;


    @Autowired
    private ModelMapper modelMapper;

    public Mans createMans(MansRequest mans) {
        Optional<Mans> optional = mansRepository.findMansByName(mans.getName());
        Mans mans1 = modelMapper.map(mans, Mans.class);

        if (optional.isPresent()) {
            throw new AppException(ErrorMessage.MAN_ALREADY_EXITSTS);
        }else {
            mans1 = mansRepository.save(mans1);
        }
        return mans1;
    }

    public Mans updateMans(MansRequest mans) {
        Optional<Mans> optional = mansRepository.findMansByName(mans.getName());
        Mans mans1 = modelMapper.map(mans, Mans.class);
        if (optional.isPresent()) {
            mans1 = mansRepository.save(mans1);
        }else {
            throw new AppException(ErrorMessage.MAN_NOT_FOUND);
        }
        return mans1;
    }

    public Mans getMans(Long id) {
        return mansRepository.findById(id).orElse(null);
    }

}

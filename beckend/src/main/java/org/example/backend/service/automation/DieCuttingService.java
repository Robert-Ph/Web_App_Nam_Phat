package org.example.backend.service.automation;

import org.example.backend.dto.request.automation.DieCuttingRequest;
import org.example.backend.entity.automation.DieCutting;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.DieCuttingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.OpenOption;
import java.util.Optional;

@Service
public class DieCuttingService {

    @Autowired
    private DieCuttingRepository dieCuttingRepository;

    @Autowired
    private ModelMapper modelMapper;

    public DieCutting create(DieCuttingRequest request) {
        Optional<DieCutting> optional = dieCuttingRepository.findDieCuttingByName(request.getName());
        DieCutting dieCutting = modelMapper.map(request, DieCutting.class);
        if (optional.isPresent()) {
            throw new AppException(ErrorMessage.MAN_ALREADY_EXITSTS);
        }else {
            dieCutting = dieCuttingRepository.save(dieCutting);
        }

        return dieCutting;
    }

    public DieCutting update(DieCutting updateRequest) {
        DieCutting dieCutting = dieCuttingRepository.findById(updateRequest.getId()).get();
        if (updateRequest.getName() != null) {
            dieCutting = dieCuttingRepository.save(updateRequest);
        }else {
            throw new AppException(ErrorMessage.MAN_NOT_FOUND);
        }
        return dieCutting;
    }

    public DieCutting findById(Long id) {
        return dieCuttingRepository.findById(id).get();
    }

    public DieCutting findByName(String name) {
        return dieCuttingRepository.findDieCuttingByName(name).get();
    }
}

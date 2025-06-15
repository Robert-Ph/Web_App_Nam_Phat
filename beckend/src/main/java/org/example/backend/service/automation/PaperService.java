package org.example.backend.service.automation;

import org.example.backend.dto.request.automation.PaperRequest;
import org.example.backend.entity.Employee;
import org.example.backend.entity.automation.Paper;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.PagerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaperService {

    @Autowired
    private PagerRepository pagerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Paper createPaper(PaperRequest paper) {
        Optional<Paper> paper1 = pagerRepository.findByName(paper.getName());
        Paper paper2 =  modelMapper.map(paper, Paper.class);
        if(paper1.isPresent()) {
            throw new AppException(ErrorMessage.PAPER_ALREADY_EXITSTS);
        }else {
            pagerRepository.save(paper2);
        }

        return paper2;
    }

    public void updatePaper(Paper paper) {
        Paper paper1 = pagerRepository.findById(paper.getId()).orElse(null) ;
        if(paper1 != null) {
            pagerRepository.save(paper);
        }else {
            throw new AppException(ErrorMessage.PAPER_NOT_FOUND);
        }
    }

    public void deletePaper(Paper paper) {
        Paper paper1 = pagerRepository.findById(paper.getId()).orElse(null) ;
        if(paper1 != null) {
            pagerRepository.delete(paper);
        }else {
            throw new AppException(ErrorMessage.PAPER_NOT_FOUND);
        }
    }

    public Paper getPaperById(Long id) {
        return pagerRepository.findById(id).orElse(null);
    }
}

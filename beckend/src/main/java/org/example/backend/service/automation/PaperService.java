package org.example.backend.service.automation;

import org.example.backend.dto.request.automation.PaperRequest;
import org.example.backend.entity.automation.Paper;
import org.example.backend.exception.AppException;
import org.example.backend.message.ErrorMessage;
import org.example.backend.repository.automation.PagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaperService {

    @Autowired
    private PagerRepository pagerRepository;

    public Paper createPaper(PaperRequest paper) {
        Optional<Paper> paper1 = pagerRepository.findByName(paper.getName());
        Paper paper2 = new Paper();
        if(paper1 != null) {
            throw new AppException(ErrorMessage.PAPER_ALREADY_EXITSTS);
        }else {

            paper2.setName(paper.getName());
            paper2.setHeight(paper.getHeight());
            paper2.setWeight(paper.getWeight());
            paper2.setOneColorPrintPrice(paper.getOneColorPrintPrice());
            paper2.setTwoColorPrintPrice(paper.getTwoColorPrintPrice());
            paper2.setOnePrintPrice(paper.getOnePrintPrice());
            paper2.setTwoPrintPrice(paper.getTwoPrintPrice());

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
}

package org.example.beckend.service;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.example.beckend.contains.LogLevel;
import org.example.beckend.dto.request.InventoryRequest;
import org.example.beckend.dto.request.StockInDetailRequest;
import org.example.beckend.dto.request.StockInRequest;
import org.example.beckend.dto.response.InventoryReponse;
import org.example.beckend.dto.response.StockInForListResponse;
import org.example.beckend.dto.response.StockInResponse;
import org.example.beckend.entity.Product;
import org.example.beckend.entity.StockIn;
import org.example.beckend.entity.StockInDetail;
import org.example.beckend.entity.embeddable.StockInDetailId;
import org.example.beckend.exception.AppException;
import org.example.beckend.message.ErrorMessage;
import org.example.beckend.repository.StockInDetailRepository;
import org.example.beckend.repository.StockInRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class StockInService {
    @Autowired
    private StockInRepository stockInRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private FileService fileService;

    @Value("${image.storage.path}")
    private String path;

    @Value("${base.url.domain}")
    private String baseUrl;

    @Autowired
    private StockInDetailRepository stockInDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LogService logService;


    //Create StockIn with no image
    @Transactional
    public StockIn create(StockInRequest request) {
        InventoryRequest inventoryRequest;
        InventoryReponse inventoryReponse;


        StockIn stockIn = new StockIn();

        StockInDetail temp;
        List<StockInDetail> stockInDetailList = new ArrayList<>();


        LocalDateTime now = LocalDateTime.now();
        //Set infor stockin
        stockIn.setDateCreate(now);
        stockIn.setSupplier(request.getSupplier());
        stockIn.setTotalPrice(request.getTotalPrice());

        //Save stockin
        stockIn = stockInRepository.save(stockIn);

        StockInDetailId stockInDetailId;


        for (StockInDetailRequest item :
                request.getListStockInDetails()) {


            //If stock in details contains product not unvaiable (id is null) in system then add new product and inventory
            if (Objects.isNull(item.getProductId())) {
                //Convert to inventory request
                inventoryRequest = modelMapper.map(item, InventoryRequest.class);
                inventoryReponse = inventoryService.create(inventoryRequest, now);
                temp = modelMapper.map(item, StockInDetail.class);


            } else {

                System.out.println("id" + item.getProductId());
                inventoryReponse = inventoryService.updateQuanlity(item.getQuanlity(), item.getProductId(),now);
                temp = modelMapper.map(item, StockInDetail.class);

            }
            //Set product and stock for stockin detail
            temp.setProduct(inventoryReponse.getProduct());
            temp.setStockIn(stockIn);
            temp.setPriceImport(inventoryReponse.getProduct().getPrice());

            //Set id for stock detail is foreign key  stockin id and id product id
            stockInDetailId = new StockInDetailId();
            stockInDetailId.setStockInId(stockIn.getId());
            stockInDetailId.setProductId(inventoryReponse.getProduct().getId());
            temp.setId(stockInDetailId);

            //Save stock in detail
            stockInDetailRepository.save(temp);


            stockInDetailList.add(temp);

        }


        stockIn.setListStockInDetails(stockInDetailList);
        logService.log(LogLevel.WARNING,"Nhập kho với mã đơn là:" + stockIn.getId());

        return stockIn;

    }
    //Stock in with image
    @Transactional
    public StockInResponse create(StockInRequest request, MultipartFile file) {
        StockIn stockIn = create(request);

        //Get id stock and rename image is id +".png"
        String imageName = stockIn.getId() + ".png";
        stockIn.setImageInvoice(imageName);
        stockIn = stockInRepository.save(stockIn);


        //file service upload image on server
        fileService.uploadFile(path, imageName, file);

        return modelMapper.map(stockIn, StockInResponse.class);
    }

    //Get list with no pageable
    public List<StockInForListResponse> getAll(){

        logService.log(LogLevel.INFOR,"Lấy danh sách nhập kho");
        List<StockIn> stockIns = stockInRepository.findAll(Sort.by(Sort.Direction.DESC,"dateCreate"));
        return stockIns.stream().map(entity -> {
            //convert image to url image controller
            entity.setImageInvoice(baseUrl +"/images/" + entity.getImageInvoice());
            return modelMapper.map(entity,StockInForListResponse.class);
        }).collect(Collectors.toList());
    }


    //Get list all with pagealbe
    public PagedModel<StockInForListResponse> getAll(Pageable pageable){
        logService.log(LogLevel.INFOR,"Lấy danh sách nhập kho trang " + pageable.getPageNumber() + 1);
        Page<StockIn> stockIns = stockInRepository
                .findAll(pageable);
        Page<StockInForListResponse> page =  stockIns.map(entity -> {
            //convert image to url image controller
            entity.setImageInvoice(baseUrl +"/images/" + entity.getImageInvoice());
            return  modelMapper.map(entity,StockInForListResponse.class);
        });
        return new PagedModel<>(page);
    }

    //Method for get stock in by id
    public StockInResponse getById(Long id){

        logService.log(LogLevel.INFOR,"Lấy thông tin nhập kho với mã là " + id);
        Optional<StockIn> stockIn = stockInRepository.findById(id);

        if(stockIn.isEmpty()){
            throw new AppException(ErrorMessage.SERVER_NOT_FOUND);
        }
        StockIn data = stockIn.get();
        //convert image to url image controller
        data.setImageInvoice(baseUrl +"/images/" + data.getImageInvoice());
        return modelMapper.map(data,StockInResponse.class);
    }


}

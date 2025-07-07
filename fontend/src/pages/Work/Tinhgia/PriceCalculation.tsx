import { Link } from "react-router-dom";
import "./PriceCalculation.css";
import {useEffect, useState} from "react";
import Paper from "../../../model/automation/paper.tsx";
import PaperService from "../../../service/automation/PaperService.tsx";
import MansService from "../../../service/automation/MansService.tsx";
import Mans from "../../../model/automation/Mans.tsx";
import DieCutting from "../../../model/automation/DieCutting.tsx";
import TypeCustomer from "../../../model/automation/TypeCustomer.tsx";
import Enhance from "../../../model/automation/Enhance.tsx";
import DieCuttingService from "../../../service/automation/DieCuttingService.tsx";
import TypeCustomerService from "../../../service/automation/TypeCustomerService.tsx";
import EnhanceService from "../../../service/automation/EnhanceService.tsx";
import {toast} from "react-toastify";
import {formatCurrency} from "../../../utils/Utils.tsx";


const PriceCalculation = () => {
  const [papers, setPaper] = useState<Paper[]>([]);
  const [mans, setMans] = useState<Mans[]>([])
  const [dieCutting, setDieCutting] = useState<DieCutting[]>([])
  const [typeCustomer, setTypeCustomer] = useState<TypeCustomer[]>([])
  const [enahnce, setEnhance] = useState<Enhance[]>([])
  const [selectedPaperId, setSelectedPaperId] = useState< number>(0); // ID giấy được chọn
  const [selectMansID, setSelectMansID] = useState<number>(0);
  const [numberMan, setNumberMan] = useState<number>(1);
  const [selectTypeCustomer, setSelectTypeCustomer] = useState<number>(0);
  const [numberTem, setNumberTem] = useState<number>(0);
  const [numberChange, setNumberChange ] = useState<number>(1);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledDrilling, setIsEnabledDrilling] = useState(false);
  const [isEnabledStamping, setIsEnabledStamping] = useState(false);
  const [isEnabledChange, setIsEnabledChange] = useState(false);
  const [_isMan, setIsMan] = useState(false);
  const [isCutFinished, setIsCutFinished] = useState(false);
  const [khuon, setKhuon] = useState("oval"); // giá trị mặc định
  const [methodCutting, setMetodCutting] = useState("be_tem");

  const [heightTem, setHeightTem] = useState<number>(0);
  const [weightTem, setWeightTem] = useState<number>(0);
  const [numberPrint, setNumberPrint] = useState<number>(1);
  // const [typePrint, setTypePrint] = useState<string>("CMYK");
  // const [coating, setCoating] = useState<Mans>();
  // const [numberCoating, setNumberCoating] = useState<number>(1);
  const [surcharge, setSurcharge] = useState<number>(20000);
  const [discount, setdiscount] = useState<number>(0);

  const [numberTemInPaper, setNumberTeminPaper] = useState<number>(0);
  const [totalPaper, setTotalPage] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Tìm ra giấy đang được chọn
  const selectedPaper = papers.find((p) => p.id === selectedPaperId);
  const selectMan = mans.find((m)=> m.id === selectMansID);
  const selectTypeCus = typeCustomer.find((t) => t.id === selectTypeCustomer);

  const handCalculator = () => {
    setdiscount(0);
    setSurcharge(20000)
    if (heightTem === 0 || weightTem === 0) {
      toast.error("Kích thước tem không được bỏ trống!", { autoClose: 1000 });
      return;
    }

    if (selectedPaperId === 0) {
      toast.error("Vui lòng chọn số lượng cần in!", { autoClose: 1000 });
      return;
    }

    if (numberTem === 0) {
      toast.error("Vui lòng chọn loại giấy in!", { autoClose: 1000 });
      return;
    }

    if (selectTypeCustomer === 0){
      toast.error("Vui lòng chọn loại khách hàng!", { autoClose: 1000 });
      return;
    }

    let tempHeight = heightTem;
    let tempWidth = weightTem;

    if (isEnabled && (khuon === "oval" || khuon === "special")) {
      tempHeight += 2;
      tempWidth += 2;
    }

    const paperHeight = (selectedPaper?.height || 0) - 20;
    const paperWidth = (selectedPaper?.weight || 0) - 20;

    const normalRows = Math.floor(paperHeight / tempHeight);
    const normalCols = Math.floor(paperWidth / tempWidth);
    const normalTotal = normalRows * normalCols;

    const rotatedRows = Math.floor(paperHeight / tempWidth);
    const rotatedCols = Math.floor(paperWidth / tempHeight);
    const rotatedTotal = rotatedRows * rotatedCols;

    const bestFit = Math.max(normalTotal, rotatedTotal);
    const totalPages = bestFit > 0 ? Math.ceil(numberTem / bestFit) : 0;

    setNumberTeminPaper(bestFit);
    setTotalPage(totalPages);

    // Tính giá

    let total = totalPages * (selectedPaper?.oneColorPrintPrice || 0);

    if (totalPages< 5){
      total += 50000;
    }else if (totalPages <= 50){
      total += 35000;
    }else if (totalPages <= 100){
      total += 30000;
    }else if (total <= 500){
      total += 20000;
    }else if (totalPages <= 1000){
      total += 15000;
    }
    else {
      total += 10000;
    }

    if (totalPages<= 20){
      total += surcharge;
    }
    // else if (totalPages <= 100){
    //   setSurcharge(surcharge * 1.2);
    //   total += surcharge * 1.2;
    // }else if (totalPages <= 500){
    //   setSurcharge(surcharge * 1.5);
    //   total += surcharge * 1.5;
    // }else if (totalPages <= 1000){
    //   setSurcharge(surcharge * 3);
    //   total += surcharge * 3;
    // }
    else {
      setSurcharge(0);
      // total += surcharge * 4;
    }

    if (selectMansID !== 0) {
      total += totalPages * (selectMan?.onePrice || 0) * numberMan;
    }

    if (isEnabled) {
      const dieCut = dieCutting.find((b) => b.id === 1);
      total += totalPages * (dieCut?.price || 0);
    }

    if (isCutFinished) {
      const cut = dieCutting.find((b) => b.id === 2);
      total += totalPages * (cut?.price || 0);
    }

    if (selectTypeCustomer === 2){
      const type = typeCustomer.find((t)=>t.id === selectTypeCustomer);

        const percent = type?.precentage ?? 0; // nếu type hoặc precentage là undefined => 0
        total *= 1 - (percent / 100);
        setdiscount(Math.ceil(totalPrice - (totalPrice*(1 - (percent / 100)))));

    }

    if (isEnabledDrilling){
       const drilling = enahnce.find((d) => d.id===1);
       total += numberTem*(drilling?.price || 0);
    }

    if (isEnabledStamping){
      const drilling = enahnce.find((d) => d.id===2);
      total += numberTem*(drilling?.price || 0);
    }

    if (isEnabledChange){
      const drilling = enahnce.find((d) => d.id===3);
      total += totalPages*((drilling?.price || 0) * numberChange);
    }

    setTotalPrice(total);
  };










  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsEnabled(e.target.value === 'yes');
  };

  const handleChangeDrilling = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setIsEnabledDrilling(e.target.value === 'yes');
  };
  const handleChangeStamping = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setIsEnabledStamping(e.target.value === 'yes');
  };
  const handleChangeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setIsEnabledChange(e.target.value === 'yes');
  };
  const handleChangeCutFinished = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setIsCutFinished(e.target.value === 'yes');
  };

  const handleChangePrintSide = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberPrint(Number(e.target.value)); // ép kiểu về number

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaperService.getBy();
        setPaper(response.data.data);

        const resMans = await  MansService.getBy();
        setMans(resMans.data.data);

        const resDieCutting = await DieCuttingService.getBy();
        setDieCutting(resDieCutting.data.data);

        const resTypeCustomer = await TypeCustomerService.getBy();
        setTypeCustomer(resTypeCustomer.data.data);

        const reEnhance = await EnhanceService.getBy();
        setEnhance(reEnhance.data.data);


      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);



  return (
    <div>
      <div className="main-body">
        <h3>Tính giá tự động</h3>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <Link to="/work/price_calculation/custom_price" state={{ enableButton: true }}>
                <button className="btn btn-primary" >
                  Thiết lập giá
                </button>
              </Link>

              <button onClick={handCalculator}
                  className="btn btn-primary" style={{backgroundColor: "blue"}}>
                Tính giá
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="boxprice">
          <div>
            <h4>Kích thước sản phẩm<span style={{color: "red"}}>*</span>:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều rộng (W)<span style={{color: "red"}}>*</span>:</p>
              <input
                  onChange={(e) =>{
                  setWeightTem(Number(e.target.value));
              }}
                     style={{height:"35px", marginRight:"10px", }} type="number" />
              <p>mm</p>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều cao (H)<span style={{color: "red"}}>*</span>:</p>
              <input
                  onChange={(e) =>{
                    setHeightTem(Number(e.target.value));
                  }}
                  style={{height:"35px", marginRight:"10px"}} type="number" />
              <p>mm</p>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Số lượng tem<span style={{color: "red"}}>*</span>:</p>
              <input
                  onChange={(e) =>{
                    setNumberTem(Number(e.target.value));
                  }}
                  style={{height:"35px", marginRight:"10px"}} type="number" />
              <p>mm</p>
            </div>
          </div>

          {/*// Loai giay in*/}
          <div>
            <h4>Loại giấy in<span style={{color: "red"}}>*</span>:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Loại giấy<span style={{color: "red"}}>*</span>:</p>
              <select
                  value={selectedPaperId ?? ""}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedPaperId(id);
                  }}


                  style={{ height: "35px", marginRight: "0px", marginLeft: "0", width:"300px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="">-- Chọn loại giấy --</option>
                {papers.map((paper) => (
                    <option key={paper.id} value={paper.id ?? 0}>
                      {paper.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều rộng (W):</p>
              <input style={{height:"35px", marginRight:"10px"}} disabled={true} type="number" value={selectedPaper?.weight ?? ""} />
              <p>mm</p>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều cao (H):</p>
              <input style={{height:"35px", marginRight:"10px"}} disabled={true} type="number" value={selectedPaper?.height ?? ""}/>
              <p>mm</p>
            </div>
          </div>
          {/*// So mat in*/}
          <div className="form-row" style={{fontWeight: "bold"}}>
            <p>Số mặt in:</p>
            <select
                disabled={true}
                value={numberPrint}
                onChange={handleChangePrintSide}
                style={{ height: "35px", marginRight: "100px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          {/*// Loai in*/}
          <div className="form-row" style={{fontWeight: "bold"}}>
            <p>Loại in:</p>
            <select disabled={true} style={{ height: "35px", marginRight: "100px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option1">In màu(CMYK)</option>
              <option  value="option2">In trắng đen</option>
            </select>
          </div>

        </div>

        {/*the div 2*/}
        <div className="boxprice" style={{borderLeft: "1px solid black", borderRight: "1px solid black"}}>
          <div style={{marginLeft: "10px"}}>
            <h4>Chọn cán màng:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Loại màn:</p>
              <select
                  value={selectMansID}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "no") {
                      setSelectMansID(0); // hoặc null tùy theo logic của bạn
                      setIsMan(false);
                    } else {
                      const id = Number(value);
                      setSelectMansID(id);
                      setIsMan(true);
                    }
                  }}

                  style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="no">Không</option>
                {mans.map((man)=>(
                    <option key={man.id} value={man.id ?? 0}>{man.name}</option>
                ))}
              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Số mặt cán:</p>
              <select
                  disabled={true}
                  onChange={(e)=>{
                    setNumberMan(Number(e.target.value));
                  }}
                  style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>


          <div style={{marginLeft: "10px"}}>
            <h4>Chọn bế:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Có/không:</p>
              <select onChange={handleChange}
                      style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="no">Không</option>
                <option value="yes">Có</option>

              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Hình thức:</p>
              <select disabled={!isEnabled}
                      onChange={(e)=>{
                        setMetodCutting(e.target.value);
                      }}
                      style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="be_tem">Bế tem</option>
                <option value="cat_dut">Cắt đứt</option>
                <option value="can">Cấn</option>
              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Khuôn:</p>
              <select disabled={!isEnabled}
                      onChange={(e)=>{
                        setKhuon(e.target.value);
                      }}
                  style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="oval">Oval/Hình tròn</option>
                <option value="square">Hình chữ nhật/ vuông</option>
                <option value="special">Hình đặc biệt</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{fontWeight: "bold"}}>
            <p>Cắt thành phẩm:</p>
            <select onChange={handleChangeCutFinished}
                style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="no">Không</option>
              <option value="yes">Có</option>
            </select>
          </div>

          <div className="form-row" style={{fontWeight: "bold"}}>
            <p >Loại khách hàng<span style={{color: "red"}}>*</span>:</p>
            <select
                value={selectTypeCustomer}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectTypeCustomer(id);
                }}
                style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="">-- Chọn loại khách --</option>
              {typeCustomer?.length > 0 &&
                  typeCustomer.map((type)=>(
                      <option key={type.id} value={type.id ?? 0}>{type.name}</option>
                  ))
              }

            </select>
          </div>

        </div>

        {/*the div 3*/}
        <div className="boxprice">
          <h4>Tùy chọn nâng cao:</h4>
          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Đục lỗ:</p>
            <select onChange={handleChangeDrilling}
                style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="no">Không</option>
              <option value="yes">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Ép kim:</p>
            <select onChange={handleChangeStamping}
                    style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="no">Không</option>
              <option value="yes">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Dữ liệu biến đổi:</p>
            <select onChange={handleChangeChange}
                    style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="no">Không</option>
              <option value="yes">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Số lượng biến đổi:</p>
            <input disabled={!isEnabledChange}
                   onChange={(e)=>{
                     setNumberChange(Number(e.target.value));
                   }}
                   style={{height:"35px", marginRight:"170px"}} type="number"/>
          </div>
        </div>
      </div>
      <div style={{textAlign: "center", marginTop:"20px", color: "blue"}}>
        <h3>Giá: {formatCurrency(totalPrice)} vnđ</h3>
      </div>
      <div style={{ marginTop:"20px"}}>
        <h3 style={{textAlign: "center"}}>Thông tin chi tiết</h3>
        <div className="container1" style={{marginLeft:"300px"}}>
          <div className="boxprice">
            <h4>Kích thước tem(WxH):  <span style={{color:"blue"}}>{weightTem}x{heightTem} (mm)</span></h4>
            <h4>Loại giấy: <span style={{color:"blue"}}>{selectedPaper?.name}</span></h4>
            <h4>Kích thước giấy(WxH): <span style={{color:"blue"}}>{selectedPaper?.weight}x{selectedPaper?.height} (mm)</span></h4>
            <h4>Số mặt in:  <span style={{color:"blue"}}>{numberPrint}</span></h4>
            <h4>Cán màng:  <span style={{color:"blue"}}>{selectMan?.name}</span></h4>
            <h4>Số mặt Cán màng:  <span style={{color:"blue"}}>{numberMan}</span></h4>
            <h4>Bế:  <span style={{color:"blue"}}>{isEnabled ? "có (" + methodCutting+" - "  + khuon +")" : "không"}</span></h4>
            <h4>Cắt thành phẩm: <span style={{color:"blue"}}>{isCutFinished ? "Có"  : "không"}</span></h4>
            <h4>Tùy chọn nâng cao:  tên</h4>
          </div>
          <div className="boxprice">
            <h4>Giá 1 tem:  <span style={{color:"blue"}}>{ Math.ceil(totalPrice / numberTem) || 0} vnđ</span></h4>
            <h4>Số tờ giấy: <span style={{color: "blue"}}>{totalPaper}</span></h4>
            <h4>Số lượng/1 tờ:  <span style={{color:"blue"}}>{numberTemInPaper}</span></h4>
            <h4>Phụ phí:  <span style={{color:"blue"}}>{formatCurrency(surcharge)}</span> vnđ</h4>
            <h4>Loại khách hàng:  <span style={{color:"blue"}}>{selectTypeCus?.name}</span></h4>
            <h4>Giảm giá:  <span style={{color:"blue"}}>{formatCurrency(discount)}</span> vnđ</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceCalculation;

import { Link } from "react-router-dom";
import "./PriceCalculation.css";
import {useEffect, useState} from "react";
import Paper from "../../../model/automation/paper.tsx";
import PaperService from "../../../service/automation/PaperService.tsx";
import MansService from "../../../service/automation/MansService.tsx";
import Mans from "../../../model/automation/Mans.tsx";


const PriceCalculation = () => {
  const [papers, setPaper] = useState<Paper[]>([]);
  const [mans, setMans] = useState<Mans[]>([])
  const [selectedPaperId, setSelectedPaperId] = useState< number>(0); // ID giấy được chọn
  const [selectMansID, setSelectMansID] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaperService.getBy();
        setPaper(response.data.data);

        const resMans = await  MansService.getBy();
        setMans(resMans.data.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Tìm ra giấy đang được chọn
  const selectedPaper = papers.find((p) => p.id === selectedPaperId);

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

              <button className="btn btn-primary" style={{backgroundColor: "blue"}}>
                Tính giá
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="boxprice">
          <div>
            <h4>Kích thước sản phẩm:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều rộng (W):</p>
              <input style={{height:"35px", marginRight:"10px", }} type="number" />
              <p>mm</p>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Chiều cao (H):</p>
              <input style={{height:"35px", marginRight:"10px"}} type="number" />
              <p>mm</p>
            </div>
          </div>

          {/*// Loai giay in*/}
          <div>
            <h4>Loại giấy in:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Loại giấy:</p>
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
            <select style={{ height: "35px", marginRight: "100px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option1">1</option>
              <option value="option2">2</option>
            </select>
          </div>
          {/*// Loai in*/}
          <div className="form-row" style={{fontWeight: "bold"}}>
            <p>Loại in:</p>
            <select style={{ height: "35px", marginRight: "100px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
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
                    const id = Number(e.target.value);
                    setSelectMansID(id);
                  }}

                  style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="option2">Không</option>
                {mans.map((man)=>(
                    <option key={man.id} value={man.id ?? 0}>{man.name}</option>
                ))}
              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Số mặt cán:</p>
              <select

                  style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="option1">1</option>
                <option value="option2">2</option>
              </select>
            </div>
          </div>


          <div style={{marginLeft: "10px"}}>
            <h4>Chọn bế:</h4>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Có/không:</p>
              <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="option2">Không</option>
                <option value="option1">Có</option>

              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Hình thức:</p>
              <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="option1">Bế tem</option>
                <option value="option2">Cắt đứt</option>
                <option value="option2">Cấn</option>
              </select>
            </div>
            <div className="form-row" style={{marginLeft:"40px"}}>
              <p>Khuôn:</p>
              <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                <option value="option1">Oval/Hình tròn</option>
                <option value="option2">Hình chữ nhật/ vuông</option>
                <option value="option2">Hình đặc biệt</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{fontWeight: "bold"}}>
            <p>Cắt thành phẩm:</p>
            <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option1">1</option>
              <option value="option2">2</option>
            </select>
          </div>

          <div className="form-row" style={{fontWeight: "bold"}}>
            <p >Loại khách hàng:</p>
            <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option1">Khách lẻ</option>
              <option value="option2">Đại lý</option>
            </select>
          </div>

        </div>

        {/*the div 3*/}
        <div className="boxprice">
          <h4>Tùy chọn nâng cao:</h4>
          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Đục lỗ:</p>
            <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option2">Không</option>
              <option value="option1">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Ép kim:</p>
            <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option2">Không</option>
              <option value="option1">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Dữ liệu biến đổi:</p>
            <select style={{ height: "35px", marginRight: "10px", marginLeft: "0", width:"200px", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
              <option value="option2">Không</option>
              <option value="option1">Có</option>

            </select>
          </div>

          <div className="form-row" style={{marginLeft:"40px"}}>
            <p>Số lượng biến đổi:</p>
            <input style={{height:"35px", marginRight:"170px"}} type="number"/>
          </div>
        </div>
      </div>
      <div style={{textAlign: "center", marginTop:"20px", color: "blue"}}>
        <h3>Giá: 0 vnđ</h3>
      </div>
      <div style={{ marginTop:"20px"}}>
        <h3 style={{textAlign: "center"}}>Thông tin chi tiết</h3>
        <div className="container1" style={{marginLeft:"300px"}}>
          <div className="boxprice">
            <h3>Kích thước tem(WxH):  1x1 (mm)</h3>
            <h3>Loại giấy: Tên giấy</h3>
            <h3>Kích thước giấy(WxH):  1x1(mm)</h3>
            <h3>Số mặt in:  1 or 2</h3>
            <h3>Cán màng:  tên loại màn or không cán</h3>
            <h3>Số mặt Cán màng:  1 or 2</h3>
            <h3>Bế:  có or không</h3>
            <h3>Loại bế:  tên</h3>
            <h3>Cắt thành phẩm:  có or không</h3>
            <h3>Tùy chọn nâng cao:  tên</h3>
          </div>
          <div className="boxprice">
            <h3>Giá 1 tem:  xxx  vnđ</h3>
            <h3>Số tờ giấy:   số lượng tờ</h3>
            <h3>Số lượng/1 tờ:  x</h3>
            <h3>Phụ phí:  xxx.xxx vnđ</h3>
            <h3>Loại khách hàng:  tên</h3>
            <h3>Giảm giá:  xxx.xxx vnđ</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceCalculation;

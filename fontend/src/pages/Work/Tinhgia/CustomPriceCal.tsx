
// import "./PriceCalculation.css";



import {useEffect, useState} from "react";
import CalModal from "./CalModal.tsx";
import MansModal from "./MansModal.tsx";
import Paper from "../../../model/automation/paper.tsx";
import PaperService from "../../../service/automation/PaperService.tsx";
import Mans from "../../../model/automation/Mans.tsx";
import MansService from "../../../service/automation/MansService.tsx";

const CustomPriceCalculation = () => {

  const [paper, setPaper] = useState<Paper[]>([]);
  const [mans, setMans] = useState<Mans[]>([])
  const [open, setOpen] = useState<boolean>(false);
  const [mansbo, setMansBo] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleMansBo = () => {
    setMansBo(true);
  };
  const handleOnclose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaperService.getBy();
        setPaper(response.data.data);

        const resMans = await MansService.getBy();
        setMans(resMans.data.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  },[]);
  return (
    <div>
      <div className="main-body">
        <h3>Tính giá tự động</h3>
      </div>

      {/*Giấy in*/}
      <div className="main-body">
        <h4>Giấy in</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary"  onClick={() => {
                handleOpen();
              }}>
                Thêm
              </button>
              <button className="btn btn-primary" style={{backgroundColor: "orange"}}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }} className="mt-20">
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
              <tr className="color-blue header-table text-left border-header-table">
                <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                  Tên
                </th>
                <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", paddingRight: "10px" }}
                >
                  Chiều rộng
                </th>
                <th
                    className="pb-7 font-w-500"
                    style={{ width: "10%", paddingRight: "10px" }}
                >
                  Chiều cao
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá in 1 mặt
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá in 2 mặt
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá in màu 1 mặt
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá in màu 2 mặt
                </th>
              </tr>
              </thead>
              <tbody className="border-header-table">
              {paper?.length > 0 &&
                paper.map((paper)=>(
                  <tr key={paper.id}
                      className="border-header-table"
                      style={{ lineHeight: "1.5" }}
                  >
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {paper.name}
                    </td>
                    <td className="pb-7 pt-7 font-size-small font-w-500 ">
                      {paper.weight}
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px", paddingLeft: "0px" }}
                    >
                      {paper.height}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {paper.onePrintPrice}
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      {paper.twoPrintPrice}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {paper.oneColorPrintPrice}
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      {paper.twoColorPrintPrice}
                    </td>
                  </tr>
              ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/*Màn*/}
      <div className="main-body">
        <h4>Màn</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" onClick={() => handleMansBo()} >
                Thêm
              </button>
              <button className="btn btn-primary" style={{backgroundColor: "orange"}}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }} className="mt-20">
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
              <tr className="color-blue header-table text-left border-header-table">
                <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                  Tên
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Cán 1 mặt
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Cán 2 mặt
                </th>

              </tr>
              </thead>
              <tbody className="border-header-table">
              {mans?.length > 0 &&
                  mans.map((man) =>(
                      <tr
                          key={man.id}
                          className="border-header-table"
                          style={{ lineHeight: "1.5" }}
                      >
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {man.name}
                        </td>
                        <td className="pb-7 pt-7 font-size-small font-w-500 ">
                          {man.onePrice}
                        </td>
                        <td
                            className="pb-7 pt-7 font-size-small td-table font-w-500"
                            style={{ paddingRight: "20px", paddingLeft: "0px" }}
                        >
                          {man.twoPrice}
                        </td>
                      </tr>
                  ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/*Bế/ cắt thành phẩm*/}
      <div className="main-body">
        <h4>Bế/ cắt thành phẩm</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" style={{backgroundColor: "orange"}}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }} className="mt-20">
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
              <tr className="color-blue header-table text-left border-header-table">
                <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                  Tên
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá
                </th>


              </tr>
              </thead>
              <tbody className="border-header-table">
              <tr
                  className="border-header-table"
                  style={{ lineHeight: "1.5" }}
              >
                <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                  -
                </td>
                <td className="pb-7 pt-7 font-size-small font-w-500 ">
                  -
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



      {/*Loại khách hàng*/}
      <div className="main-body">
        <h4>Loại khách hàng</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" style={{backgroundColor: "orange"}}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }} className="mt-20">
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
              <tr className="color-blue header-table text-left border-header-table">
                <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                  Tên
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giảm(%)
                </th>


              </tr>
              </thead>
              <tbody className="border-header-table">
              <tr
                  className="border-header-table"
                  style={{ lineHeight: "1.5" }}
              >
                <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                  -
                </td>
                <td className="pb-7 pt-7 font-size-small font-w-500 ">
                  -
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



      {/*Tùy chọn nâng cao*/}
      <div className="main-body">
        <h4>Tùy chọn nâng cao</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" disabled={true}>
                Thêm
              </button>
              <button className="btn btn-primary" style={{backgroundColor: "orange"}}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }} className="mt-20">
          <div className="">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
              <tr className="color-blue header-table text-left border-header-table">
                <th className="pb-7 font-w-500" style={{ width: "15%" }}>
                  Tên
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Giá
                </th>


              </tr>
              </thead>
              <tbody className="border-header-table">
              <tr
                  className="border-header-table"
                  style={{ lineHeight: "1.5" }}
              >
                <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                  -
                </td>
                <td className="pb-7 pt-7 font-size-small font-w-500 ">
                  -
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CalModal
          tittle={"Giấy in"}
          open={open}
          onClose={handleOnclose}
          // update={"update"}
          // handleSubmit={createAccount }
      ></CalModal>

      <MansModal open={mansbo} onClose={handleOnclose} tittle={"Màn"}></MansModal>
    </div>



  );
};
export default CustomPriceCalculation;

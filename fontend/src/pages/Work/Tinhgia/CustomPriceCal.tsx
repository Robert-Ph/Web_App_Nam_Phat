
// import "./PriceCalculation.css";



import {useEffect, useState} from "react";
import CalModal from "./CalModal.tsx";
import UpdateCalModal from "./UpdateCalModal.tsx";
import MansModal from "./MansModal.tsx";
import UpdateMansModal from "./UpdateMansModal.tsx";
import UpdateDieCuttingModal from "./UpdateDieCuttingModal.tsx";
import UpdateTypeCustomerModal from "./UpdateTypeCustomerModal.tsx";
import UpdateEnhanceModal from "./UpdateEnhanceModal.tsx";

import Paper from "../../../model/automation/paper.tsx";
import PaperService from "../../../service/automation/PaperService.tsx";
import Mans from "../../../model/automation/Mans.tsx";
import MansService from "../../../service/automation/MansService.tsx";
import DieCutting from "../../../model/automation/DieCutting.tsx";
import DieCuttingService from "../../../service/automation/DieCuttingService.tsx";
import Enhance from "../../../model/automation/Enhance.tsx";
import EnhanceService from "../../../service/automation/EnhanceService.tsx";
import TypeCustomer from "../../../model/automation/TypeCustomer.tsx";
import TypeCustomerService from "../../../service/automation/TypeCustomerService.tsx";
import {formatCurrency} from "../../../utils/Utils.tsx";

const CustomPriceCalculation = () => {

  const [paper, setPaper] = useState<Paper[]>([]);
  const [mans, setMans] = useState<Mans[]>([])
  const [dieCutting, setDieCutting] = useState<DieCutting[]>([])
  const [typeCustomer, setTypeCustomer] = useState<TypeCustomer[]>([])
  const [enahnce, setEnhance] = useState<Enhance[]>([])
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openUpdateMans, setOpenUpdateMans] = useState<boolean>(false);
  const [openUpdateDieCutting, setOpenUpdateDieCutting] = useState<boolean>(false);
  const [openTypeCustomer, setOpenTypeCustomer] = useState<boolean>(false);
  const [openEnhance, setOpenEnhance] = useState<boolean>(false);
  const [mansbo, setMansBo] = useState<boolean>(false);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleOpenUpdateMans = () => {
    setOpenUpdateMans(true);
  };
  const handleMansBo = () => {
    setMansBo(true);
  };
  const handleopenDieCutting = () => {
    setOpenUpdateDieCutting(true);
  };
  const handleopenTypeCustomer = () => {
    setOpenTypeCustomer(true);
  };
  const handleOpenEnhance = () => {
    setOpenEnhance(true);
  };


  const handleOnclose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setOpenUpdateMans(false);
    setOpenUpdateDieCutting(false);
    setOpenTypeCustomer(false);
  };
  const handleOncloseMans = () => {
    setOpen(false);
    setOpenUpdateMans(false);
  };

  const handleOncloseDieCutting = () => {
    setOpenUpdateDieCutting(false);
  };
  const handleOncloseTypeCustomer = () => {
    setOpenTypeCustomer(false);
  };
  const handleOncloseEnhance = () => {
    setOpenEnhance(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaperService.getBy();
        setPaper(response.data.data);

        const resMans = await MansService.getBy();
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
              <button className="btn btn-primary"
                      onClick={()=> {handleOpenUpdate();}}
                      style={{backgroundColor: "orange"}}>
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
                      {formatCurrency(paper.onePrintPrice)}
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      {formatCurrency(paper.twoPrintPrice)}
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {formatCurrency(paper.oneColorPrintPrice)}
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      {formatCurrency(paper.twoColorPrintPrice)}
                    </td>
                  </tr>
              ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>


      {/*Màn*/}
      <div className="main-body" style={{backgroundColor: "azure"}}>
        <h4>Màng</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" onClick={() => handleMansBo()} >
                Thêm
              </button>
              <button className="btn btn-primary" style={{backgroundColor: "orange"}} onClick={() => handleOpenUpdateMans()}>
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
                          {formatCurrency(man.onePrice)}
                        </td>
                        <td
                            className="pb-7 pt-7 font-size-small td-table font-w-500"
                            style={{ paddingRight: "20px", paddingLeft: "0px" }}
                        >
                          {formatCurrency(man.twoPrice)}
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
              <button className="btn btn-primary" style={{backgroundColor: "orange"}} onClick={() =>handleopenDieCutting()}>
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
              {dieCutting?.length > 0 &&
                  dieCutting.map((diecut)=>(
                      <tr
                          key={diecut.id}
                          className="border-header-table"
                          style={{ lineHeight: "1.5" }}
                      >
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {diecut.name}
                        </td>
                        <td className="pb-7 pt-7 font-size-small font-w-500 ">
                          {formatCurrency(diecut.price)}
                        </td>

                      </tr>
                  ))

              }

              </tbody>
            </table>
          </div>
        </div>
      </div>



      {/*Loại khách hàng*/}
      <div className="main-body" style={{backgroundColor: "azure"}}>
        <h4>Loại khách hàng</h4>
        <div style={{ marginBottom: "10px" }}>
          <div className="d-flex" style={{ marginTop: "15px", justifyContent: "flex-end" }}>
            <div className="d-flex">
              <button className="btn btn-primary" style={{backgroundColor: "orange"}} onClick={()=>handleopenTypeCustomer()}>
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

              {typeCustomer?.length > 0 &&
                  typeCustomer.map((type)=>(
                      <tr
                          key={type.id}
                          className="border-header-table"
                          style={{ lineHeight: "1.5" }}
                      >
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {type.name}
                        </td>
                        <td className="pb-7 pt-7 font-size-small font-w-500 ">
                          {type.precentage}
                        </td>

                      </tr>
                  ))

              }

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
              {/*<button className="btn btn-primary" disabled={true}>*/}
              {/*  Thêm*/}
              {/*</button>*/}
              <button className="btn btn-primary" style={{backgroundColor: "orange"}} onClick={()=>handleOpenEnhance()}>
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
              {enahnce?.length > 0 &&
                  enahnce.map((enha) =>(
                      <tr
                          key={enha.id}
                          className="border-header-table"
                          style={{ lineHeight: "1.5" }}
                      >
                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                          {enha.name}
                        </td>
                        <td className="pb-7 pt-7 font-size-small font-w-500 ">
                          {formatCurrency(enha.price)}
                        </td>

                      </tr>
                  ))

              }

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CalModal
          tittle={"Giấy in"}
          open={open}
          onClose={handleOnclose}

      ></CalModal>
      <UpdateCalModal
          tittle={"Giấy in"}
          open={openUpdate}
          onClose={handleOnclose}
      ></UpdateCalModal>

      <MansModal open={mansbo} onClose={handleOncloseMans} tittle={"Màn"}></MansModal>
      <UpdateMansModal
          open={openUpdateMans}
          onClose={handleOncloseMans}
          tittle={"Màn"}
      ></UpdateMansModal>

      <UpdateDieCuttingModal
          open={openUpdateDieCutting}
          onClose={handleOncloseDieCutting}
          tittle={"Bế/ cắt thành phẩm"}
      ></UpdateDieCuttingModal>

      <UpdateTypeCustomerModal
          open={openTypeCustomer}
          onClose={handleOncloseTypeCustomer}
          tittle={"Loại khách hàng"}
      ></UpdateTypeCustomerModal>

      <UpdateEnhanceModal
          open={openEnhance}
          onClose={handleOncloseEnhance}
          tittle={"Tùy chọn nâng cao"}
      ></UpdateEnhanceModal>
    </div>



  );
};
export default CustomPriceCalculation;

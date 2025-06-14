
// import "./PriceCalculation.css";



import {useState} from "react";
import CalModal from "./CalModal.tsx";

const CustomPriceCalculation = () => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
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
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px", paddingLeft: "0px" }}
                    >
                      -
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                     -
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      -
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      -
                    </td>
                    <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                    >
                      -
                    </td>
                  </tr>
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
                  Cán 1 mặt
                </th>
                <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                  Cán 2 mặt
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
                <td
                    className="pb-7 pt-7 font-size-small td-table font-w-500"
                    style={{ paddingRight: "20px", paddingLeft: "0px" }}
                >
                  -
                </td>
              </tr>
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
          // onClose={"handleOnclose"}
          // update={"update"}
          // handleSubmit={createAccount }
      ></CalModal>
    </div>



  );
};
export default CustomPriceCalculation;

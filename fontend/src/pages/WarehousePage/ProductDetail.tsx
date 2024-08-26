import { useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useNavigate, useParams } from "react-router-dom";

import NotifyDeleteModal from "../UtilsPage/NotifyDeleteModal";

const ProductDetail = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [locaiton, setLocation] = useState<string>("employee");

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const param = useParams();

  console.log(param.id);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Sự kiện khi bấm vào nút chỉnh sửa sẽ thay đổi các ô input cho phép chỉnh sửa
  const handleEdit = () => {
    setIsEdit(true);
  };

  //Sự kiện khi bấm cập nhật chỉnh sửa
  const handleSubmitEdit = () => {
    setIsEdit(false);
  };

  //Sự kiện khi bấm ô select vị trí
  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-space-bettwen">
          <div>
            <div>
              <strong>Tên:</strong>
              <span> Giấy Decal Cứng</span>
            </div>
            <div>
              <strong>ID:</strong>
              <span> #51235</span>
            </div>
          </div>
          <div>
            <button
              className="btn btn-black"
              onClick={() => {
                navigate("/warehouse/list");
              }}
            >
              Quay về
            </button>
            <button className="btn btn-danger" onClick={handleOpen}>
              Xóa
            </button>
            <button className="btn btn-warning">Reset</button>
            {!isEdit && (
              <button
                className="btn btn-primary"
                style={{ marginRight: "0px;" }}
                onClick={handleEdit}
              >
                Chỉnh sửa
              </button>
            )}
            {isEdit && (
              <button
                className="btn btn-primary"
                style={{ marginRight: "0px;" }}
                onClick={handleSubmitEdit}
              >
                Cập nhật
              </button>
            )}
          </div>
        </div>

        <div className="mt-20">
          <h3>Thông tin loại hàng </h3>
          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Mã loại hàng</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Loại</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>
          </div>
          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Tên </span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Đơn vị tính</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>
          </div>

          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Đơn giá /đơn vị tính</span>
              <input
                disabled={!isEdit}
                className="font-font-size-small"
              ></input>
            </div>

            <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
              <span>Kích thước sp (ví dụ: 30x30 mm)</span>
              <div>
                <div>
                  <span className="align-content-center">Cao:</span>
                  <input
                    type="number"
                    className="size"
                    style={{
                      padding: "12px 4px 10px 4px",
                      width: "20%",
                      marginLeft: "1%",
                    }}
                    disabled={!isEdit}
                  ></input>

                  <span
                    className="align-content-center"
                    style={{ marginLeft: "3%" }}
                  >
                    ,Rộng:
                  </span>
                  <input
                    type="number"
                    className="size"
                    style={{
                      padding: "12px 4px 10px 4px",
                      width: "20%",
                      marginLeft: "1%",
                    }}
                    disabled={!isEdit}
                  ></input>
                  <span style={{ marginLeft: "1%" }}>(mm)</span>
                </div>

                <div></div>
              </div>
            </div>
          </div>

          <div className="wrap-form">
            <div className="form-group flex-1">
              <span>Số lượng tồn kho</span>
              <input disabled={true} className="font-font-size-small"></input>
            </div>

            <div
              className="form-group flex-1"
              style={{ margin: "0px 20px" }}
            ></div>
          </div>
        </div>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalNotify}>
          <h3 className="text-center">Thông báo</h3>
          <div className=" mt-10 " style={{ textAlign: "justify" }}>
            <span>Bạn Có Chắc Chắn Muốn Xóa Sản phẩm Này Không?</span>
          </div>
          <div className="d-flex mt-20 justify-space-arround">
            <button className="btn btn-black" onClick={handleClose}>
              Trở về
            </button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        </Box>
      </Modal> */}

      <NotifyDeleteModal
        open={open}
        handleClose={handleClose}
        handleDelete={() => {}}
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
      ></NotifyDeleteModal>
    </div>
  );
};

export default ProductDetail;

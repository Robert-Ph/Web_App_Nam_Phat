import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import product from "../../model/product.model";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
};

type props = {
  open: boolean;
  listProduct: product[];
  onClose: () => void;
  handleAdd: (product: product) => void;
};
const ProductModal = ({ open, onClose, listProduct, handleAdd }: props) => {
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-end">
            <button className="btn btn-danger" onClick={onClose}>
              Hủy
            </button>
            <button className="btn btn-warning">Reset</button>
            <button
              className="btn btn-primary"
              style={{ marginRight: "0px;" }}
              onClick={() => {
                handleAdd({
                  id: listProduct.length + 1,
                  name: "",
                  quantity: "",
                  paperCount: "",
                  price: "",
                  totalPrice: "",
                });
              }}
            >
              Thêm / Cập nhật
            </button>
          </div>

          <div className="mt-20">
            <h3>Thông tin sản phẩm</h3>

            {/* Tên Sản phẩm */}
            <div className="form-group mt-20">
              <span>Tên sản phẩm</span>
              <input placeholder="Tên sản phẩm"></input>
            </div>
            {/* Loại */}
            <div className="d-flex" style={{ marginTop: "10px" }}>
              <div className="form-group flex-3">
                <span>Loại sản phẩm</span>
                <input></input>
              </div>
              <div className="form-group flex-3" style={{ marginLeft: "20px" }}>
                <span>Số lượng</span>
                <input type="number"></input>
              </div>

              <div className="flex-3"></div>
            </div>

            {/* Đơn vị tính sản phẩm */}

            <div className="d-flex" style={{ marginTop: "10px" }}>
              <div className="form-group flex-3">
                <span>Đơn vị tính</span>
                <input></input>
              </div>
              <div className="form-group flex-6" style={{ marginLeft: "20px" }}>
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
                    ></input>
                    <span style={{ marginLeft: "1%" }}>(mm)</span>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>

            {/* Loại giấy */}

            <div className="d-flex" style={{ marginTop: "15px" }}>
              <div className="form-group flex-3">
                <span>Loại giấy</span>
                <input></input>
              </div>
              <div className="form-group flex-3" style={{ marginLeft: "20px" }}>
                <span>Số lượng cần in</span>
                <input type="number"></input>
              </div>

              <div className="flex-3"></div>
            </div>
            {/* Đơn vị tính giấy */}
            <div className="d-flex" style={{ marginTop: "10px" }}>
              <div className="form-group flex-3">
                <span>Đơn vị tính</span>
                <input></input>
              </div>
              <div className="form-group flex-6" style={{ marginLeft: "20px" }}>
                <span>Kích thước giấy (ví dụ: 30x30 mm)</span>
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
                    ></input>
                    <span style={{ marginLeft: "1%" }}>(mm)</span>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>

            {/* Cán màng */}
            <div className="d-flex" style={{ marginTop: "15px" }}>
              <div className="form-group flex-3">
                <span>Cán màng</span>
                <input></input>
              </div>
              <div className="form-group flex-3" style={{ marginLeft: "30px" }}>
                <span>Bế</span>
                <input></input>
              </div>

              <div className="form-group flex-3" style={{ marginLeft: "20px" }}>
                <span>Đơn giá/ 1 sản phẩm (vnđ)</span>
                <input></input>
              </div>
            </div>
            {/* Quy cách */}
            <div className="form-group mt-20">
              <span>Quy cách (ngắn gọn)</span>
              <input placeholder="Quy cách"></input>
            </div>
          </div>
        </Box>
      </Modal>
      ;
    </div>
  );
};
export default ProductModal;

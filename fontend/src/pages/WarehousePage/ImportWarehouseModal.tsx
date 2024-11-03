import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ProductService from "../../service/ProductService";
import StockInDetail from "../../model/stockInDetail.model";
import { toast } from "react-toastify";
import product from "../../model/product.model";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
  borderRadius: "20px",
  paddingBottom: "40px",
};

type props = {
  open: boolean;
  onClose: () => void;
  handleAdd: (stockInDetail: StockInDetail) => void;
};
//Sự kiện khi bấm ô select vị trí

const ImportWarehouseModal = ({ open, onClose, handleAdd }: props) => {
  const [typeProduct, setTypeProduct] = useState<string>("use");
  const [stockInDetail, setStockInDetail] = useState<StockInDetail | null>(
    null
  );
  const [productId, setProductId] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setTypeProduct(event.target.value);
    setStockInDetail(null);
    setProductId("");
    if (event.target.value === "new") {
      // Tạo sản phẩm mới trống khi chọn sản phẩm "new"
      setStockInDetail({
        productId: null,
        product: {
          name: "",
          type: "",
          unit: "",
          price: 0,
          heigth: 0,
          weigth: 0,
        },
        quanlity: 1,
        priceImport: 0,
      });
    }
  };

  const handleInputChange = (
    field: keyof StockInDetail | keyof StockInDetail["product"],
    value: any
  ) => {
    if (stockInDetail) {
      if (field in stockInDetail) {
        setStockInDetail({
          ...stockInDetail,
          [field]: value,
        });
      } else if (stockInDetail.product && field in stockInDetail.product) {
        setStockInDetail({
          ...stockInDetail,
          product: {
            ...stockInDetail.product,
            [field]: value,
          },
        });
      }
    }
  };

  const callApiOnBlur = async (id: string) => {
    if (id) {
      ProductService.getById(id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log(response.data);
            const { id, ...newProduct } = response.data.data as product;
            const newStockInDetail: StockInDetail = {
              productId: response.data.data.id,
              product: newProduct, // Giả sử dữ liệu trả về chứa thông tin sản phẩm
              quanlity: 1, // Gán giá trị mặc định cho số lượng
              priceImport: 0, // Giả sử dữ liệu trả về có trường price
            };
            setStockInDetail(newStockInDetail);
          } else if (response.data.code == 400) {
            setStockInDetail(null);
            toast.error("Không tìm thấy sản phẩm", {
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          setStockInDetail(null);
          toast.error("Không tìm thấy sản phẩm", {
            autoClose: 1000,
          });
        });
    }
  };
  console.log(stockInDetail);
  const handleProductIdBlur = () => {
    callApiOnBlur(productId);
  };

  const calculateTotalPrice = (quanlity: number, priceImport: number) => {
    setTotalPrice(quanlity * priceImport);
  };
  useEffect(() => {
    if (stockInDetail) {
      calculateTotalPrice(stockInDetail.quanlity, stockInDetail.priceImport);
    }
  }, [stockInDetail?.quanlity, stockInDetail?.priceImport]);

  const close = () => {
    onClose();
    setTotalPrice(0);
    setTypeProduct("use");
    setStockInDetail(null);
    setProductId("");
  };
  return (
    <div>
      <Modal
        open={open}
        // onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mt-10">
            <h3 className="text-center">Thêm Loại hàng</h3>
          </div>

          <div
            className="d-flex dicrect-col"
            style={{ paddingLeft: "20px", paddingRight: "10px" }}
          >
            <div className="">
              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Kiểu loại hàng:</span>
                  <FormControl size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={typeProduct}
                      onChange={handleChange}
                      className="font-size-small shadow"
                      style={{
                        borderRadius: "7px;",
                      }}
                    >
                      <MenuItem value={"use"} style={{ padding: "10px 12px;" }}>
                        Đã Có
                      </MenuItem>
                      <MenuItem value={"new"} style={{ padding: "10px 12px;" }}>
                        Sản Phẩm Mới
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>
                    Mã loại hàng <span style={{ color: "red" }}>*</span> :
                  </span>
                  <input
                    className="shadow"
                    disabled={typeProduct == "new"}
                    onBlur={handleProductIdBlur} // Gọi hàm khi mất focus
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Tên loại hàng:</span>
                  <input
                    className="shadow"
                    disabled={typeProduct == "use"}
                    value={stockInDetail?.product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  ></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Loại :</span>
                  <input
                    className="shadow"
                    disabled={typeProduct == "use"}
                    value={stockInDetail?.product.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Đơn vị tính:</span>
                  <input
                    className="shadow"
                    disabled={typeProduct == "use"}
                    value={stockInDetail?.product.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  ></input>
                </div>

                <div
                  className="form-group flex-1 mt-10"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Kích thước (ví dụ: 30x30 mm)</span>
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
                        disabled={typeProduct == "use"}
                        value={stockInDetail?.product.heigth}
                        onChange={(e) =>
                          handleInputChange("heigth", Number(e.target.value))
                        }
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
                        disabled={typeProduct == "use"}
                        value={stockInDetail?.product.weigth}
                        onChange={(e) =>
                          handleInputChange("weigth", Number(e.target.value))
                        }
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Đơn giá/ đơn vị tính:</span>
                  <input
                    className="shadow"
                    value={stockInDetail?.priceImport}
                    onChange={(e) =>
                      handleInputChange("priceImport", Number(e.target.value))
                    }
                  ></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Số lượng nhập:</span>
                  <input
                    className="shadow"
                    type="number"
                    value={stockInDetail?.quanlity}
                    min={1}
                    onChange={(e) =>
                      handleInputChange("quanlity", Number(e.target.value))
                    }
                  ></input>
                </div>
              </div>

              <div className="d-flex mt-10" style={{ marginBottom: "10px" }}>
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Tổng tiền:</span>
                  <input
                    className="shadow"
                    type="number"
                    disabled
                    value={totalPrice}
                    min={0}
                  ></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                ></div>
              </div>
              <div className="d-flex mt-30 justify-space-evenly ">
                <button className="btn btn-danger" onClick={close}>
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (stockInDetail) {
                      handleAdd(stockInDetail);
                      close();
                    } else {
                      toast.error(
                        "Có thông tin bị bỏ trống hoặc không hợp lệ",
                        {
                          autoClose: 1000,
                        }
                      );
                    }
                  }}
                >
                  Thêm{" "}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      ;
    </div>
  );
};
export default ImportWarehouseModal;

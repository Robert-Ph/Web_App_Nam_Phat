import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

// import { SelectChangeEvent } from "@mui/material/Select";
import TextFieldAuto from "../../component/TextFieldAuto/TextFieldAuto";
import useDebounce from "../../hooks/useDebounce";
import product from "../../model/product.model";
import ProductService from "../../service/ProductService";
import "./css/order.css";
import StockOut from "../../model/stockOut.model";
import StockOutService from "../../service/StockOutService";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "45%",
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
  handleAdd: (stockOut: StockOut) => void;
};
//Sự kiện khi bấm ô select vị trí

const ExportWarehouseModal = ({ open, onClose, handleAdd }: props) => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<product[]>([]);
  const [selectProduct, setSelectProduct] = useState<product | null>(null);
  const [stockOut, setStockOut] = useState<StockOut>({
    quantity: 1,
    reson: "",
  });

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.length > 0) {
        try {
          const response = await ProductService.getByIdConstrains(
            debouncedQuery
          );
          console.log(response);
          setProducts(response.data.data);
        } catch (error) {}
      } else {
        setProducts([]); // Clear options if input is empty
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleInputChange = (field: keyof StockOut, value: any) => {
    setStockOut((prev) => ({ ...prev, [field]: value }));
  };
  const handleSelect = (product: product | null) => {
    setSelectProduct(product);
    setStockOut((prev) => ({
      ...prev,
      productId: product?.id ?? null,
    }));
  };
  const handleClose = () => {
    setSelectProduct(null);
    setStockOut({
      quantity: 1,
      reson: "",
    });
    onClose();
    setQuery("");
  };

  const handleAddStockOut = () => {
    try {
      if (stockOut.productId && stockOut.quantity > 0 && stockOut.reson) {
        StockOutService.create(stockOut)
          .then((response) => {
            if (response.data.code == 201) {
              toast.success("Thêm xuất kho thành công", {
                autoClose: 1000,
              });

              console.log(response.data);
              handleAdd(response.data.data);
              handleClose();
            } else {
              toast.error("Vui lòng nhập đầy đủ thông tin", {
                autoClose: 1000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.code == 400) {
              toast.error("Số lượng trong kho không còn đủ số lượng", {
                autoClose: 1500,
              });
            } else {
              toast.error("Gặp Lỗi", {
                autoClose: 1000,
              });
            }
          });
      } else {
        toast.error("Vui lòng nhập đầy đủ thông tin.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm xuất kho:", error);
    }
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
            <h3 className="text-center">Thêm Loại Hàng Xuất Kho</h3>
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
                  <span>Tên loại hàng:</span>
                  <input
                    className="shadow"
                    disabled
                    value={selectProduct?.name}
                  ></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span style={{ marginBottom: "0px" }}>
                    Mã loại hàng <span style={{ color: "red" }}>*</span> :
                  </span>
                  {/* <input className="shadow"></input> */}
                  <TextFieldAuto
                    type="Number"
                    options={products}
                    getOptionLabel={(product) => `${product.id}`}
                    onSelect={(product) => {
                      handleSelect(product);
                    }}
                    onInputChange={setQuery}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.id} - ({option.name})
                      </li>
                    )}
                  ></TextFieldAuto>
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
                    disabled
                    value={selectProduct?.unit}
                  ></input>
                </div>

                <div
                  className="form-group flex-1"
                  style={{ paddingLeft: "3%" }}
                >
                  <span>Loại :</span>
                  <input
                    className="shadow"
                    disabled
                    value={selectProduct?.type}
                  ></input>
                </div>
              </div>

              <div className="d-flex mt-10">
                <div
                  className="form-group flex-1"
                  style={{ paddingRight: "3%" }}
                >
                  <span>Số lượng xuất kho:</span>
                  <input
                    className="shadow"
                    type="number"
                    value={stockOut.quantity}
                    min={1}
                    onChange={(e) =>
                      handleInputChange("quantity", Number(e.target.value))
                    }
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
                        value={selectProduct?.heigth}
                        disabled
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
                          width: "20%",
                          marginLeft: "1%",
                        }}
                        value={selectProduct?.weigth}
                        disabled
                      ></input>
                      <span style={{ marginLeft: "1%" }}>(mm)</span>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="form-group">
                  <span>Lí do xuất kho:</span>
                  <textarea
                    className="shadow"
                    rows={5}
                    value={stockOut.reson}
                    onChange={(e) => handleInputChange("reson", e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="d-flex mt-30 justify-space-evenly ">
                <button className="btn btn-danger" onClick={handleClose}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleAddStockOut}>
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
export default ExportWarehouseModal;

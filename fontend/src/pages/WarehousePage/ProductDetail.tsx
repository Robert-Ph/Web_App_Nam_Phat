import { useState, useEffect, useRef } from "react";

import { SelectChangeEvent } from "@mui/material/Select";

import { useNavigate, useParams } from "react-router-dom";

import NotifyDeleteModal from "../UtilsPage/NotifyDeleteModal";
import "../OrderPage/OrderPage/order.css";
import InventoryService from "../../service/InventoriesService";
import Inventory from "../../model/inventory.model";
import { toast } from "react-toastify";
import Spiner from "../../component/Spiner/Spiner";
import ProductService from "../../service/ProductService";

const ProductDetail = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [inventory, setInventory] = useState<Inventory | null>(null);

  const navigate = useNavigate();
  const param = useParams();

  const currentInventory = useRef<Inventory | null>(inventory);

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

  useEffect(() => {
    const id = param?.id;
    console.log(id);
    if (id) {
      InventoryService.getById(id)
        .then((response) => {
          console.log(response);
          const data = response.data.data;

          setInventory(data);
          currentInventory.current = data;
        })
        .catch((error) => {
          const errorReponse = error.response;
          console.log(errorReponse);
          toast.error("Lỗi không xác định. Vui lòng thử lại!", {
            autoClose: 1000,
          });
        });
    }
  }, [param]);
  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInventory((prevInventory) => {
      const currentInventory = prevInventory || {
        id: null,
        product: {
          id: 0,
          name: "",
          price: 0,
          heigth: 0,
          weigth: 0,
          type: "",
          unit: "",
        },
        quanlity: 0,
        lastDateIn: "",
      };

      return {
        ...currentInventory,
        product: {
          ...currentInventory.product,
          [name]:
            name === "id" ||
            name === "price" ||
            name === "heigth" ||
            name === "weigth"
              ? Number(value) || 0 // Default to 0 for numeric fields
              : value || "", // Default to empty string for string fields
        },
      };
    });
  };

  const handleSubmit = () => {
    if (inventory?.product.id) {
      ProductService.update(inventory.product, inventory.product.id)
        .then((response) => {
          if (response.data.code == 200) {
            toast.success("Sản phẩm đã được cập nhật", {
              autoClose: 1000,
            });
            setIsEdit(false);
            console.log(response);
            currentInventory.current = inventory;
          } else {
            toast.error("Lỗi");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Lỗi");
        });
    }
  };
  console.log(inventory);
  return (
    <div>
      <div className="container mt-10">
        <div className="d-flex justify-space-bettwen">
          {inventory ? (
            <div>
              <div>
                <strong>Tên:</strong>
                <span> {inventory.product.name}</span>
              </div>
              <div>
                <strong>ID:</strong>
                <span> {inventory.product.id}</span>
              </div>
            </div>
          ) : (
            <Spiner></Spiner>
          )}
          <div>
            {!isEdit && (
              <button
                className="btn btn-black"
                onClick={() => {
                  navigate("/warehouse/list");
                }}
              >
                Quay về
              </button>
            )}
            {!isEdit && (
              <button className="btn btn-danger" onClick={handleOpen}>
                Xóa
              </button>
            )}
            {isEdit && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setInventory(currentInventory.current);
                  setIsEdit(false);
                }}
              >
                Hủy
              </button>
            )}

            {isEdit && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  setInventory(currentInventory.current);
                }}
              >
                Reset
              </button>
            )}

            {!isEdit ? (
              <button
                className="btn btn-primary"
                style={{ marginRight: "0px;" }}
                onClick={handleEdit}
              >
                Chỉnh sửa
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ marginRight: "0px;" }}
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            )}
          </div>
        </div>

        {inventory ? (
          <div className="mt-20">
            <h3>Thông tin loại hàng </h3>
            <div className="wrap-form">
              <div className="form-group flex-1">
                <span>Mã loại hàng</span>
                <input
                  disabled={true}
                  className="font-font-size-small"
                  value={inventory.product.id}
                ></input>
              </div>

              <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
                <span>Loại</span>
                <input
                  disabled={!isEdit}
                  className="font-font-size-small"
                  value={inventory.product.type}
                ></input>
              </div>
            </div>
            <div className="wrap-form">
              <div className="form-group flex-1">
                <span>Tên </span>
                <input
                  disabled={!isEdit}
                  className="font-font-size-small"
                  value={inventory.product.name}
                  name="name"
                  onChange={handleProductChange}
                ></input>
              </div>

              <div className="form-group flex-1" style={{ margin: "0px 20px" }}>
                <span>Đơn vị tính</span>
                <input
                  disabled={!isEdit}
                  className="font-font-size-small"
                  value={inventory.product.unit}
                  name="unit"
                  onChange={handleProductChange}
                ></input>
              </div>
            </div>

            <div className="wrap-form">
              <div className="form-group flex-1">
                <span>Đơn giá /đơn vị tính</span>
                <input
                  disabled={!isEdit}
                  className="font-font-size-small"
                  type="number"
                  value={inventory.product.price}
                  min={0}
                  name="price"
                  onChange={handleProductChange}
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
                      value={inventory.product.heigth}
                      min={0}
                      name="heigth"
                      onChange={handleProductChange}
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
                      value={inventory.product.weigth}
                      name="weigth"
                      onChange={handleProductChange}
                      min={0}
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
                <input
                  disabled={true}
                  className="font-font-size-small"
                  value={inventory.quanlity}
                ></input>
              </div>

              <div
                className="form-group flex-1"
                style={{ margin: "0px 20px" }}
              ></div>
            </div>
          </div>
        ) : (
          <Spiner></Spiner>
        )}
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

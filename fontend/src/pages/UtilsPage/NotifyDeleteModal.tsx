import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const styleModalNotify = {
  position: "absolute",
  top: "40%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Giới hạn chiều cao tối đa của modal
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung quá lớn
  borderRadius: "20px",
  paddingBottom: "40px",
};

type props = {
  open: boolean;
  message: string;
  handleClose: () => void;
  handleDelete: () => void;
};

const NotifyDeleteModal = ({
  open,
  message,
  handleClose,
  handleDelete,
}: props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModalNotify}>
        <h3 className="text-center">Thông báo</h3>
        <div
          className=" mt-10 "
          style={{ textAlign: "justify", padding: "20px" }}
        >
          <span>{message}</span>
        </div>
        <div className="d-flex mt-20 justify-space-arround">
          <button className="btn btn-black" onClick={handleClose}>
            Trở về
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>Xác nhận</button>
        </div>
      </Box>
    </Modal>
  );
};
export default NotifyDeleteModal;



import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useState} from "react";
import {toast} from "react-toastify";
import Paper from "../../../model/automation/paper.tsx";
import PaperService from "../../../service/automation/PaperService.tsx";




const style = {
    position: "absolute",
    top: "50%",
    left: "53%",
    transform: "translate(-50%, -50%)",
    width: "30%",
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
    // update:  null;
    tittle: string;
    // handleSubmit: (account: account) => void;
};



const CalModal = ({open,onClose, tittle}: props) => {

    const [name, setName] = useState("");
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [oneColor, setOneColor] = useState<number>(0);
    const [twoColor, setTwoColor] = useState<number>(0);
    const [onePaper, setOnePaper] = useState<number>(0);
    const [twoPaper, setTwoPaper] = useState<number>(0);

    const handleCreate = ()=>{
        console.log(name);
        if(name === ""){
            toast.error("Tên giấy không được bỏ trống!", {
                autoClose: 1000,
            });
        }else {
            const paper = {
                id: null,
                name : name,
                height: height,
                weight: weight,
                oneColorPrintPrice: oneColor,
                twoColorPrintPrice: twoColor,
                onePrintPrice: onePaper,
                twoPrintPrice: twoPaper

            } as Paper;
            try {
                PaperService.create(paper).then((response) => {
                    console.log(response.data);
                    if (response.data.code == 201) {
                        toast.success("Tạo thành công!", {
                            autoClose: 1000,
                        });
                    }
                });
                // ✅ Reload trang sau 1.5s để toast hiển thị
                setTimeout(() => {
                    window.location.reload();
                }, 100);

            }catch (error){
                console.log(error);
            }

        }
    }



    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="mt-10">
                    <h3 className="text-center">{tittle}</h3>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                }}>
                    <div
                        className="d-flex dicrect-col"
                        style={{paddingLeft: "20px", paddingRight: "10px"}}
                    >
                        <div className="">
                            <div className="form-group mt-10">
                <span>
                  Tên <span style={{color: "red"}}>*</span> :
                </span>
                                <input
                                    name="username"
                                    className={`shadow `}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                ></input>
                            </div>

                            <div className="form-group mt-10">
                <span>
                  Chiều rộng(W) <span style={{color: "red"}}>*</span> :
                </span>
                                <input
                                    className="shadow"
                                    type="number"
                                    onChange={(e) => {
                                        setWeight(Number(e.target.value));
                                    }}

                                ></input>
                            </div>

                            <div className="form-group mt-10">
                <span>
                  Chiều cao(H) <span style={{color: "red"}}>*</span> :
                </span>
                                <input
                                    type="number"
                                    className="shadow"
                                    onChange={(e) => {
                                        setHeight(Number(e.target.value));
                                    }}
                                ></input>
                            </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in 1 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                className="shadow"
                                onChange={(e) => {
                                    setOnePaper(Number(e.target.value));
                                }}
                            ></input>

                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in 2 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                className="shadow"
                                onChange={(e)=>{
                                    setTwoPaper(Number(e.target.value));
                                }}
                            ></input>
                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in màu 1 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                className="shadow"
                                onChange={(e)=>{
                                    setOneColor(Number(e.target.value));
                                }}
                            ></input>
                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in màu 2 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                className="shadow"
                                onChange={(e)=>{
                                    setTwoColor(Number(e.target.value));
                                }}

                            ></input>
                          </div>


                            <div className="d-flex mt-30 justify-space-arround ">
                                <button className="btn btn-danger" onClick={onClose}>
                                    Hủy
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};
export default CalModal;

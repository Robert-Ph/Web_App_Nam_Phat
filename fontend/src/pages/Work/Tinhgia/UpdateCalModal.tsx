

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
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



const UpdateCalModal = ({open,onClose, tittle}: props) => {

    const [paper, setPaper] = useState<Paper[]>([])
    const [selectedPaperId, setSelectedPaperId] = useState<number>(0);

    const selectPaper = paper.find((p)=> p.id === selectedPaperId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PaperService.getBy();
                setPaper(response.data.data);
                // Gán selectedPaperId là id đầu tiên nếu chưa chọn
                if (response.data.data.length > 0) {
                    setSelectedPaperId(response.data.data[0].id);
                }

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    },[]);


    const handleUpdate = ()=>{
            const pa = paper.find((p)=> p.id === selectedPaperId)  as Paper;
            try {
                PaperService.updatePaper(pa).then((response) => {
                    console.log(response.data);
                    if (response.data.code == 201) {
                        toast.success("Cập nhật thành công!", {
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
                    handleUpdate();
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
                                <select name="namepaper"
                                        className={'shadow'}
                                        value={selectedPaperId}
                                        onChange={(e)=>{setSelectedPaperId(Number(e.target.value))}}
                                        style={{ height: "35px", marginRight: "0px", marginLeft: "0", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                                    {paper?.length > 0 &&
                                        paper.map((p)=>(
                                            <option value={p.id || 0} key={p.id}>{p.name}</option>
                                        ))
                                        
                                    }
                                </select>
                            </div>

                            <div className="form-group mt-10">
                <span>
                  Chiều rộng(W) <span style={{color: "red"}}>*</span> :
                </span>
                                <input
                                    className="shadow"
                                    type="number"
                                    value={selectPaper?.weight || 0}
                                    onChange={(e) => {
                                        const newWeight = Number(e.target.value);
                                        setPaper((prev) =>
                                            prev.map((p) =>
                                                p.id === selectedPaperId ? { ...p, weight: newWeight } : p
                                            )
                                        );
                                    }}
                                />
                            </div>

                            <div className="form-group mt-10">
                <span>
                  Chiều cao(H) <span style={{color: "red"}}>*</span> :
                </span>
                                <input
                                    type="number"
                                    value={selectPaper?.height || 0}
                                    className="shadow"
                                    onChange={(e) => {
                                        const newHeight = Number(e.target.value);
                                        setPaper((prev) =>
                                            prev.map((p) =>
                                                p.id === selectedPaperId ? { ...p, height: newHeight } : p
                                            )
                                        );
                                    }}
                                ></input>
                            </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in 1 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                value={selectPaper?.onePrintPrice || 0}
                                className="shadow"
                                onChange={(e) => {
                                    const newprice = Number(e.target.value);
                                    setPaper((prev) =>
                                        prev.map((p) =>
                                            p.id === selectedPaperId ? { ...p, onePrintPrice: newprice } : p
                                        )
                                    );
                                }}
                            ></input>

                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in 2 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                value={selectPaper?.twoPrintPrice || 0}
                                className="shadow"
                                onChange={(e)=>{
                                    const newprice = Number(e.target.value);
                                    setPaper((prev) =>
                                        prev.map((p) =>
                                            p.id === selectedPaperId ? { ...p, twoPrintPrice: newprice } : p
                                        )
                                    );
                                }}
                            ></input>
                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in màu 1 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                value={selectPaper?.oneColorPrintPrice || 0}
                                className="shadow"
                                onChange={(e)=>{
                                    const newprice = Number(e.target.value);
                                    setPaper((prev) =>
                                        prev.map((p) =>
                                            p.id === selectedPaperId ? { ...p, oneColorPrintPrice: newprice } : p
                                        )
                                    );
                                }}
                            ></input>
                          </div>
                          <div className="form-group mt-10">
                <span>
                  Giá in màu 2 mặt(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                type="number"
                                value={selectPaper?.twoColorPrintPrice || 0}
                                className="shadow"
                                onChange={(e)=>{
                                    const newprice = Number(e.target.value);
                                    setPaper((prev) =>
                                        prev.map((p) =>
                                            p.id === selectedPaperId ? { ...p, twoColorPrintPrice: newprice } : p
                                        )
                                    );
                                }}

                            ></input>
                          </div>


                            <div className="d-flex mt-30 justify-space-arround ">
                                <button className="btn btn-danger" onClick={onClose}>
                                    Hủy
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};
export default UpdateCalModal;

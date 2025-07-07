
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Enhance from "../../../model/automation/Enhance.tsx";
import EnhanceService from "../../../service/automation/EnhanceService.tsx";


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
    tittle: string;
};



const UpdateEnhanceModal = ({open,onClose, tittle}: props) => {

    const [enahnce, setEnhance] = useState<Enhance[]>([])
    const [selectID, setSelectID] = useState<number>(0);

    const selectDieCutting = enahnce.find((m)=> m.id === selectID);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const reEnhance = await EnhanceService.getBy();
                setEnhance(reEnhance.data.data);
                // Gán selectedPaperId là id đầu tiên nếu chưa chọn
                if (reEnhance.data.data.length > 0) {
                    setSelectID(reEnhance.data.data[0].id);
                }

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    },[]);
    const handleUpdate = ()=>{

            try {
                const ma = enahnce.find((m) => m.id === selectID) as Enhance;
                EnhanceService.updateEnhance(ma).then((response) => {
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
                                        value={selectID}
                                        onChange={(e)=>{setSelectID(Number(e.target.value))}}
                                        style={{ height: "35px", marginRight: "0px", marginLeft: "0", backgroundColor: "white", color: "black", border: "1px solid #ccc", borderRadius:'10px' }}>
                                    {enahnce?.length > 0 &&
                                        enahnce.map((p)=>(
                                            <option value={p.id || 0} key={p.id}>{p.name}</option>
                                        ))

                                    }
                                </select>
                            </div>

                          <div className="form-group mt-10">
                <span>
                  Giá(vnđ) <span style={{color: "red"}}>*</span> :
                </span>
                            <input
                                value={selectDieCutting?.price || 0}
                                type="number"
                                className="shadow"
                                onChange={(e) => {
                                    const newPrice = Number(e.target.value);
                                    setEnhance((prev) =>
                                        prev.map((p) =>
                                            p.id === selectID ? { ...p, price: newPrice } : p
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
export default UpdateEnhanceModal;

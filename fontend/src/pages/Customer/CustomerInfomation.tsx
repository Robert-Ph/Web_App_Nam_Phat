import "./customerInfomation.css";
import { useState } from "react";
import product from "../../model/product.model";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsIcon from "@mui/icons-material/Settings";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
const OrderPage = () => {
    const [products, setProducts] = useState<product[]>([
        {
            id: 1,
            name: "",
            totalPrice: "",
            type: "",
        },
    ]);

    const [page, setPage] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const [invoice, setInvoice] = useState<string>("personally");

    const [open, setOpen] = useState<boolean>(false);

    const handleOnclose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    // const handleChange = (event: SelectChangeEvent) => {
    //     setInvoice(event.target.value);
    // };

    const addProduct = (product: product) => {
        setOpen(false);
        setProducts([...products, product]);
    };

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-end">
                    <button className="btn btn-danger">Xóa</button>
                    <button className="btn btn-warning">Reset</button>
                    <button className="btn btn-primary" style={{ marginRight: "0px;" }}>
                        Cập nhật
                    </button>
                </div>

                <div className="mt-20">
                    <h3>Thông tin khách hàng </h3>
                    <div className="wrap-form">
                        <div className="form-group flex-8">
                            <span>Tên khách hàng</span>
                            <input placeholder="Tên khách hàng"></input>
                        </div>

                        <div className="form-group flex-2" style={{margin: "0px 20px"}}>
                            <span>Số điện thoại</span>
                            <input placeholder="Số điện thoại"></input>
                        </div>

                        <div className="form-group flex-2">
                            <span>Loại khách hàng</span>
                            <FormControl sx={{minWidth: 120}} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={invoice}
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={"personally"} className="">
                                        Cá Nhân
                                    </MenuItem>
                                    <MenuItem value={"enterprise"}>Doanh Nghiệp</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="wrap-form" style={{marginTop: "10px"}}>
                        <div className="form-group flex-4">
                            <span>Mã khách hàng</span>
                            <input placeholder="Mã khách hàng"></input>
                        </div>
                        <div className="form-group flex-4" style={{marginLeft: "20px"}}>
                            <span>Ngày tạo</span>
                            <input placeholder="Ngày tạo"></input>
                        </div>
                        <div className="form-group flex-6" style={{marginLeft: "20px"}}>
                            <span>Email</span>
                            <input placeholder="Email"></input>
                        </div>
                    </div>
                    <div className="wrap-form" style={{marginTop: "10px"}}>

                        <div className="form-group flex-8" style={{marginLeft: "0px"}}>
                        <span>Địa chỉ giao hàng</span>
                            <input placeholder="Địa chỉ giao hàng"></input>
                        </div>
                    </div>
                </div>

                <div className="mt-20 div-main" >
                    <h3>Lịch sử thanh toán</h3>
                    <div style={{marginBottom: "10px",}}>
                        <div
                            className="d-flex justify-space-bettwen "
                            style={{marginTop: "15px"}}
                        >
                            <div className="d-flex">
                                <button className="btn-filter">
                                    <FilterListIcon></FilterListIcon>
                                </button>
                                <Box
                                    component="form"
                                    sx={{
                                        "& > :not(style)": {width: "25ch"},
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="standard-basic"
                                        label="Tìm kiếm"
                                        variant="standard"
                                    />
                                </Box>
                            </div>

                            <div style={{position: "relative"}}>
                                <select className="filter-select">
                                    <option value="all">Tất cả</option>
                                    <option value="newest">Mới nhất</option>
                                    <option value="confirmed">Xác nhận</option>
                                    <option value="completed">Hoàn thành</option>
                                    <option value="delivered">Đã giao</option>
                                    <option value="paid">Đã thanh toán</option>
                                    <option value="unpaid">Chưa thanh toán</option>
                                </select>
                                <i className="icon-filter">
                                    <TuneIcon></TuneIcon>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div style={{height:"100px"}}>
                        <div style={{padding: "10px", height:"100px"}}>
                            <div className="table-more">
                                <table className="mb-50-px" style={{width: "100%",height:"50px", borderCollapse: "collapse"}}>
                                    <thead>
                                    <tr className="color-blue header-table text-left border-header-table">
                                        <th className="pb-7 font-w-500" style={{width: "7%"}}>
                                            ID
                                        </th>
                                        <th
                                            className="pb-7 font-w-500"
                                            style={{width: "25%", paddingRight: "10px"}}
                                        >
                                            Ngày
                                        </th>

                                        <th className="pb-7 font-w-500" style={{width: "15%"}}>
                                            Số tiền thanh toán
                                        </th>
                                        <th className="pb-7 font-w-500" style={{width: "12%"}}>
                                            Hình thức
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="border-header-table">
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-header-table">
                                            <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                                                {product.id}
                                            </td>
                                            <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                                {product.name || "-"}
                                            </td>
                                            <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                                {product.totalPrice || "-"}
                                            </td>
                                            <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                                {product.type || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={10}
                                        color="primary"
                                        page={page}
                                        onChange={handleChange}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default OrderPage;

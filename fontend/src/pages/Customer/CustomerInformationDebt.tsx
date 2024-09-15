import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./customerInformationDebt.css";
import { order } from "../../model/person.model";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";
const ListOrderPage = () => {
    const [products, setProducts] = useState<order[]>([
        {
            id: "521345",
            name: "Công ty TNHN XD Nguyễn Hoàng Tiến Phát Hoàng Thanh Hải Đăng Kiểm",
            date: "31/12/2024",
            price: "1 200 000 000 000 VNĐ",
            isPay: "Chưa Thanh Toán",
            status: "Chưa giao",
        },
    ]);

    const [page, setPage] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <div>
            <div className="main-body">
                <h3>Khách hàng: Nguyễn Văn A</h3>
                <h3>ID: 124563</h3>
                <h3>Tổng số nợ còn lại: 200 000 000 vnđ</h3>
                <h3>Ngày thanh toán gần nhất: .../.../...</h3>
                <h3 style={{marginTop: "20px"}}>Danh sách đơn hàng chưa thanh toán</h3>
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
                <div>
                    <div style={{padding: "10px"}}>
                        <div className="table-more">
                            <table style={{width: "100%", borderCollapse: "collapse"}}>
                                <thead>
                                <tr className="color-blue header-table text-left border-header-table">
                                    <th className="pb-7 font-w-500" style={{width: "7%"}}>
                                        ID
                                    </th>
                                    <th
                                        className="pb-7 font-w-500"
                                        style={{width: "25%", paddingRight: "10px"}}
                                    >
                                        Tổng nợ(vnđ)
                                    </th>
                                    <th className="pb-7 font-w-500" style={{width: "12%"}}>
                                        Đã thanh toán(vnđ)
                                    </th>
                                    <th className="pb-7 font-w-500" style={{width: "18%"}}>
                                        Ngày thanh toán mới nhất
                                    </th>
                                    <th className="pb-7 font-w-500" style={{width: "15%"}}>
                                        Thanh toán mới nhất(vnđ)
                                    </th>
                                    <th className="pb-7 font-w-500" style={{width: "12%"}}>
                                        Còn lại
                                    </th>
                                    <th
                                        className="pb-7 font-w-500 text-black"
                                        style={{width: "5%"}}
                                    >
                                        <SettingsIcon></SettingsIcon>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="border-header-table">
                                {products.map((product) => (
                                    <tr key={product.id} className="border-header-table">
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                                            {product.id}
                                        </td>
                                        <td
                                            className="pb-7 pt-7 font-size-small font-w-500 "
                                            style={{paddingRight: "20px"}}
                                        >
                                            2 000 000
                                        </td>
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                            0
                                        </td>
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                            14/9/2024
                                        </td>
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                            1 000 000
                                        </td>
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                            1 000 000
                                        </td>
                                        <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                                            <button className="btn-more">
                                                <MoreHorizIcon></MoreHorizIcon>
                                            </button>
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
    );
};
export default ListOrderPage;

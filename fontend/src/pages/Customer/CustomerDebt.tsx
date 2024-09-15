import "./customerDebt.css";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {useState} from "react";
import product from "../../model/product.model.tsx";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const CustomerManagement = () => {
    const [products, setProducts] = useState<product[]>([
        {
            id: 13245,
            name: "",
            quantity: "",
            paperCount: "",
            price: "",
            totalPrice: "",
        },
        {
            id: 57812,
            name: "",
            quantity: "",
            paperCount: "",
            price: "",
            totalPrice: "",
        },
    ]);

    const [page, setPage] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return(
        <div className="container">
            <div className="hear">
                <h3>Danh sách công nợ khách hàng</h3>
                <button className="btn btn-primary">
                    Thêm mới
                </button>
            </div>

            <div className="search">
                <ManageSearchIcon className="icon-search"></ManageSearchIcon>
                <input type="search" placeholder="search"/>
            </div>

            <div className="table-main pd-20-px">
                <table className="table" style={{width: "100%", height: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr className="color-blue header-table text-left border-header-table">
                        <th className="pb-7 font-w-500" style={{paddingRight: "20px"}}>ID</th>
                        <th className="pb-7  font-w-500" style={{paddingRight: "50px"}}>Tên khách hàng</th>
                        <th className="pb-7 font-w-500">Số điện thoại</th>
                        <th className="pb-7 font-w-500" style={{paddingRight: "40px"}}>Tổng công nợ(vnđ)</th>
                        <th className="pb-7 font-w-500">Đã thanh toán(vnđ)</th>
                        <th className="pb-7 font-w-500">Còn lại(vnđ)</th>
                        <th className="pb-7 font-w-500">Đã nợ(tháng)</th>
                        <th className="pb-7 font-w-500"></th>
                    </tr>
                    </thead>
                    <tbody className="border-header-table">
                    {products.map((product) => (
                        <tr key={product.id} className="border-header-table">
                            <td className="pb-7 pt-7">{product.id}</td>
                            <td className="pb-7 pt-7">{product.name || "-"}</td>
                            <td className="pb-7 pt-7">{product.quantity || "-"}</td>
                            <td className="pb-7 pt-7">{product.paperCount || "-"}</td>
                            <td className="pb-7 pt-7">{product.price || "-"}</td>
                            <td className="pb-7 pt-7">1</td>
                            <td className="pb-7 pt-7">1</td>
                            <td className="pb-7 pt-7">...</td>
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

    );
};

export default CustomerManagement;
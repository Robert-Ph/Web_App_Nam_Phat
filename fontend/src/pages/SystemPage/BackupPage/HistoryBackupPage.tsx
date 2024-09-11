import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";

import "../../OrderPage/listOrder.css";
import "./historyBackup.css";

import Span from "../../../component/Span/Span";
import backup from "../../../model/backup.model";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HistoryBackupPage = () => {
  const [logs, setLogs] = useState<backup[]>([
    {
      id: "1",
      date: "31/12/2024 24:24:00",
      status: "infor",
      actionBy: "NV01",
      capacity: 100,
    },
    {
      id: "2",
      date: "31/12/2024 24:24:00",
      status: "warning",
      actionBy: "NV01",
      capacity: 120,
    },
  ]);

  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="main-body">
          <h3>Lịch sử sao lưu</h3>
          <div style={{ marginBottom: "10px" }}>
            <div
              className="d-flex justify-space-bettwen "
              style={{ marginTop: "15px" }}
            >
              <div className="d-flex">
                <button className="btn-filter">
                  <FilterListIcon></FilterListIcon>
                </button>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
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
              <div style={{ paddingRight: "5%" }}>
                <button
                  className="btn btn-black"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở về
                </button>
              </div>
            </div>
          </div>
          <div style={{ padding: "10px" }} className="mt-20">
            <div className="table-more">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr className="color-blue header-table text-left border-header-table">
                    <th className="pb-7 font-w-500" style={{ width: "4%" }}>
                      ID
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "20%", paddingRight: "10px" }}
                    >
                      Thời gian
                    </th>
                    <th
                      className="pb-7 font-w-500"
                      style={{ width: "10%", paddingRight: "10px" }}
                    >
                      Trạng thái
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                      Dung lượng
                    </th>
                    <th className="pb-7 font-w-500" style={{ width: "20%" }}>
                      Người thực hiện
                    </th>
                  </tr>
                </thead>
                <tbody className="border-header-table">
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-header-table"
                      style={{ lineHeight: "1.5" }}
                    >
                      <td className="pbt-td font-size-small td-table font-w-500 ">
                        {log.id}
                      </td>
                      <td className="pbt-td font-size-small font-w-500 ">
                        {log.date || "-"}
                      </td>
                      <td
                        className="pbt-td font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px", paddingLeft: "0px" }}
                      >
                        <Span type={"danger"} message={log.status}></Span>
                      </td>
                      <td className="pbt-td font-size-small td-table font-w-500">
                        {log.capacity || "-"}
                      </td>
                      <td
                        className="pbt-td font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                      >
                        {log.actionBy || "-"}
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
      </motion.div>
    </div>
  );
};

export default HistoryBackupPage;

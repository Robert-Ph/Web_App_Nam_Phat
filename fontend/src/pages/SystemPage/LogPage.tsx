import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../OrderPage/listOrder.css";

import log from "../../model/log.model";
import Span from "../../component/Span/Span";

const LogPage = () => {
  const [logs, setLogs] = useState<log[]>([
    {
      id: "1",
      date: "31/12/2024 24:24:00",
      level: "infor",
      actionBy: "NV01",
      action:
        "Thay đổi tên hệ thống từ ngày sang ngày. Nhập hàng hóa cho đơn hàng #10120102010 bao gồm 12 hàng hóa và tổng chi phí là 1200000 VNĐ. Được nhập vào ngày 11/07/2002 15:15:30",
    },
    {
      id: "2",
      date: "31/12/2024 24:24:00",
      level: "warning",
      actionBy: "NV01",
      action:
        "Thay đổi tên hệ thống từ ngày sang ngày. Nhập hàng hóa cho đơn hàng #10120102010 bao gồm 12 hàng hóa và tổng chi phí là 1200000 VNĐ. Được nhập vào ngày 11/07/2002 15:15:30",
    },
  ]);
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <div className="main-body">
        <h3>Log</h3>
        <div style={{ marginBottom: "10px" }}></div>
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
                    style={{ width: "10%", paddingRight: "10px" }}
                  >
                    Thời gian
                  </th>
                  <th
                    className="pb-7 font-w-500"
                    style={{ width: "8%", paddingRight: "10px" }}
                  >
                    Loại
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "10%" }}>
                    Người thực hiện
                  </th>
                  <th className="pb-7 font-w-500" style={{ width: "25%" }}>
                    Nội dung
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
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500 ">
                      {log.id}
                    </td>
                    <td className="pb-7 pt-7 font-size-small font-w-500 ">
                      {log.date || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ paddingRight: "20px", paddingLeft: "0px" }}
                    >
                      <Span type={"danger"} message={log.level}></Span>
                    </td>
                    <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                      {log.actionBy || "-"}
                    </td>
                    <td
                      className="pb-7 pt-7 font-size-small td-table font-w-500"
                      style={{ textAlign: "justify" }}
                    >
                      {log.action || "-"}
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
  );
};

export default LogPage;

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../OrderPage/ListOrderPage/listOrder.css";

import log from "../../../model/log.model";
import Span from "../../../component/Span/Span";
import LogService from "../../../service/LogService";
import { toast } from "react-toastify";
import Spiner from "../../../component/Spiner/Spiner";
import { formatDateTime } from "../../../utils/Utils";

const LogPage = () => {
  const [logs, setLogs] = useState<log[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    LogService.getAll(page - 1, pageSize)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setTotalPages(response.data.data.page.totalPages);
          setLoading(false);
          setLogs(response.data.data.content);
        }
      })
      .catch((error) => {
        toast.error("Xảy ra lỗi.");
        console.log(error);
      });
  }, [page, pageSize]);
  return (
    <div>
      <div className="main-body">
        <h3>Log</h3>
        <div style={{ marginBottom: "10px" }}></div>
        {loading && <Spiner></Spiner>}
        {!loading && (
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
                        {formatDateTime(log.dateCreate) || "-"}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ paddingRight: "20px", paddingLeft: "0px" }}
                      >
                        <Span type={log.level} message={log.level}></Span>
                      </td>
                      <td className="pb-7 pt-7 font-size-small td-table font-w-500">
                        {log.userName || "-"}
                      </td>
                      <td
                        className="pb-7 pt-7 font-size-small td-table font-w-500"
                        style={{ textAlign: "justify" }}
                      >
                        {log.messsage || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPage;

import { useState, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../../OrderPage/ListOrderPage/listOrder.css";
import "./historyBackup.css";

import Span from "../../../component/Span/Span";
import backup from "../../../model/backup.model";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackupService from "../../../service/BackupService";
import { formatDateTime } from "../../../utils/Utils";

const HistoryBackupPage = () => {
  const [backups, setbackups] = useState<backup[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await BackupService.getHistory();
      setbackups(response.data.data.content);
      setTotalPages(response.data.data.page.totalPages);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, totalPages, pageSize]);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="main-body justify-space-arround">
          <div className="d-flex justify-space-bettwen mb-20-px">
            <h3>Lịch sử sao lưu</h3>
            <button
              className="btn btn-black"
              onClick={() => {
                navigate(-1);
              }}
            >
              {" "}
              Trở về
            </button>
          </div>
          {/* <div style={{ marginBottom: "10px" }}>
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
          </div> */}
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
                {!loading && (
                  <tbody className="border-header-table">
                    {backups.map((log) => (
                      <tr
                        key={log.id}
                        className="border-header-table"
                        style={{ lineHeight: "1.5" }}
                      >
                        <td className="pbt-td font-size-small td-table font-w-500 ">
                          {log.id}
                        </td>
                        <td className="pbt-td font-size-small font-w-500 ">
                          {log.dateCreate
                            ? formatDateTime(log.dateCreate)
                            : "-"}
                        </td>
                        <td
                          className="pbt-td font-size-small td-table font-w-500"
                          style={{ paddingRight: "20px", paddingLeft: "0px" }}
                        >
                          <Span
                            type={log.status ? log.status.toString() : "INFOR"}
                            message={
                              log.status ? log.status.toString() : "INFOR"
                            }
                          ></Span>
                        </td>
                        <td className="pbt-td font-size-small td-table font-w-500">
                          {`${log.capacity} MB ` || "-"}
                        </td>
                        <td
                          className="pbt-td font-size-small td-table font-w-500"
                          style={{ textAlign: "justify" }}
                        >
                          {log.username || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
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
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryBackupPage;

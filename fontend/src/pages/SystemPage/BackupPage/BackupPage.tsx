import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green, red } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BackupPage = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [backupComplete, setBackupComplete] = useState(false);
  const [backupError, setBackupError] = useState(false);

  const naviagte = useNavigate();

  const startBackup = () => {
    setOpenDialog(true);
  };

  const confirmBackup = () => {
    setOpenDialog(false);
    setIsBackingUp(true);
    setProgress(0);
    setBackupError(false);

    // Thanh progress hiển thị
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          setBackupComplete(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const resetBackup = () => {
    setBackupComplete(false);
    setBackupError(false);
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="d-flex justify-space-bettwen mt-10">
            {" "}
            <h3>Sao lưu dữ liệu</h3>
            <div>
              <button
                className="btn btn-warning"
                onClick={() => {
                  naviagte("/system/backup/history");
                }}
              >
                Lịch sử sao lưu
              </button>
            </div>
          </div>

          <div className="mt-30">
            <div className="d-flex dicrect-col">
              <span>
                <strong>Lần sao lưu gần nhất là : </strong>11/07/2024 15:30:30
              </span>
              <span>
                <strong>Dung lượng: </strong>
                30MB
              </span>
            </div>
          </div>
        </div>
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <BackupIcon fontSize="large" style={{ marginRight: "10px" }} />
                <Typography variant="h5" gutterBottom>
                  Backup Dữ Liệu
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Nhấn nút bên dưới để bắt đầu sao lưu dữ liệu của bạn.
              </Typography>

              {isBackingUp ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CircularProgress />
                  <Typography variant="body1" style={{ marginTop: "20px" }}>
                    Đang sao lưu...
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                </Box>
              ) : backupComplete ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircleOutlineIcon
                    style={{ color: green[500], fontSize: "3rem" }}
                  />
                  <Typography variant="h6" style={{ marginTop: "10px" }}>
                    Sao lưu hoàn tất!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={resetBackup}
                    style={{ marginTop: "20px" }}
                  >
                    Chấp nhận
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startBackup}
                  style={{ marginTop: "20px" }}
                  startIcon={<BackupIcon />}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bắt đầu Sao lưu
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Confirmation Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Xác nhận Backup</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn có chắc chắn muốn sao lưu dữ liệu không? Quá trình này có
                thể mất vài phút.
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: "25px" }}>
              <button
                className="btn btn-danger"
                onClick={() => setOpenDialog(false)}
              >
                Hủy
              </button>

              <button className="btn btn-primary" onClick={confirmBackup}>
                Xác nhận
              </button>
            </DialogActions>
          </Dialog>
        </Container>
      </motion.div>
    </div>
  );
};

export default BackupPage;

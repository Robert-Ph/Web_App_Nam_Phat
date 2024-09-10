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

const BackupPage = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [backupComplete, setBackupComplete] = useState(false);
  const [backupError, setBackupError] = useState(false);

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
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                  Sao lưu lại
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
      </motion.div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác nhận Backup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn sao lưu dữ liệu không? Quá trình này có thể
            mất vài phút.
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
  );
};

export default BackupPage;

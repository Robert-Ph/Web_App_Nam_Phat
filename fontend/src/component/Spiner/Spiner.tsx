import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spiner() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"; // Để thêm CSS tùy chỉnh

const NotFound = () => {
  const navigate = useNavigate();

  // Hàm để điều hướng về trang chủ hoặc trang login
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist.</p>
        <Button
          variant="contained"
          color="primary"
          onClick={goHome}
          className="back-button"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

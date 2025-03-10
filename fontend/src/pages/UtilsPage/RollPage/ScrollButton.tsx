import { useState, useEffect, ReactElement} from "react";
import { Button } from "@mui/material"; // Sử dụng Material-UI Button nếu cần, hoặc thay thế bằng button thông thường

type props = {
  title: string;
  chidren?: ReactElement;
};
const ScrollButton = ({ title, chidren }: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Hàm để cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  // Hàm để kiểm tra vị trí cuộn và hiển thị/ẩn nút
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          variant="contained"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          {chidren}
          {title}
        </Button>
      )}
    </>
  );
};

export default ScrollButton;

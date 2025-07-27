// src/components/StatusIcon.tsx
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type StatusIconProps = {
    type: "success" | "error";
    size?: number; // optional
    iconSize?: number; // kích thước icon bên trong
};

const StatusIcon: React.FC<StatusIconProps> = ({ type, size = 20, iconSize = 12, }) => {
    const isSuccess = type === "success";
    return (
        <div
            style={{
                backgroundColor: isSuccess ? "green" : "red",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isSuccess ? (
                <CheckIcon style={{ color: "white", fontSize: iconSize }} />
            ) : (
                <CloseIcon style={{ color: "white", fontSize: iconSize }} />
            )}
        </div>
    );
};

export default StatusIcon;

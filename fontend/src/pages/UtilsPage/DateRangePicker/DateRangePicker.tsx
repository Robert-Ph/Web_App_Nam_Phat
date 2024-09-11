import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "./DateRangePicker.css";

const DateRangePicker: React.FC = () => {
  // Initialize startDate and endDate as Date | undefined
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2024-08-01")
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date("2024-08-31")
  );

  // Handle reset logic
  const handleReset = () => {
    setStartDate(new Date("2024-08-01"));
    setEndDate(new Date("2024-08-31"));
  };

  return (
    <div className="date-range-picker">
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          className="date-picker-input"
        />
        <span> - </span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date as Date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          className="date-picker-input"
        />
        <button className="btn-filter_date d-flex">
          <EditCalendarIcon className="calendar-icon" />
        </button>
      </div>
      <button className="reset-button" onClick={handleReset}>
        <RestartAltIcon />
      </button>
    </div>
  );
};

export default DateRangePicker;

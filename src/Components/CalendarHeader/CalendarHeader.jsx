import styles from "./CalendarHeader.module.css";
import { useState } from "react";
import DatePickerModal from "../Datepicker/DatePickerModal";

const CalendarHeader = ({ currentDate, onNavigate, customWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const safeCurrentDate = currentDate || new Date();
  const currentMonth = monthNames[safeCurrentDate.getMonth()];
  const currentYear = safeCurrentDate.getFullYear();

  return (
    <div className={`${styles.header} responsive-container`}>
      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() => onNavigate(-1)}
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <button
          className={styles.monthYearButton}
          onClick={() => setShowDatePicker(true)}
          aria-haspopup="dialog"
          aria-expanded={showDatePicker}
        >
          <div className={styles.monthYear}>
            <h2 className={styles.monthTitle}>{currentMonth}</h2>
            <span className={styles.yearTitle}>{currentYear}</span>
          </div>
        </button>

        <button
          className={styles.navButton}
          onClick={() => onNavigate(1)}
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.weekDays}>
        {customWeekDays.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {showDatePicker && (
        <DatePickerModal
          currentDate={safeCurrentDate}
          onDateChange={(date) => {
            setShowDatePicker(false);
            onNavigate(date);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default CalendarHeader;

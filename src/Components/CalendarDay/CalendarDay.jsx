import styles from "./CalendarDay.module.css";

const CalendarDay = ({ dayInfo, onClick }) => {
  const { date, isCurrentMonth, isToday, events } = dayInfo;
  const dayNumber = date.getDate();

  const getEventColors = () => ["#4ECDC4", "#45B7D1", "#DDA0DD", "#98D8C8", "#FFB347", "#96CEB4", "#FFEAA7"];

  const hasConflicts = () => {
    if (events.length <= 1) return false;
    const sortedEvents = events
      .map(event => ({
        start: new Date(`2000-01-01 ${event.time}`),
        end: new Date(new Date(`2000-01-01 ${event.time}`).getTime() + event.duration * 60000),
      }))
      .sort((a, b) => a.start - b.start);

    for (let i = 0; i < sortedEvents.length - 1; i++) {
      if (sortedEvents[i].end > sortedEvents[i + 1].start) return true;
    }
    return false;
  };

  const colors = getEventColors();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes.padStart(2, "0")} ${ampm}`;
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startTotalMinutes = hours * 60 + minutes;
    const endTotalMinutes = startTotalMinutes + duration;

    const endHours = Math.floor(endTotalMinutes / 60) % 24;
    const endMinutes = endTotalMinutes % 60;

    const endTime = `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
    return formatTime(endTime);
  };

  const sortedEvents = [...events].sort((a, b) => new Date(`2000-01-01 ${a.time}`) - new Date(`2000-01-01 ${b.time}`));

  return (
    <div
      className={`${styles.day} ${!isCurrentMonth ? styles.otherMonth : ""} ${isToday ? styles.today : ""} ${events.length > 0 ? styles.hasEvents : ""}`}
      onClick={onClick}
      role="button"
      aria-label={`Day ${dayNumber} ${hasConflicts() ? "with conflicts" : ""}`}
    >
      <div className={styles.dayHeader}>
        <div className={styles.dayNumber}>
          {dayNumber}
          {hasConflicts() && <div className={styles.conflictIndicator} title="Conflicting events">!</div>}
        </div>
      </div>

      <div className={styles.events}>
        {sortedEvents.slice(0, 3).map((event, index) => (
          <div
            key={event.id}
            className={styles.event}
            style={{ backgroundColor: colors[index % colors.length] }}
            title={`${event.title} - ${formatTime(event.time)} to ${calculateEndTime(event.time, event.duration)}`}
          >
            <span className={styles.eventTitle}>{event.title}</span>
            <span className={styles.eventTime}>{formatTime(event.time)}</span>
          </div>
        ))}
        {events.length > 3 && <div className={styles.moreEvents}>+{events.length - 3} more</div>}
      </div>
    </div>
  );
};

export default CalendarDay;

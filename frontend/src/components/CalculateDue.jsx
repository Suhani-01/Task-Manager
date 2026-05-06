/**
 * CalculateDue Component
 * Computes the difference between today and the due date.
 * Returns a styled badge indicating how much time is left.
 */
export const CalculateDue = ({ task }) => {
    let today = new Date();
    let dueDt = new Date(task.dueDate);

    // Normalize both dates to midnight to ensure the day difference 
    // is based on the date, not the specific time of day.
    today.setHours(0, 0, 0, 0);
    dueDt.setHours(0, 0, 0, 0);

    // Calculate difference in days: (Milliseconds / ms per day)
    const diff = Math.ceil((dueDt - today) / (1000 * 60 * 60 * 24));

    // Priority 1: If task is done, time remaining doesn't matter.
    if (task.status == "completed") {
      return <div className="text-text-muted">Completed</div>;
    } 
    // Priority 2: If the date has passed.
    else if (diff < 0) {
      return <div className="text-danger">Overdue</div>;
    } 
    // Priority 3: If the date is today.
    else if (diff == 0) {
      return <div className="text-primary">Due Today</div>;
    } 
    // Default: Show the countdown in days.
    else {
      return <div className="text-text-muted">{diff} day(s) left</div>;
    }
};
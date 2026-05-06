export const CalculateDue = ({task}) => {
    let today = new Date();
    let dueDt = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);
    dueDt.setHours(0, 0, 0, 0);

    const diff = Math.ceil((dueDt - today) / (1000 * 60 * 60 * 24));
    if (task.status == "completed") {
      return <div className="text-text-muted">Completed</div>;
    } else if (diff < 0) {
      return <div className="text-danger">Overdue</div>;
    } else if (diff == 0) {
      return <div className="text-primary">Due Today</div>;
    } else {
      return <div className="text-text-muted">{diff} day(s) left</div>;
    }
  };
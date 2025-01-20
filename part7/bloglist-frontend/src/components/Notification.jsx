const Notification = ({ notification }) => {
  return notification ? (
    <div
      className={`notification ${
        notification.type === "success" ? "success" : "error"
      }`}
    >
      {notification.message}
    </div>
  ) : null;
};

export default Notification;

import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 z-50 p-4 rounded-md bg-green-700 text-white max-w-md"
      : "fixed top-4 z-50 p-4 rounded-md bg-red-700 text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center ">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;

import { FaStar } from "react-icons/fa";
function Star({ filled, onClick }) {
  return (
    <FaStar
      className={
        filled
          ? "bg-transparent border-none cursor-pointer outline-none text-[#2A9134]"
          : "bg-transparent border-none cursor-pointer outline-none text-[#ccc]"
      }
      onClick={onClick}
    />
  );
}
export default Star;

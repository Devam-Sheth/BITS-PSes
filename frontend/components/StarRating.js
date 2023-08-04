import { useState } from "react";
import Star from "./Star";

function StarRating({ onChange, title }) {
  const [rating, setRating] = useState(0);
  const changeRating = newRating => {
    setRating(newRating);
    onChange?.(newRating);
  };
  return (
    <div className="mb-4 mx-2 flex-col items-center justify-center border-none cursor-pointer outline-none flex">
      <label className="font-bold text-xs"> {title} </label>
      <div className="gap-4 flex">
        {[1, 2, 3, 4, 5].map(value => (
          <Star
            key={value}
            filled={value <= rating}
            onClick={() => changeRating(value)}
          />
        ))}
      </div>
    </div>
  );
}
export default StarRating;

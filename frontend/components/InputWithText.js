export function InputWithText({
  title,
  description,
  defaultValue,
  onChange,
  type,
  validate = false,
  min
}) {
  const className = validate
    ? "border-2 border-red-200 rounded w-full py-1 px-2 text-black leading-tight focus:outline-double focus:border-gray-200"
    : "border-2 border-gray-200 rounded w-full py-1 px-2 text-black leading-tight focus:outline-double focus:border-gray-200";
  return (
    <div className="mb-4 w-full">
      <label className="font-bold text-xs"> {title} </label>
      <br />
      <span className="text-sm">{description}</span>
      <div>
        <input
          className={className}
          id="inline-full-name"
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
          min={min}
        />
        {validate ? (
          <span className="text-red-500">This field is mandatory</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

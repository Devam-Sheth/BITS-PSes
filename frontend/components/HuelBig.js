import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function HuelBig({ setID }) {
  const cookies = new Cookies();
  const sessionID = cookies.get('session_id')
  const [data, setData] = useState([]),
    [search, setNewSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://bits-and-pses.duckdns.org/courselist/", {
        headers: {Authorization: ''}
      })
      .then(response => {
        setData(response.data);
      });
  }, []);

  const handleSearchChange = input => setNewSearch(input.target.value);

  const filtered = !search
    ? data
    : data.filter(course =>
        course.course_name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="bg-[#F9F9F9] min-h-full w-full">
      <input
        type="text"
        className="p-2 border-2 rounded-md m-2 w-[calc(33vw-1.5rem)]"
        value={search}
        placeholder="search by name"
        onChange={handleSearchChange}
      />

      <div className="flex justify-end">
        <button className=" text-[#0353A4] font-bold w-auto mr-4 hover:text-teal-500">
          FILTER
        </button>
      </div>

      {filtered.map(course => (
        <div
          onClick={() => {
            setID(course.CourseID);
          }}
          key={course.CourseID}
          className=" bg-white gap-2 shadow-sm flex-col flex justify-center items-start p-4 m-4 rounded-xl hover:cursor-pointer"
        >
          <div className="text-[#666666] font-bold text-lg">
            {course.course_name}
          </div>

          <div className="flex gap-2">
            <div className="px-1 text-[#2A9134] font-semibold bg-[#E9F4EA]">
              {course.CourseID}
            </div>
            <div className="px-1 text-[#89B6FF] font-semibold bg-[#EBF3FF]">
              Humanity Elective
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

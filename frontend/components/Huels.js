import { useEffect, useState } from "react";
import axios from "axios";
import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { Cookies, useCookies } from "react-cookie";

export default function Huels({ setID }) {
  const cookies = new Cookies();
  const [lookies, setCookie, removeCookie] = useCookies(['session_id']);
  const sessionID = cookies.get('session_id');
  const [open, setOpen] = useState(false);
  const [search, setNewSearch] = useState(""),
    [data, setData] = useState({
      CourseID: "GS FXXX",
      CourseName: "- NA -",
      Units: 0,
      IC_Name: "None",
      pr: 0,
      overall_exp: 0,
      liteness: 0,
      grade_sat: 0,
    });

  useEffect(() => {
    axios
      .get("https://bits-and-pses.duckdns.org/courselist/", {
        headers: {Authorization: ''}
      })
      .then(response => setData(response.data));
  }, []);

  const handleSearchChange = input => setNewSearch(input.target.value);

  const filtered = !search
    ? data
    : data.filter(course =>
        course.course_name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <div className="bg-[#E0E0E0] gap-5 px-4 flex flex-col justify-center pb-3 pt-5">
        <div className="text-3xl font-semibold text-[#606060]">Courses</div>
        <div className="flex items-stretch gap-4 justify-between pr-6 pl-3">
          <div className="bg-white rounded-md">
            <Hamburger
              rounded
              color="#4b5563"
              size={32}
              distance="sm"
              onToggle={toggled => setOpen(toggled ? true : false)}
            />
          </div>
          <input
            type="text"
            className="p-2 rounded-md w-[70vw]"
            value={search}
            placeholder="search by name"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="bg-[#F9F9F9] min-h-screen w-full">
        <div className="flex justify-end">
          <button className=" text-[#0353A4] font-bold w-auto mt-2 mr-4 hover:text-teal-500">
            FILTER
          </button>
        </div>

        {Array.from(filtered).map(course => (
          <Link href={`/huel/${course.CourseID}`}>
            <div
              onClick={() => {
                setID(course.CourseID);
              }}
              key={course.CourseID}
              className=" bg-white gap-2 shadow-sm flex-col flex justify-center items-start p-4 m-4 rounded-xl"
            >
              <div className="text-[#666666] font-semibold text-lg">
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
          </Link>
        ))}
      </div>
    </>
  );
}

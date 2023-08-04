import { useState } from "react";
import { InputWithText } from "../components/InputWithText";
import StarRating from "../components/StarRating";
import { useCookies } from "react-cookie";
import axios from 'axios'

export default function FormValidation() {
  const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
  axios.defaults.headers.common['Authorization'] = `Token ${cookies.session_id}`;
  const [startValidation, setValidation] = useState(false),
    [student, setStudent] = useState({
      student: "",
      course: "",
      sem: 2,
      pr: 100,
      code: "",
      overall_exp: "",
      liteness: "",
      grade_sat: "",
      tips: "",
    });

  const onClick = () => {
    setValidation(true);
    if (
      student.name === "" ||
      student.expRating === "" ||
      student.difficultyRating === "" ||
      student.gradingRating === "" ||
      student.feedback === ""
    )
      // return;

      axios({
        method: "POST",
        url: "https://bits-and-pses.duckdns.org/courseview/",
        data: {
          course: student.course,
          student: student.student,
          sem: student.sem,
          pr: student.pr,
          overall_exp: student.overall_exp,
          liteness: student.liteness,
          grade_sat: student.grade_sat,
          tips: student.tips,
        },
      })
        .then(res => alert("Submitted Successfully"))
        .catch(err => console.log("ERROR : ", err.request));
  };

  return (
    <div className="bg-[#F9F9F9] text-[#606060] display-block flex flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col mt-6 w-3/4 justify-center">
        <div className="flex w-full p-3 mt-4 flex-col mb-4 md:w-3/4">
          <span className="font-bold text-2xl mb-4">Feedback form</span>

          
          <InputWithText
            title={"Course Name"}
            onChange={e => {
              setStudent({
                ...student,
                course: e.target.value,
              });
            }}
            validate={startValidation ? student.course === "" : false}
          />
           <InputWithText
            title={"Feedback"}
            onChange={e => {
              setStudent({
                ...student,
                tips: e.target.value,
              });
              console.log(student);
            }}
            validate={startValidation ? student.feedback === "" : false}
          />
          <InputWithText
            title={"Pr No."}
            onChange={e => {
              setStudent({
                ...student,
                pr: e.target.value,
              });
            }}
            validate={startValidation ? student.pr === "" : false}
          />
          <InputWithText
            title={"Course Number"}
            onChange={e => {
              setStudent({
                ...student,
                code: e.target.value,
              });
            }}
            validate={startValidation ? student.code === "" : false}
          />

          <div className="flex flex-col p-1 gap-1 justify-center items-center">
            <StarRating
              title={"Rate difficulty of this course"}
              onChange={value => {
                setStudent({
                  ...student,
                  overall_exp: value,
                });
              }}
            />
            <StarRating
              title={"Personal experience with course"}
              onChange={value => {
                setStudent({
                  ...student,
                  liteness: value,
                });
              }}
            />
            <StarRating
              title={"Rate grading of this course"}
              onChange={value => {
                setStudent({
                  ...student,
                  grade_sat: value,
                });
              }}
            />
          </div>

          <InputWithText
            title={"Feedback"}
            onChange={e => {
              setStudent({
                ...student,
                tips: e.target.value,
              });
              console.log(student);
            }}
            validate={startValidation ? student.feedback === "" : false}
          />

          <div className="my-2">
            <button
              className="bg-[#0353A4] hover:bg-slate-800 text-white text-sm font-medium py-2 px-4 rounded "
              type="button"
              onClick={onClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

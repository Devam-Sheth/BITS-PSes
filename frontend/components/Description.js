import { InputWithText } from "../components/InputWithText";
import StarRating from "../components/StarRating";
import { useState } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie';
import React, {useEffect} from "react";
import {getCourselist , getCodelist , DropdownMenu } from './getCourse';

export default function Description({ data }) {
  const [list,setList]=useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
  axios.defaults.headers.common['Authorization'] = `Token ${cookies.session_id}`;
  const [toggle, setToggle] = useState(false),
    [startValidation, setValidation] = useState(false),
    [student, setStudent] = useState({
      user: "",
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
      student.user === "" ||
      student.overall_exp === "" ||
      student.liteness === "" ||
      student.grade_sat === "" ||
      student.tips === ""
    )
      {return;}

    data = {
      course: student.course,
      pr: student.pr,
      overall_exp: student.overall_exp,
      liteness: student.liteness,
      grade_sat: student.grade_sat,
      tips: student.tips,
    }
    console.log(data)
    axios({
      method: "POST",
      url: "https://bits-and-pses.duckdns.org/postreview/",
      data: {
        course: student.course,
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

 
function handleChange(e){
  const rname = e.target.value;
    setStudent({
      ...student,
      name: e.target.value,
    });

    // checkingmatch...

    getCourselist(rname).then(result => setStudent({...student, code: result} ) , console.log(student.code))
   
    getCodelist(rname).then(result => setStudent({...student, course: result} ) , console.log(student.course))
};

  return toggle ? (
    cookies.session_id ? ( 
    <div className="bg-[#F9F9F9] fixed text-[#606060] w-screen h-max min-h-screen top-12 left-0 display-block flex flex-col justify-center items-center overflow-hidden">
      <div className="flex w-full p-3 mt-4 flex-col mb-4 md:w-3/4">
        <span className="font-bold text-2xl mb-4">Feedback Form</span>

        <InputWithText style={{"width":"50%","marginBottom":"20px"}}
            title={"Student Name"}
            type={"text"}
            onChange={e => {
                setStudent({
                  ...student,
                  user: e.target.value,
                });
            }}
            validate={startValidation ? student.user=== "" : false}
          />
        <div className="flex gap-4 w-full">    
         <DropdownMenu/>       
        </div>

        
       
        <InputWithText style={{"width":"100%","marginBottom":"20px"}}
            title={"Pr number"}
            type={"number"}
            min={1}
            onChange={e => {
              var pr_no=e.target.value;
              if(pr_no >0){
                setStudent({
                  ...student,
                  pr: e.target.value,
                });
              }
            }}
            validate={startValidation ? student.pr === "" : false}
          />
         
        <div className="flex justify-around items-center">
          <StarRating
            title={"Personal experience with course"}
            onChange={value => {
              setStudent({
                ...student,
                overall_exp: value,
              });
            }}
          />
          <StarRating
            title={"Rate difficulty of this course"}
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
          type={"text"}
          onChange={e => {
            setStudent({
              ...student,
              tips: e.target.value,
            });
         
          }}
          validate={startValidation ? student.tips === "" : false}
        />

        <div className="m-2 flex justify-start gap-12">
          <button
            className="bg-[#0353A4] border-black hover:bg-[#2A9134] border text-white text-sm font-medium p-2 rounded px-4 "
            type="button"
            onClick={onClick}
          >
            Submit Form
          </button>

          <button
            className="bg-white border-black hover:bg-[#2A9134] hover:text-white border text-sm font-medium p-2 rounded px-4 "
            type="button"
            onClick={() => setToggle(false)}
          >
            Return Back
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-[#F9F9F9] fixed text-[#606060] w-screen h-max min-h-screen top-12 left-0 display-block flex flex-col justify-center items-center overflow-hidden text-5xl">
      <p className="mb-10">You need to login first</p>
      <button
        className="bg-white border-black hover:bg-[#2A9134] hover:text-white border text-sm font-medium p-2 rounded px-4 "
        type="button"
        onClick={() => setToggle(false)}
      >
        Return Back
      </button>
    </div>)) : (
    <div className="bg-[#F9F9F9] w-[100%] ">
      <div className="flex justify-end">
        <button
          className=" text-[#0353A4] w-auto p-1 m-2 mb-0 mr-4 font-bold  hover:text-teal-500"
          onClick={() => setToggle(true)}
        >
          GIVE FEEDBACK 
        </button>
      </div>

      <div className=" bg-white shadow-sm flex m-4 rounded-xl lg:px-10">
        <span className="flex justify-center items-center p-4 pr-0 text-[#2A9134] text-4xl">
          {data.pr} <span className="text-base pl-0 m-0">th</span>
        </span>
        <span className="flex items-center justify-center text-[#8A8A8A] p-4 text-[14px]">
          most popular HuEl by PR number median
        </span>
      </div>

      <div className="shadow-sm m-4 rounded-xl bg-[#E0E0E0] p-4 lg:px-6">
        <div className=" text-2xl text-[#606060] lg:px-4">
          What is it about ?
        </div>
        <div className="text-[14px] text-[#8A8A8A] lg:px-4">
          {data.about}
        </div>
      </div>

      <div className=" lg:flex lg:flex-row">
        <div className="bg-white shadow-sm flex justify-center items-center m-4 rounded-xl lg:flex-1">
          <div className="flex rounded-full border-4 border-[#9B9B9B] h-[58px] w-[60px] m-3 text-2xl items-center justify-center text-[#2A9134]">
            {" "}
            <div>{data.overall_exp.toFixed(1)}</div>
          </div>
          <span className="flex items-center text-[#8A8A8A] p-4 text-[14px] w-3/4">
            Overall experience of the course
          </span>
        </div>

        <div className="bg-white shadow-sm flex justify-center items-center m-4 rounded-xl lg:flex-row-reverse lg:flex-1">
          <span className="flex items-center justify-end text-[#8A8A8A] p-4 text-[14px] w-3/4">
            Liteness of the course
          </span>
          <span className="flex rounded-full border-4 border-[#9B9B9B] h-[58px] w-[60px] m-3 text-2xl items-center justify-center text-[#2A9134] ">
            {data.liteness.toFixed(1)}
          </span>
        </div>

        <div className="bg-white shadow-sm flex justify-center items-center m-4 rounded-xl lg:flex-1">
          <span className="flex rounded-full border-4 border-[#9B9B9B] h-[58px] w-[60px] m-3 text-2xl items-center justify-center text-[#2A9134]">
            {data.grade_sat.toFixed(1)}
          </span>
          <span className="flex items-center text-[#8A8A8A] p-4 text-[14px] w-3/4">
            Satisfaction with the grading
          </span>
        </div>
      </div>
    </div>
  );
}

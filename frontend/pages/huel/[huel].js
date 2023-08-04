import "tailwindcss/tailwind.css";
import Title from "../../components/Title";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Description from "../../components/Description";
import Review from "../../components/Review";
import Form from "../../components/Form";

export default function Huel() {
  const router = useRouter(),
    { huel } = router.query;

  const [ID, setID] = useState(huel),
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
    search(ID);
  }, [ID]);

  const search = id =>
    axios({
      method: "POST",
      url: "https://bits-and-pses.duckdns.org/courseview/",
      data: { CourseID: id },
      headers: {Authorization: ''}
    })
      .then(response => setData(response.data[0]))
      .catch(err => console.log("ERROR : ", err.request));

  return (
    <div className="flex flex-col justify-center md:w-2/6 ">
      <Title data={data} />
      <Description data={data} />
      <Review data={data} />
      <Form />
    </div>
  );
}

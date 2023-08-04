  async function getCourselist (name) {

  


    const response = await fetch("https://bits-and-pses.duckdns.org/courselist/");
    const CourseList = await response.json();

    let reqIndex = -1;
    
    CourseList.map( el => {name === el.course_name ? reqIndex = CourseList.findIndex( el=> el.course_name === name) : null})
    
    // console.log(CourseList)
    // console.log(reqCode)
    
    if (reqIndex < 0) {
      return false;
    } else{  
    const reqCode = CourseList[reqIndex].CourseID;
     return reqCode;
    }  
  }

  async function getCodelist (code) {

    const response = await fetch("https://bits-and-pses.duckdns.org/courselist/");
    const CourseList = await response.json();

    let reqIndex = -1;
    
    CourseList.map( el => { el.CourseID === code ? reqIndex = CourseList.findIndex( el=> el.CourseID === code) : null})

       console.log(reqIndex)
    
    if (reqIndex < 0) {
      return false;
    } else{  
    const reqName = CourseList[reqIndex].course_name;

     return reqName;
    }  
  }



  import React, { useState, useEffect } from 'react';


  function DropdownMenu() {
   
    const [menuItemsCourse, setMenuItemsCourse] = useState([]);
    const [selectedItemCourseName, setSelectedItemCourseName] = useState('');
    const [selectedItemCourseId, setSelectedItemCourseId] = useState('');
  
    useEffect(() => {
      // Fetch the data from the API and update the menuItems state
      fetchMenuItems();
    }, []);
  
    // Function to fetch the menu items from the API
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://bits-and-pses.duckdns.org/courselist/')

        if (!response.ok) {
          throw new Error('Failed to fetch menu items from API');
        }
        
        const data = await response.json();
        setMenuItemsCourse(data); // Update the menuItems state with the fetched data
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to handle the selection of a menu item
    const handleSelect = (e) => {
      const courseName=e.target.value;
      setSelectedItemCourseName(courseName);
      for(let i=0;i<menuItemsCourse.length;i++){
        if(menuItemsCourse[i].course_name===courseName){
          setSelectedItemCourseId(menuItemsCourse[i].CourseID);
        }
      }
    };
     // Function to handle the selection of a menu item
     const handleSelectIdCourse = (e) => {
      var courseId=e.target.value;
      setSelectedItemCourseId(courseId);
      for (let i=0;i<menuItemsCourse.length;i++){
        if(menuItemsCourse[i].CourseID===courseId){
          setSelectedItemCourseId(menuItemsCourse[i].CourseID);
          setSelectedItemCourseName(menuItemsCourse[i].course_name);
        }
      }

    };
  
    return (
      <div style={{"display":"flex","flexDirection":"row","width":"100%"}}>
      <div className='mr-8'>
        <label>Select a Course :</label>
        <select className='border-2 border-gray-200 rounded w-full py-1 px-2 text-black leading-tight focus:outline-double focus:border-gray-200' value={selectedItemCourseName} onChange={handleSelect}>
          <option value="">Select an option</option>
          {menuItemsCourse.map((item) => (
            <option  key={item.id} value={item.course_name}>
              {item.course_name}
            </option>
          ))}
        </select>
        {selectedItemCourseName && <p>Selected item: {selectedItemCourseName}</p>}
      </div>
      <div>
      <label>Select Course  No. :</label>
      <select className='border-2 border-gray-200 rounded w-full py-1 px-2 text-black leading-tight focus:outline-double focus:border-gray-200' value={selectedItemCourseId} onChange={e => handleSelectIdCourse(e)}>
        <option value="">Select an option</option>
        {menuItemsCourse.map((item) => (
          <option  key={item.id} value={item.CourseID}>
            {item.CourseID}
          </option>
        ))}
      </select>
      {selectedItemCourseId && <p>Selected item: {selectedItemCourseId}</p>}
    </div>
    </div>
    );
  }

  // function DropdownMenuD() {
    
  //   const [menuItemsCourseName, setMenuItemsCourseName] = useState([]);
  //   const [selectedItemCourseName, setSelectedItemCourseName] = useState('');
  //   const [menuItemsCourseId, setMenuItemsCourseId] = useState([]);
  //   const [selectedItemCourseId, setSelectedItemCourseId] = useState('');
  //   useEffect(() => {
  //     // Fetch the data from the API and update the menuItems state
  //     fetchMenuItems();
  //   }, []);
  
  //   // Function to fetch the menu items from the API
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await fetch('https://bits-and-pses.duckdns.org/courselist/')

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch menu items from API');
  //       }
        
  //       const data = await response.json();
  //       console.log(data)
  //       setMenuItemsCourseId(data); // Update the menuItems state with the fetched data
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   // Function to handle the selection of a menu item
  //   const handleSelect = (e) => {
  //     var courseId=e.target.value;
  //     setSelectedItemCourseId(courseId);
  //     for (let i=0;i<menuItemsCourseName.length;i++){
  //       if(menuItemsCourseId[i].CourseID===courseId){
  //         setSelectedItemCourseList(i.CourseID);
  //         setSelectedItemCourseName(menuItemsCourseName[i].course_name);
  //       }
  //     }

  //   };
  
  //   return (
      
  //   );
  // }

export {getCourselist , getCodelist , DropdownMenu}

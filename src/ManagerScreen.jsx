import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// imports necessary modules for creating a React component, 
// making HTTP requests with Axios, navigating in a React application, 
// IoMdCheckmarkCircleOutline- this is the React Icon from the react-icons library.

function ManagerScreen() {
  // Defines a functional component named SelfAppraisal.
// THIS IS MY COMPONENT
const [data,setData]=useState("");
const [buttonsVisible, setButtonsVisible] = useState(true);
const [value,setValue]=useState([])
const [info,setInfo]=useState('')
const [message,setMessage]=useState()
const [store,setStore]=useState("");
const [comments,setComments]=useState(" ");
const [submitted, setSubmitted] = useState(false);
const [icon,setIcon]=useState();
const [popoverVisible1, setPopoverVisible1] = useState(false);   
const [mgrScr, setMgrScr] = useState([]);
const [overallValue,setOverallValue]=useState("");
const [devGoals, setDevGoals] = useState([]);
const [addDevGoals, setAddDevGoals] = useState("");
const [selfAssm, setSelfAssm] = useState([]);


console.log(popoverVisible1);

console.log(overallValue,"overallValue......................");

let ratingBreak =overallValue&& overallValue.mgrRating.split(",") || [];
  console.log(ratingBreak, "ratingBreak");
  
  let commentBreak=overallValue&&overallValue.mgrComment.split(",") || [];
  console.log(commentBreak,"ratingBreak")


var mgr_id=20;


// THESE ARE THE State Declarations AND THEY ARE DECLARED BECAUSE HERE AN ACTION IS PERFORMED OR CHANGE OF DATA IS OCCURING THAT IS WHY THEY ARE WRITTEN WITH THE HELP OF THE REACT HOOKS.

    useEffect(()=>{
    axios.get("http://localhost:8080/selfappraisal/getSelfAppraisal/3")
    // THIS IS THE FIRST API

    .then((response)=>{
      setStore(response.data)
        // alert("data fetched")
    })
    .catch((error)=>alert("error"))
},[])


useEffect(() => {
  axios.get("http://localhost:8080/api/getByDevGoals/4")
    .then((response) => setDevGoals(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

useEffect(() => {
  axios.get("http://localhost:8080/api/getBySelfAsmAll")
    .then((response) => setMgrScr(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

useEffect(() => {
  axios.get("http://localhost:8080/api/getByProfile/1")
    .then((response) => setValue(response.data))
    .catch(err => console.log(err))
}, [])

console.warn(value,"value")

// ------------------------------------------------------------------------------------------------------------------

const [rating1, setRating1] = useState({});

const handleChangeRating1 = (e) => {
  const key = e.target.name;
  const newValue = e.target.value;
  setRating1(prevState => ({ ...prevState, [key]: newValue })); // Update ratingComment state with the new value
}

console.log(rating1);

const [comment1, setComment1] = useState({});

const handleChangeComment1 = (e) => {
  const key = e.target.name;
  const newValue = e.target.value;
  setComment1(prevState => ({ ...prevState, [key]: newValue })); // Update ratingComment state with the new value
}

console.log(comment1);

let str=""
for(let i in rating1){
  str+=rating1[i]+",";
}

let totalStr=str.slice(0,str.length-1);
console.log(str.slice(0,str.length-1)); // This will log the current state of ratingComment

let str1=""
for(let i in comment1){
  str1+=comment1[i]+",";
}

let totalStr1=str1.slice(0,str1.length-1);
console.log(str1.slice(0,str1.length-1));

// ------------------------------------------------------------------------------------

console.log(overallValue,"overallValue");
console.log(info);

const overallRatingAndComment=()=>{
  console.log(info);
  let infoAll={...info,"mgrId":mgr_id,"mgrRating":totalStr,"mgrComment":totalStr1};
  // the thing that is written in double quotes is the backend variable
 
  console.log(infoAll,"infoAll...........");
  axios.post("http://localhost:8080/api/postByMng", infoAll)
     .then((response) => {
      axios.get("http://localhost:8080/api/getByManagerAsm/20")  
      .then(res=>{
        console.log(res.data,"response data **********************************")
        setOverallValue(res.data)     
      })
      setSubmitted("You have successfully reviewed");
    setIcon(<IoMdCheckmarkCircleOutline />);
    setButtonsVisible(false);
    setPopoverVisible1(false);
     })
}

useEffect(()=>{
  axios.get("http://localhost:8080/api/getByManagerAsm/1")  
  .then(res=>{
    console.log(res.data,"response data **********************************")
    setOverallValue(res.data)     
  })
},[])



useEffect(()=>{
  axios.get("http://localhost:8080/ManagerReview/getManagerReview/3")
  // THIS IS THE SECOND API

  .then((response)=>{
    setData(response.data)
    
      // alert("data fetched")
  })
  .catch((error)=>alert("error"))
},[])

console.log(value,"value.........")
console.warn(data,"data");
// The console. warn() method is used to write a warning message in the console.
console.log(store,"store")
// useEffect hook to make an asynchronous API call to fetch self-appraisal data from the server when the component mounts.

console.log(data);

console.log(message);


useEffect(()=>{
      axios.get("http://localhost:8080/employeeKra/getemployeeKra")
      // THIS IS THE THIRD API
      
      .then((response)=>setValue(response.data))
      .catch(err=>console.log(err))
},[])
// useEffect hook to fetch employee KRA (Key Result Areas) data from the server when the component mounts.

// for getting rating and comments
useEffect(()=>{
      axios.get("http://localhost:8080/RatingComments/get/3")
      .then((response)=>setComments(response.data))
},[])
console.log(comments,"comments..")

// THIS IS THE LOGIC FOR SUBMITTING THE RATING AND COMMENTS..........................
const handleSubmit = () => {
axios.post("http://localhost:8080/RatingComments/post", info)
// THIS IS THE FOURTH API

    .then((response) => {
      // alert("inserted");
    //   setDataMessage("You have successfully submitted your self-appraisal");
    //   setIcon(<IoMdCheckmarkCircleOutline />);
    //   setButtonsVisible(false);
    //   setPopoverVisible(false);
    }) 
    .catch((error) => console.log(error));

    // Defines a function handleSubmit to handle the submission of self-appraisal data and rating&comments. It sends a POST request to the server,
    //  updates state variables based on the response, and sets the visibility of buttons accordingly.
};
console.log(info,"info");

// THIS IS THE LOGIC FOR filling THE COMMENTS IN THE form type filds THAT WE WRITE IN THE FRONT END and updation of the state input fields.

const handleChangeComments=(e)=>{
const key=e.target.name;
const value=e.target.value;
setInfo({...info,[key]:value})
}
console.log(info);


useEffect(()=>{
    axios.get("http://localhost:8080/DraftRatingComments/getdraft/2")
    .then((response)=>setDraftInfo(response.data))
},[])
const [count,setCount]=useState(0)
const handleCount=()=>{
setCount(count+1)
}

console.log(count)

console.warn(value,"value")


const handleAddDevelopmentGoals = () => {

  console.log(addDevGoals,"addDevGoals...");
  axios.post("http://localhost:8080/api/postByDg", addDevGoals)
  .then((response) => {
    response.data
  })
}

console.log(addDevGoals,"addDevGoals");
handleAddDevelopmentGoals
const handleChangeAddDevelopmentGoals=(e)=>{
  setAddDevGoals({...addDevGoals,"managerAssessment":e.target.value});
}


const [ratingMng, setRatingMng] = useState([])
const [commentMng, setCommentsMng] = useState([])
useEffect(() => {
  axios.get("http://localhost:8080/api/getBySelfAsm/10")
    .then((response) => {
      setSelfAssm(response.data)
      setRatingMng(response.data.rating)
      setCommentsMng(response.data.comment)
    })
      
    .catch(err => console.log(err))
}, [])

console.log(selfAssm,"selfAssm")

console.log(ratingMng,"ratingMng")
console.log(commentMng,"commentMng")

const ratingArr = typeof ratingMng === 'string' ? ratingMng.split(",") : [];
const commentArr = (typeof commentMng === 'string' && commentMng !== '') ? commentMng.split(",") : [];


// The handleChangeComments function is an event handler for form input fields, extracting the name and value attributes from the target element 
// (typically an input field). It dynamically updates the info state with the latest user input and logs the updated state for debugging.

// ----------------------------------------------------------------THIS IS THE DISPLAY PART----------------------------------------------------------------------//

    return (

    <div className='w-full h-screen bg-gray-200 '>
      <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
        {/* anything that is written under square bracket CSS property is a arbitrary value */}

          {/* HERE THE COMPONENT STARTS (first part) */}
        <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter 4</h1>
        <div className='flex space-x-[500px]'>
        <h3 className='text-m text-gray-500 pl-5 mt-2'>01-Apr 2023 to 30-Jun-2023</h3>
        <div className='flex space-x-2 text-green-500 items-center text-lg'>
        
        <h1 className='text-xl'>{icon}</h1>
        <h1 className=''>{submitted} </h1>
        </div>
        </div>
      

        {/* MENU BAR */}
      <div className='text-gray-400 pl-2'>
        <div className="relative">
          <div className="toggle-bar absolute h-2  transition-transform duration-300">
          </div>
          <ul className="flex space-x-4  p-4">
          <li><a href="#" onClick={() => moveToggle(0)} className="text-lg">Goal Setting</a></li>
              <li><a href="#" onClick={() => moveToggle(1)} className="text-lg">Self Assessment</a></li>
              <li><a href="#" onClick={() => moveToggle(2)} className="text-lg">Manager Assessment</a></li>
              <li><a href="#" onClick={() => moveToggle(2)} className="text-lg">Annual Review</a></li>
        </ul>
        </div>   
      </div>
      
    {/* Adding one seprating line according to the figma design */}

    <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'></h1>

    {/* To make this we have to make a grid of 11 coloumns.4 for profile picture,role etc and 2 for "submitted on" and 5 for self rating */}

      <div className='grid grid-cols-11 '>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------ */}

      {/* PROFILE CARD IS displayed HERE */}

        <div className="col-span-4 ">
            <div className="grid grid-cols-12">
                  <div className='col-span-2 '>
                    <img src="profile.jpeg" className='rounded-full h-[40px] w-[42px] ml-6 mt-4' alt="Profile"></img>
                    </div>

                      <div className='col-span-10 '>
                      <div className="ml-2 mb-4">
                          <h2 className='font-thin text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>{value.empName}</h2>
                          <p className=' font-medium text-m text-blue-900 -ml-0 pt-1'>{`${value.designation} - ${value.department}`}</p>
                      </div>
                      </div>
            </div>
        </div>

        <div className='col-span-2 border-l-[1px] border-gray-300 mt-2'>
        <div className='ml-8 pl-6 mt-2'>
                <div className="pb-1">
                  <h2 className='text-lg font-thin text-black'>Reviewed By</h2>
                </div>
              <div className='flex space-x-3 pt-1'>
              <img src="manager.jpg" className='rounded-full h-[30px] w-[32px] -mt-1  mb-3 -ml-1' alt="Manager"></img>

                <div className="text-[16px] -mt-[2px] text-blue-900">{value.mgrName}</div>
              </div>
            </div>
          
        </div>

          {/* Adding one seprating line according to the figma design */}

          <div className='col-span-2 border-l-[1px] border-gray-300 mt-2'>

             {/* NOW THE DATE/submitted ON PART IS DIPLAYED HERE */}

              <div className='ml-8 pl-6 mt-2'>
                <div className="pb-1">
                  <h2 className='text-lg font-thin text-black'>Reviewed On</h2>
                </div>
              <div className='flex space-x-3 pt-1'>
                <div className='calender-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill='gray'>
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/>
                  </svg>
                </div>
                <div className="text-m -mt-1">{overallValue.reviewedOn}</div>
              </div>
            </div>
          </div>

          {/* NOW THE SELF RATING PART is displayed AND ALSO ADDING ONE SEPRATING LINE ACCORDING TO THE FIGMA DESIGN*/}

          <div className='col-span-3 border-l-[1px] border-gray-300 mt-2'>

            <div className="div ml-6 pl-6 mt-2">
              <div className="pb-1">
              <h2 className='text-lg font-thin text-black'>Manager rating</h2>
              </div>
              <div className="text-xl text-red-600 font-medium pl-6">
              {overallValue.overallMgrRating}
              </div>
            </div>
          </div>
      </div>

      {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
      <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4'></h1>

      {/* NOW THE SELF APPRAISAL-SECTION (second part) */}

      <div>
        <h1  className='text-xl font-normal text-gray-700 pl-4 pt-4'>Manager Feedback</h1>

        {/* we have to divide the grid in 9 parts and then give the devison of col span according */}

        <div className='grid grid-cols-9'>
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}

          <div className='col-span-2 ml-4 mt-3 mb-6'>
          <div className="ml-4 mb-12 space-y-6 pt-3">
          <h2 className='font-extralight text-lg  mx-8 pt-3 w-56 flex-col justify-center -ml-0 text-black'>Overall Rating</h2>
          <p className=' font-extralight text-lg text-black -ml-0 pt-2 flex-col  '>Overall Comments</p>
          </div>
          </div>

          <div className='col-span-4 mt-3 '>
          <div className="-ml-28 mb-12 space-y-6 pt-3">
          <textarea type="text" placeholder="Add rating.." className=' placeholder-gray-300 overflow-hidden resize-none w-[20%] h-[40px] font-extralight text-lg text-black -ml-0 pt-3 border-[1px] border-gray-300 p-1' name='overallMgrRating' onChange={handleChangeComments} value={overallValue.overallMgrRating} />
          <textarea type="text" placeholder="Add comment.." className='  placeholder-gray-300 overflow-hidden resize-none w-[100%] h-[130px] font-extralight text-lg text-black -ml-0 pt-1 border-[1px] border-gray-300 p-1' name='overallMgrComments' onChange={handleChangeComments} value={overallValue.overallMgrComments} />

          </div>
          </div>

          {/* WHITE SPACE IN BETWEEN */}
          {/* <div className='col-span-1 mt-3 mb-6'></div> */}

          {/* <div className='col-span-3  mt-3 mb-6 pl-8'>
            <h3 className='pt-6 pr-4 ml-4 mb-10 text-lg '>Performance Rating scale </h3>
            <ul className='pr-4 ml-4 mb-12 -mt-8 space-y-2 text-m font-medium'>
              <li className='text-green-400'>5 - Outstanding</li>
              <li className='text-blue-400'>4 - Above Plan</li>
              <li className='text-blue-900'>3 - Meets Expectations</li>
              <li className='text-yellow-400'>2 - Below Plan</li>
              <li className='text-red-500'>1 - Unsatisfactory</li>
            </ul>

          </div> */}
        </div>
      </div>

      {/* NOW THE THIRD PART STARTS */}

      <div className='mt-4'>

        <div className='flex pb-1 '>
          
          <h1  className='text-lg font-medium text-black pl-5 pt-4 text-left'>Objective Area & KRA / Goals & Objective</h1>
          <h1 className='text-lg font-medium text-black  pt-4 pl-[115px] whitespace-nowrap ml-8 '>Measurement criteria / Target</h1>
          <div className='flex'>
            <div className='flex space-x-3 ml-6 '>
              <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile"></img>
              <h2 className='font-thin text-base  mx-8 pt-3 w-56 flex-col justify-center -ml-0 mt-2 text-blue-500'>{value.empName}</h2>
            </div>
            
            <div className='flex space-x-3 -ml-1'>
              <img src="manager.jpg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Manager"></img>
              <h2 className='font-thin text-base  mx-8 pt-3 w-56 flex-col justify-center -ml-0 mt-2 text-blue-500'>{value.mgrName}</h2>
            </div>
            </div>
        </div>

        {/* A SEPRATING LINE AS PER THE FIGMA DESIGN */}
        <h1 className='border-b-[1px] border-gray-300 ml-4 mr-4 mb-4'></h1>

        {/* we have to divide the grid in 7 parts and then give the devison of col span according */}


{/* THIS IS THE LOGIC OF DISPLAYING THE DATA FROM THE DATABASE FROM THE BACKEND AND THEN WRITING IN THE FRONT END */}

{/* LOGIC FOR DISPLAYING DATA */}

          {/* if there are multiple datas eg 8-9 lines of goals then we have to apply a for loop so that the extra space is generated automatically
          data=20
          data.map(i=>(
            <li>
              <ol>{i.name}</ol>
            </li>
          )) */}

  <div className='grid grid-cols-12 mb-8'>
    <div className='col-span-7'>
    {
  mgrScr &&mgrScr.map((i, index) => (
    <div key={index} className='grid grid-cols-7'>
      
        <div className='col-span-1 -mt-4 '>
          <h2 className='font-extralight text-lg  mx-8 pt-3 justify-center ml-10'>{i.weightage}</h2>
          <p className=' font-extralight text-lg  ml-4 mt-2 text-gray-500'>Weightage</p>
        </div>

        <div className='col-span-3 -mt-4 -ml-8'>
        <div className="ml-4 mb-12">
          <h2 className='font-extralight text-lg  mx-8 pt-3  flex-col justify-center ml-10 '>{i.kra}</h2>
          <div className='font-extralight text-m mt-2 flex-col justify-center ml-10 text-gray-500'>

            {/* THIS IS CALLED AS THE REGEX or REGULAR EXPRESSION */}
            {/* The goal of this code seems to be splitting a string (i.goals) into an array of lines based on a specific pattern using a regular expression. */}
            {i.goals.split(/(?=\d+\.\s)/).map((line, lineIndex) => (
              // THIS PATTERN HAS COME BECAUSE THE DATA WAS ENTERED IN THIS WAY IN THE DATABASE.
              // matches a position in the string where there is a sequence of one or more digits, 
              // followed by a dot, and then followed by whitespace. However, it doesn't consume the actual digits, dot, or whitespace; 
              // it only asserts that they are present at that position.
              // It means that the string is split at positions where the positive lookahead pattern is matched.
              <p key={lineIndex}>{line.trim()}</p>
              // The trim method is used to remove leading and trailing whitespace from each line.

            ))}
          </div>
          </div>
        </div>
        {/* THIS MEASUREMNET CRITERIA IS WRITTEN UNDER THE LOOP ONLY BECAUSE IT WILL BE ACCORDING TO THE KRA and GOALS and under this measurement criteria includes the target and target operator*/}
        <div className='col-span-3  mt-4 flex -space-x-3'>
                    <h2 className='font-extralight text-2xl  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[45px] h-[35px] pl-4'>=</h2>
                    <h2 className='font-extralight text-lg  mx-8  justify-center ml-10 border-[1px] border-gray-300 w-[60px] h-[35px] pl-2 pt-1'>150</h2>
                    </div>
      </div>
    
  ))
}
</div>

<div className='-ml-[120px] -mr-14'>

  {/* THE CONCEPT OF CREATING ONE SEPRATE MAP FUNCTION TO DISPLAY A LIST OF ITEM IS APPLICABLE ONLY WHEN THERE IS AN ARRAY OF ITEMS TO DISPLAY */}
  {/* BUT WHEN THERE IS A OBJECT WE NEED NOT TO CREATE MAP FUNCTION LIKE ABOVE FROM LINE 345-360 WE CAN SIMPLY DO LIKE THIS -value={comments.frdRatings}, value={comments.frdComments} */}

        <div className='col-span-3 -mt-1 space-y-11  ml-10 '>
            <div className='space-y-1'>
                  {/* <h3 className='text-gray-500 text-sm'></h3> */}
                  <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[0]}></input>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[0]}></input>
          </div>

          <div className='space-y-1 '>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[1]}></input>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[1]}></input>
          </div>

          <div className='space-y-1'>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[2]}></input>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[2]}></input>
          </div>

          <div className='space-y-1'>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="input input-bordered w-[25%] h-[30px] max-w-xs  border-gray-200 outline-none text-gray-500 text-sm'" name="frdRatings" onChange={handleChangeComments} value={ratingArr[3]}></input>
              {/* <h3 className='text-gray-500 text-sm'></h3> */}
              <input type="text" className="  overflow-hidden resize-none w-[100%] h-[72px] max-w-full  border-gray-200 outline-none text-gray-500 text-sm'" name="frdComments" onChange={handleChangeComments} value={commentArr[3]}></input>
          </div>

                  {/* NOW THE BUTTONS SECTION- "SUBMIT" "SAVE AS DRAFT" AND "CANCEL" BUTTON */}
                {/* {buttonsVisible && (
        <div className='-ml-1 pt-8 '>
            <div className="grid grid-cols-3 ">
            <div className="col-span-1">
                            <div className='relative'>
                            <button
                className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium"
                onClick={handleSubmit}
                onMouseMove={() => setPopoverVisible1(true)}
                onMouseOut={() => setPopoverVisible1(false)}>Submit</button>
                        {popoverVisible1 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                        {/* Your popover content goes here */}
                        {/* <p className='space-x-4'>Once submitted cannot edit</p>
                            </div>
                        )}
                        </div>
            </div>
            <div className="col-span-1">
            <div className='relative'>
            <button
                className="border-2 border-white bg-gray-500 text-white w-[100px] h-11 rounded-md hover:bg-blue-500 -ml-20 font-medium"
                onClick={handleSubmit}
                onMouseMove={() => setPopoverVisible2(true)}
                onMouseOut={() => setPopoverVisible2(false)}>Save as Draft</button>
                {popoverVisible2 && (
                    <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                {/* Your popover content goes here */}
                {/* <p>You can edit it later</p>
                    </div>
                )}
                </div>
            </div>
                <div className="col-span-1">
                    <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-[158px] font-medium">Cancel</button>
                  </div> */}
            {/* </div>
        </div> */} 
        {/* )} */}

    </div>

</div>

<div className='col-span-3 -mr-[20px]  ml-16 '>
<div className='col-span-3 -mt-1 space-y-3 ml-12'>   
                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating1" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                   
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment1" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating2" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                   
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment2" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className=' h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating3" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                   
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment3" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>

                  <div className='space-y-2'>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''} `}>Rating</h3>
                    </div>
                    
                    <div>
                    <input type="text" placeholder="0.0"
                      className={`input input-bordered w-[35%] h-[30px] max-w-xs outline-none ${submitted ? 'cursor-not-allowed font-medium text-lg bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrRating4" onChange={handleChangeRating1} value={ratingBreak[0]} /> 
                    </div>
                   
                  </div>
                  <div>
                    <div className='h-6'>
                    <h3 className={`text-gray-500 text-sm ${submitted ? 'hidden' : ''}`}>Comments</h3>
                    </div>
                    <div>
                    <textarea type="text" placeholder=""
                      className={`overflow-hidden resize-none w-[95%] h-[65px] outline-none ${submitted ? 'cursor-not-allowed font-extralight  text-gray-500 bg-white' : 'border-[1px] border-gray-200'}`}
                      name="mgrComment4" onChange={handleChangeComment1} value={commentBreak[0]}/>
                      </div>
                  </div>
                  </div>
          </div>

          <div className='-ml-[920px] pb-8'>
                  <h1 className='text-xl font-medium mb-6 pt-12'>Development Goals</h1>

                  <div className='grid grid-cols-8 -space-x-10'>

                    <div className='col-span-2'>
                      <h2 className='text-lg'>Trainings</h2>
                      <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.training}</p>
                    </div>

                    <div className='col-span-2'>
                    <h2 className='text-lg'>Development goals & Plans</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.goal}</p>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.description}</p>

                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Self Assessment</h2>
                    <p className='overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3'>{devGoals.selfAssessment}</p>
                    </div>

                    <div className='col-span-2 '>
                    <h2 className='text-lg'>Manager Assessment</h2>
                    <textarea type="text" placeholder="Enter here" className=' placeholder-gray-400 overflow-hidden resize-none w-[70%] h-[40px] font-extralight text-normal text-gray-500 -ml-0 pt-2 border-[1px] border-gray-300 p-1 mt-3' name='managerAssessment' onChange={handleChangeAddDevelopmentGoals} value={devGoals.managerAssessment}  />
                    </div>
                    
                  </div>

                </div>


                <div className='-ml-1 pt-8  '>
                    <div className="grid grid-cols-2 space-x-5 pt-2">

                    {/* {buttonsVisible} == disable */}

                {count>=0?
                      <div className="col-span-1 ">
                        <div className='relative'>
                          {/* relative is written just to maintain that position between the popover and the button */}
                          <button
                            className="border-2 border-white bg-blue-500 text-white  rounded-md hover:bg-gray-500 w-[100px] h-11 font-medium -ml-16"
                            // onClick={handleSubmit}
                            onClick={()=>{overallRatingAndComment();handleAddDevelopmentGoals();}}
                            onChange={handleChangeComments}
                            onMouseMove={() => setPopoverVisible1(true)}
                            onMouseOut={() => { setPopoverVisible1(false) }}>Submit</button>
                          {popoverVisible1 && (
                            <div className="absolute top-[calc(100%+10px)] left-0 bg-gray-200 p-2 rounded-md shadow-md font-extralight">
                              {/* Your popover content goes here */}
                              <p className='space-x-4'>Once submitted cannot edit</p>
                            </div>
                          )}
                        </div>
                      </div>
                      :"" }
                {count==1?"":
              <>

                      <div className="col-span-1 pl-5 ">
                        <button className="border-2 border-white bg-black text-white rounded-md w-[100px] h-11 -ml-[130px] font-medium">Cancel</button>
                      </div>
                      </>
}

                    </div>
                  </div>

</div>
</div>


          
          {/* <div className='col-span-1  -mt-4 '>
          <div className="ml-4 mb-20">
            <h2 className='font-extralight text-lg  mx-8 pt-3 justify-center ml-10'>30%</h2>
            <p className=' font-extralight text-lg  ml-4 mt-2 text-gray-500'>Weightage</p>
          </div>
          <div className="ml-4 mb-12 mt-8">
            <h2 className='font-extralight text-lg  mx-8 pt-3  flex-col justify-center ml-10 '>Test Case Writing</h2>
            <ol className=' list-decimal font-extralight text-m  mx-8  mt-2 flex-col justify-center ml-10 text-gray-500 '>
              <li>Test case should have test case id.</li>
              <li>Test case should have description.</li>
            </ol>
          </div>
          <div className="ml-4 mb-12 mt-8">
            <h2 className='font-extralight text-lg  mx-8 pt-3  flex-col justify-center ml-10 '>Test Case Writing</h2>
            <ol className=' list-decimal font-extralight text-m  mx-8  mt-2 flex-col justify-center ml-10 text-gray-500 '>
              <li>Test case should have test case id.</li>
              <li>Test case should have description.</li>
            </ol>
          </div> */}

          </div>

          {/* NOW THE RATING AND COMMENTS SECTION and BUTTONS */}
          
          {/* 
          <div className=''>
              <h3 className='text-gray-500 text-sm'>Rating</h3>
              <input type="text" placeholder="0.0" className="input input-bordered w-[15%] h-[30px] max-w-xs border-[1px] border-gray-200 outline-none" />
              <h3 className='text-gray-500 text-sm'>Comments</h3>
              <textarea type="text" placeholder="" className=" overflow-hidden resize-none w-[50%] h-[65px] max-w-full border-[1px] border-gray-200 outline-none" />
          </div>
          <div className=''>
              <h3 className='text-gray-500 text-sm'>Rating</h3>
              <input type="text" placeholder="0.0" className="input input-bordered w-[15%] h-[30px] max-w-xs border-[1px] border-gray-200 outline-none" />
              <h3 className='text-gray-500 text-sm'>Comments</h3>
              <textarea type="text" placeholder="" className=" overflow-hidden resize-none w-[50%] h-[65px] max-w-full border-[1px] border-gray-200 outline-none" />
          </div>
                  {/* NOW THE BUTTONS SECTION- "SUBMIT" "SAVE AS DRAFT" AND "CANCEL" BUTTON */}
                  {/* <div className='space-x-4 pt-8 pb-10'>
                  <button className="border-2 border-white bg-blue-500 text-white w-[100px] h-10 rounded-md hover:bg-gray-500">Submit</button>
                  <button className="border-2 border-white bg-gray-500 text-white w-[100px] h-10 rounded-md hover:bg-blue-500">Save as Draft</button>
                  <button className="border-2 border-white bg-black text-white w-[100px] h-10 rounded-md">Cancel</button>
                  </div>
          </div> */} 

          

        </div>

        
      </div>

  )
}
export default ManagerScreen


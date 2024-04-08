import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CiFilter } from "react-icons/ci";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManagerScreen2() {

    const [value,setValue]=useState([]);

// here i am calling an API for getting the data of the table for displaying the whole data
    useEffect(() => {
        axios.get("http://localhost:8080/api/getByMasterDummy/12")
          .then((response) => setValue(response.data))
          .catch(err => console.log(err))
      }, [])

    //   here the data will be fetched based on the mgrId value means for diffrent mgrId the data will be fetched.
    //in the api WE CAN TAKE MULTIPLE VALUES FOR MGRID LIKE 1214,15,16
    
      console.log(value,"value")
    

    const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log(age);

    // const m = [
    //     { empId: 9085497, name: "Kumar Kartikey Srivastava", desg: "Software developer", workExperience: "2 years 3 months", es: "Pending" },
    //     { empId: 9085413, name: "Piyush Singh", desg: "Android developer", workExperience: "1 years 6 months", es: "Submitted" },
    //     { empId: 9085321, name: "Manpreet Kaur", desg: " Java developer", workExperience: "3 years 2 months", es: "Approved" },
    //     { empId: 9085489, name: "Tamil Selvam", desg: "Frontend developer", workExperience: "5 years 4 months", es: "Not filled" },
    //     { empId: 9085467, name: "Mr. Prometheus", desg: "Backend developer", workExperience: "10 years 4 months", es: "Submitted" }

    // ];

    // THIS IS THE HARD CODED DUMMY DATA

    const columns = [
        {
            name: <div className='text-lg font-medium text-black ml-16'>Employee</div>,
            minWidth: "100px",
            cell: row => (
                <div className='flex mb-2 hover:cursor-pointer' onClick={()=>handleNavigate(row)}>
                    <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile" />
                    <div>
                        <h1 className='text-lg font-normal text-black pl-4 pt-2'><span className='text-blue-600 font-medium'>{row.empCode}</span> <span className='text-blue-600'>-</span> <span className='text-blue-600 font-medium'>{row.empName}</span></h1>
                        <div className='ml-12'>
                            <h3 className='text-lg text-gray-500 -ml-8'>{row.designation}</h3>
                            <h3 className='text-m text-gray-500 -ml-8'>{row.totalWorkPeriod}</h3>
                        </div>
                    </div>
                   
                </div>
            )
        },

        // SO HERE THE LOGIC WHICH I HAVE WRITTEN IS THAT IF THE GOAL IS SUBMITTED ON THE DATE THEN THE STATUS WILL BE SUBMITTED ELSE PENDING IS DISPLAYED.
        // MEANS IN THE BACKEND I HAVE FETCHED THE DATES BUT  IN FRONT END. IT WILL SHOW THE STATUS WITH THE HELP OF TERNARY OPERATIONS
        {
            name: <div className='text-lg font-medium text-black ml-4'>Employee Submit</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4 '>
                    <span className='text-red-500'>{row.goalsSubmittedOn? "Submitted":"Pending"}</span>
                </div>
            )
        },
        {
            name: <div className='text-lg font-medium text-black ml-4 '>Manager Approval</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-gray-600'>{row.goalsReviewedOn? "Submitted":"Pending"}</span>
                </div>
            )
        },
        {
            name: <div className='text-lg font-medium text-black ml-4'>Self Assessment</div>,
            maxWidth: "200px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-red-500'>{row.assessmentSubmittedOn}</span>
                </div>
            )
        },
        {
            name: <div className='text-lg font-medium text-black ml-4 '>Manager Assessment</div>,
            maxWidth: "235px",
            selector: row => (
                <div className='text-lg ml-4'>
                    <span className='text-gray-600'>{row.assessmentReviewedOn}</span>
                </div>
            )
        },
    ];


    const navigate=useNavigate();
    const handleNavigate=(row)=>{
        navigate("/review",{state:{data:row}})
    }
const[filter, setFilter] = useState(false);
  const handleClick = () => {
    // Handle the click event here
    console.log('Filter Button clicked');
    setFilter(!filter);
  }

    return (
        <div className='w-full h-screen bg-gray-200'>
              <checkbox />
            {/* Your content */}
            <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
                <div className='flex'>
                    <h1 className='text-[22px] font-medium text-black pl-12 pt-12'>Appraisee List</h1>
                    <div className='ml-[460px]'>
                        <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter-2</h1>
                        <h3 className='text-m text-gray-500 -ml-8'>01-Apr 2023 to 30-Jun-2023</h3>
                    </div>
                    <div className='mt-12 ml-[460px] text-4xl text-black'>
                    <CiFilter onClick={handleClick} />
                    </div>

    
    {filter && <div className='absolute ml-[1200px] mt-24 z-50 '>
    <div className='border-[2px] border-black bg-gray-100 -ml-24 pb-12  rounded-md  ' value={age} onChange={handleChange}>
        
    <MenuItem value={1}>All</MenuItem>
    <MenuItem value={2}>Pending with Employee</MenuItem>
    <MenuItem value={3}>Pending with Manager</MenuItem>
    
        </div>
</div>}

                </div>

                {/* DataTable Component */}
                <DataTable className='mt-10 ' columns={columns} data={value} selectableRows highlightOnHover striped  />
            </div>
        </div>
    );
}

export default ManagerScreen2;




// import React, { useState } from 'react'
// import { Checkbox } from '@mui/material';
// function ManagerScreen2() {

//     const m=[{empId:9085497,name:"Kumar Kartikey Srivastava",desg:"Software developer",workExperience:"2 years 3 months",image1:"https://unsplash.com/photos/selective-focus-photography-of-man-wearing-nike-dad-hat-hh3ViD0r0Rc"}
//             ,{empId:9085413,name:"Piyush Singh",desg:"Android developer",workExperience:"1 years 6 months"}
//             ,{empId:9085321,name:"Manpreet Kaur",desg:" Java developer",workExperience:"3 years 2 months"}
//             ,{empId:9085489,name:"Tamil Selvam",desg:"Frontend developer",workExperience:"5 years 4 months"}];
//     // here i have taken the data in the form of the array of size 4 for the time being

//   return (


//     <div className='w-full h-screen bg-gray-200'>
//           <checkbox />
//         <div className='bg-white rounded-md relative top-12 ml-4 mr-3 border-[1px] border-blue-400 pb-24'>
//         <div className='flex'>
//           <h1 className='text-[22px] font-medium text-black pl-12 pt-12'>Appraisee List</h1>

//           <div className='ml-[460px]'>
//           <h1 className='text-xl font-normal text-black pl-4 pt-10'>Quarter-2</h1>
//           <h3 className='text-m text-gray-500 -ml-8'>01-Apr 2023 to 30-Jun-2023</h3>
//           </div>

//         </div>

//         {/* THIS IS THE MAIN DIV */}

//         <div className='grid grid-cols-12 mt-12'>
//             <div className='col-span-1 '>
//                 <div className='ml-2'>
//           <Checkbox size="medium" />
//           </div>

//             </div>

//             <div className='col-span-3 '>
//             <h1 className='text-lg font-semibold text-black pl-6 pt-2'>Employee</h1>
//             </div>

//             <div className='col-span-2 '>
//             <h1 className='text-lg font-semibold text-black pl-4 pt-2'>Employee Submit</h1>
//             </div>

//             <div className='col-span-2 '>
//             <h1 className='text-lg font-semibold text-black pl-4 pt-2'>Manager Approval</h1>
//             </div>

//             <div className='col-span-2 '>
//             <h1 className='text-lg font-semibold text-black pl-4 pt-2'>Self Assessement</h1>
//             </div>

//             <div className='col-span-2 '>
//             <h1 className='text-lg font-semibold text-black pl-4 pt-2'>Manager Assessement</h1>
//             </div>

//         </div>
//         {/* this is the seprating line in between the rows of the table */}
//         <h1 className='border-b-[1px] border-gray-300 ml-3 mr-2 mt-2'></h1>


//         <>
//       {m.map((item, index) => (
//         <><div key={index} className='grid grid-cols-12 mt-8'>
//               <div className='col-span-1 '>
//                   <div className='ml-2'>
//                       <Checkbox size="medium" />
//                   </div>
//                   {/* //checkbox from material UI */}
//               </div>

            //   <div className='col-span-3 -ml-12 -mt-5'>
            //     <div className='flex'>
            //     <img src="profile.jpeg" className='rounded-full h-[34px] w-[36px] ml-6 mt-4' alt="Profile"></img>
            //     {/* <img src="manager.jpg" className='rounded-full h-[34px] w-[36px] ml-6  mt-4 ' alt="Manager"></img> */}

            //         <div>
            //             <h1 className='text-lg font-normal text-black pl-4 pt-2'><span className='text-blue-600 font-medium'>{m[index].empId}</span> <span className='text-blue-600'>-</span> <span className='text-blue-600 font-medium'>{m[index].name}</span></h1>
            //             <div className='ml-12'>
            //             <h3 className='text-lg text-gray-500 -ml-8'>{m[index].desg}</h3>
            //             <h3 className='text-m text-gray-500 -ml-8'>{m[index].workExperience}</h3>
            //             </div>
            //         </div>
            //     </div>


            //   </div>

//               <div className='col-span-2 '>
//                   <h1 className='text-lg font-normal text-red-500 pl-4 pt-2'>Pending</h1>
//               </div>

//               <div className='col-span-2 '>
//                   <h1 className='text-lg font-normal text-black pl-4 pt-2'>Submitted</h1>
//               </div>

//               <div className='col-span-2 '>
//                   <h1 className='text-lg font-normal text-black pl-4 pt-2'>Approved</h1>
//               </div>

//               <div className='col-span-2 '>
//                   <h1 className='text-lg font-normal text-black pl-4 pt-2'>Not applied</h1>
//               </div>

//           </div><h1 className='border-b-[1px] border-gray-300 ml-3 mr-2 mt-4'></h1></>

        
//       ))}

//     </>

//         </div>

//     </div>
//   )
// }

// export default ManagerScreen2





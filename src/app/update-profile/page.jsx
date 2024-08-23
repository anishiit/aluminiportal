"use client"
import {React, useState, useEffect } from 'react';
import { ArrowRight, Contact } from 'lucide-react'
import {collegeName} from '/src/data/college.js'
import { stateName } from '@/data/state';
import { batch } from '@/data/batch';
import { branch } from '@/data/branch';
// import userAtom from "/src/atom/userAtom.js";
// import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/navigation'


  
function Page() {
  const router = useRouter();  
    // const setUser = useSetRecoilState(userAtom);
    
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        collegeName: "",
        branch:"",
        state:"",
        batch:"",
        location:"",
        contactNumber:"",
        companyName:"",
        jobTitle:"",
      });
        // Load data from local storage on component mount
  useEffect(() => {
    let savedData;
    if(typeof window !== undefined)
     savedData = localStorage.getItem("user-thread");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setInputs((prevInputs) => ({
        ...prevInputs,
        ...parsedData,
      }));
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

      const handleSignup = async () => {
        console.log(inputs);
      setError("");
        // Check if any field is empty
        if (!inputs.name || !inputs.email || !inputs.password || !inputs.collegeName) {
          
          return; // Exit the function if any field is empty
        }
      
        try {
          const res = await fetch("https://alumini-portal-backend.onrender.com/user/updateprofile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
          });
      
          const data = await res.json();
          console.log(data.user);
          if (!res.ok || data.error) {
            throw new Error(data.error || "Signup failed");
          }
      
          if (typeof window !== 'undefined') {
            window.localStorage.setItem("user-threads", JSON.stringify(data.user));
            // setUser(data.user);
            router.push('../login')
          }
          
          
        } catch (error) {
          console.error(error);
        }
      };
      
      
    // const [colleges, setColleges] = useState([]);

    // useEffect(() => {
    //   // Fetch the colleges from the JSON file
    //   const fetchColleges = async () => {
    //     const res = await fetch('/src/data/college.json');
    //     const data = await res.json();
    //     setColleges(data);
    //   };
  
    //   fetchColleges();
    // }, []);
  
   
  


  return (
    <div>
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src='https://picsum.photos/200'
            className='md:w-40 md:h-40 h-20 w-20 rounded-full ' />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Update your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Kr do sir update😎{' '}
            <a
              href="../profile/:user_id"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Go to Profile
            </a>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
            <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Enter Your Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="name"
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										value={inputs.name}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    value={inputs.email}
                  ></input>
                </div>
              </div>
             
              <div>
               
                <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                <select 
  onChange={(e) => setInputs({ ...inputs, collegeName: e.target.value })} 
  className="w-full"
  value={inputs.collegeName} // Bind the select element to the state
>
  <option value="">Select College</option>
  {collegeName.map((college, index) => (
    <option key={index} value={college}>
      {college}
    </option>
  ))}
</select>

                </div>
              </div>
              <div>
               
               <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
               <select 
 onChange={(e) => setInputs({ ...inputs, state: e.target.value })} 
 className="w-full"
 value={inputs.state} // Bind the select element to the state
>
 <option value="">Select State</option>
 {stateName.map((state, index) => (
   <option key={index} value={state}>
     {state}
   </option>
 ))}
</select>

               </div>
             </div>
             <div>
               
               <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
               <select 
                onChange={(e) => setInputs({ ...inputs, branch: e.target.value })} 
                   className="w-full"
                value={inputs.branch} // Bind the select element to the state
                         >
                  <option value="">Select Branch</option>
            {branch.map((branch, index) => (
           <option key={index} value={branch}>
                {branch}
                     </option>
 ))}
</select>

               </div>
             </div>
             <div>
               
               <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
               <select 
 onChange={(e) => setInputs({ ...inputs, batch: e.target.value })} 
 className="w-full"
 value={inputs.batch} // Bind the select element to the state
>
 <option value="">Batch</option>
 {batch.map((college, index) => (
   <option key={index} value={college}>
     {college}
   </option>
 ))}
</select>

               </div>
             </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Location{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="name"
                    onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
										value={inputs.location}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Contact Number{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="contact number"
                    onChange={(e) => setInputs({ ...inputs, contactNumber: e.target.value })}
										value={inputs.contactNumber}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Location{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="name"
                    onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
										value={inputs.location}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Company Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Company Name"
                    onChange={(e) => setInputs({ ...inputs, companyName: e.target.value })}
										value={inputs.companyName}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Position{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Job-Title"
                    onChange={(e) => setInputs({ ...inputs, jobTitle: e.target.value })}
										value={inputs.jobTitle}
                  ></input>
                </div>
              </div>
              <div>
              
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleSignup}>
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
          
          
          </div>
        </div>
      </div>
    </section>


    </div>
  )
}

export default Page




"use client"

import { useState, useEffect } from "react"
import { ArrowRight, User, Mail, Briefcase, Building, MapPin, Phone, Linkedin, Github } from "lucide-react"
import axios from 'axios'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// importing urls
import { getUserInfoUrl, updateUserProfileUrl} from "@/urls/urls.js"

// Import your data arrays here
import { collegeName } from '@/data/college'
import { stateName } from '@/data/state'
import { batch } from '@/data/batch'
import { branch } from '@/data/branch'

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    collegeName: "",
    branch: "",
    state: "",
    batch: "",
    location: "",
    contactNumber: "",
    companyName: "",
    jobTitle: "",
    userId: "",
    linkedin: "",
    github: "",
    bio: "",
    skills: []
  })

  useEffect(() => {
    fetchUser()
  }, [])

  function fetchUser() {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user-threads"))
      if (userData) {
        setUser(userData)
        setInputs({
          name: userData.name || "",
          email: userData.email || "",
          collegeName: userData.collegeName || "",
          branch: userData.branch || "",
          state: userData.state || "",
          batch: userData.batch || "",
          location: userData.location || "",
          contactNumber: userData.contactNumber || "",
          companyName: userData.companyName || "",
          jobTitle: userData.jobTitle || "",
          userId: userData._id || "",
          linkedin: userData.linkedin || "",
          github: userData.github || "",
          bio: userData.bio || "",
          skills: userData.skills || []
        })
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(updateUserProfileUrl, inputs)
      console.log(response.data)
      await getUser()
  
    } catch (error) {
      console.error(error)
  
    } finally {
      setIsLoading(false)
    }
  }

  async function getUser() {
    try {
      const response = await axios.post(getUserInfoUrl, { userId: inputs.userId })
      if (typeof window !== 'undefined') {
        localStorage.setItem("user-threads", JSON.stringify(response.data.user))
      }
      console.log(response.data.user)
      fetchUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold">Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            Update your profile information{' '}
            <Link
              href={`/profile/${user?._id}`}
              className="font-semibold text-primary transition-all duration-200 hover:underline"
            >
              Go to Profile
            </Link>
          </p>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional Info</TabsTrigger>
              <TabsTrigger value="social">Social & Skills</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TabsContent value="personal">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        className="pl-10"
                        placeholder="Your full name"
                        value={inputs.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        className="pl-10"
                        placeholder="Your email address"
                        value={inputs.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
                    <Select name="collegeName" value={inputs.collegeName} onValueChange={(value) => handleChange({ target: { name: 'collegeName', value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select College" />
                      </SelectTrigger>
                      <SelectContent>
                        {collegeName.map((college, index) => (
                          <SelectItem key={index} value={college}>
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
                      <Select name="branch" value={inputs.branch} onValueChange={(value) => handleChange({ target: { name: 'branch', value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branch.map((b, index) => (
                            <SelectItem key={index} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch</label>
                     <Select name="batch" value={inputs.batch} onValueChange={(value) => handleChange({ target: { name: 'batch', value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batch.map((batch, index) => (
                            <SelectItem key={index} value={batch}>
                              {batch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="professional">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Current Position</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        className="pl-10"
                        placeholder="Your current job title"
                        value={inputs.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="pl-10"
                        placeholder="Your company name"
                        value={inputs.companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Input
                          type="text"
                          name="location"
                          id="location"
                          className="pl-10"
                          placeholder="Your location"
                          value={inputs.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <Input
                          type="tel"
                          name="contactNumber"
                          id="contactNumber"
                          className="pl-10"
                          placeholder="Your phone number"
                          value={inputs.contactNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <div className="mt-1">
                      <Textarea
                        name="bio"
                        id="bio"
                        rows={3}
                        className="resize-none"
                        placeholder="Tell us a little bit about yourself"
                        value={inputs.bio}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="social">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Linkedin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="url"
                        name="linkedin"
                        id="linkedin"
                        className="pl-10"
                        placeholder="Your LinkedIn profile URL"
                        value={inputs.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <Input
                        type="url"
                        name="github"
                        id="github"
                        className="pl-10"
                        placeholder="Your GitHub profile URL"
                        value={inputs.github}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                    <Input
                      type="text"
                      name="skills"
                      id="skills"
                      placeholder="Add skills (comma-separated)"
                      value={inputs.skills.join(',   ')}
                      onChange={(e) => setInputs(prev => ({ ...prev, skills: e.target.value.split(',').map(skill => skill.trim()) }))}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter your skills separated by commas (e.g., Machine Learning, Cloud Computing, Data Science)
                    </p>
                  </div>
                </div>
              </TabsContent>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>Updating... <ArrowRight className="ml-2 h-4 w-4 animate-spin" /></>
                ) : (
                  <>Update profile <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
// "use client"
// import {React, useState, useEffect } from 'react';
// import { ArrowRight, Contact } from 'lucide-react'
// import {collegeName} from '/src/data/college.js'
// import { stateName } from '@/data/state';
// import { batch } from '@/data/batch';
// import { branch } from '@/data/branch';
// // import userAtom from "/src/atom/userAtom.js";
// // import { useSetRecoilState } from 'recoil';

// import { useRouter } from 'next/navigation'
// import axios from 'axios';
// import Link from 'next/link';


  
// function Page() {
//   const router = useRouter();  
//     // const setUser = useSetRecoilState(userAtom);
//     const [error,setError] = useState("")
    
//     // const userId = 
    
//     const [inputs, setInputs] = useState({
//         name: "",
//         email: "",
//         collegeName: "",
//         branch:"",
//         state:"",
//         batch:"",
//         location:"",
//         contactNumber:"",
//         companyName:"",
//         jobTitle:"",
//         userId:""
//       });
//       function fetchUser(){
//         let user;
//         if(typeof window !== undefined){
//           user = JSON.parse(localStorage.getItem("user-threads"))
//         }
//         console.log(user);
//         if(!user) return;

//         console.log(user);
//         // setInputs(user);
//         setInputs({
//           name:user.name,
//           email:user.email,
//           collegeName:user.collegeName,
//           branch:user.branch,
//           state:user.state,
//           batch:user.batch,
//           location:user.location,
//           contactNumber:user.contactNumber,
//           companyName:user.companyName,
//           jobTitle:user.jobTitle,
//           userId:user._id
//         })
      
//       }
//       const [user ,setUser]=useState(undefined);
//         // Load data from local storage on component mount
//   useEffect(() => {
//     if(typeof window !== undefined){
//       const usr =JSON.parse(localStorage.getItem("user-threads"));
//     if(usr) {
//       setUser(usr);
//     }

//     }
//    fetchUser();
//   }, []);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prevInputs) => ({
//       ...prevInputs,
//       [name]: value,
//     }));
//   };

//       async function getUser(){
//         try {
//           await axios.post("https://alumini-portal-backend.onrender.com/user/getuser",{userId:inputs.userId})
//           .then((res) => {
//             console.log(res.data);
//             if(typeof window !== undefined){
//               localStorage.setItem("user-threads",JSON.stringify(res.data.user))
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           })
//         } catch (error) {
//           console.log(error)
//         }
//       }
//       const handleSignup = async (e) => {
//         console.log("updating profile...")
//         e.preventDefault();
//         console.log(inputs);
//          setError("");
      
//         try {
//           await axios.post("https://alumini-portal-backend.onrender.com/user/updateprofile",inputs)
//           .then((res) => {
//             console.log(res.data);
//             getUser();
//           })
//           .catch((err) => {
//             console.log(err)
//           })    
          
//         } catch (error) {
//           console.error(error);
//         }
//       };
      
  
   
  


//   return (
//     <div>
//     <section>
//       <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
//         <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//           <div className="mb-2 flex justify-center">
//             <img src='https://picsum.photos/200'
//             className='md:w-40 md:h-40 h-20 w-20 rounded-full ' />
//           </div>
//           <h2 className="text-center text-2xl font-bold leading-tight text-black">
//             Update your Profile
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600 ">
//             Kr do sir update😎{' '}
//             <Link
//               href={`/profile/${user?._id}`}
//               title=""
//               className="font-semibold text-black transition-all duration-200 hover:underline"
//             >
//               Go to Profile
//             </Link>
//           </p>
//           <form onSubmit={handleSignup} method="POST" className="mt-8">
//             <div className="space-y-5">
//             <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Enter Your Name{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="name"
//                     onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
// 										value={inputs.name}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Email address{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="Email"
//                     onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                     value={inputs.email}
//                   ></input>
//                 </div>
//               </div>
             
//               <div>
               
//                 <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
//                 <select 
//   onChange={(e) => setInputs({ ...inputs, collegeName: e.target.value })} 
//   className="w-full"
//   value={inputs.collegeName} // Bind the select element to the state
// >
//   <option value="">Select College</option>
//   {collegeName.map((college, index) => (
//     <option key={index} value={college}>
//       {college}
//     </option>
//   ))}
// </select>

//                 </div>
//               </div>
//               <div>
               
//                <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
//                <select 
//  onChange={(e) => setInputs({ ...inputs, state: e.target.value })} 
//  className="w-full"
//  value={inputs.state} // Bind the select element to the state
// >
//  <option value="">Select State</option>
//  {stateName.map((state, index) => (
//    <option key={index} value={state}>
//      {state}
//    </option>
//  ))}
// </select>

//                </div>
//              </div>
//              <div>
               
//                <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
//                <select 
//                 onChange={(e) => setInputs({ ...inputs, branch: e.target.value })} 
//                    className="w-full"
//                 value={inputs.branch} // Bind the select element to the state
//                          >
//                   <option value="">Select Branch</option>
//             {branch.map((branch, index) => (
//            <option key={index} value={branch}>
//                 {branch}
//                      </option>
//  ))}
// </select>

//                </div>
//              </div>
//              <div>
               
//                <div className="mt-2 w-full flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
//                <select 
//  onChange={(e) => setInputs({ ...inputs, batch: e.target.value })} 
//  className="w-full"
//  value={inputs.batch} // Bind the select element to the state
// >
//  <option value="">Batch</option>
//  {batch.map((college, index) => (
//    <option key={index} value={college}>
//      {college}
//    </option>
//  ))}
// </select>

//                </div>
//              </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Location{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="name"
//                     onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
// 										value={inputs.location}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Contact Number{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="number"
//                     placeholder="contact number"
//                     onChange={(e) => setInputs({ ...inputs, contactNumber: e.target.value })}
// 										value={inputs.contactNumber}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Company Name{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="Company Name"
//                     onChange={(e) => setInputs({ ...inputs, companyName: e.target.value })}
// 										value={inputs.companyName}
//                   ></input>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="" className="text-base font-medium text-gray-900">
//                   {' '}
//                   Position{' '}
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                     type="text"
//                     placeholder="Job-Title"
//                     onChange={(e) => setInputs({ ...inputs, jobTitle: e.target.value })}
// 										value={inputs.jobTitle}
//                   ></input>
//                 </div>
//               </div>
//               <div>
              
//                 <button
//                   type="submit"
//                   className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                   onClick={handleSignup}>
//                   Get started <ArrowRight className="ml-2" size={16} />
//                 </button>
//               </div>
//             </div>
//           </form>
//           <div className="mt-3 space-y-3">
          
          
//           </div>
//         </div>
//       </div>
//     </section>


//     </div>
//   )
// }

// export default Page



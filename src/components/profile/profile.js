"use client"
import Image from 'next/image';
import { useState,useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { createUserInvitationUrl, getUserInfoUrl } from '@/urls/urls';

import { useRouter } from 'next/navigation'
import './profileBtn.css'
import Navbar2 from '../header/Navbar2';
const Profile = ({ user }) => {
  const router = useRouter(); 
  const [connect, setConnect] = useState(user.isFollowing);

  const location = usePathname(); 
  const userId = location.substring(9);
  const [usr, setUsr] = useState({});
  const [err, setErr] = useState("");
  const [iscurrent, setcurrent] = useState(undefined);
   
    // Logic to handle follow request
    const handleFollow = async () => {
      let user;
      if(typeof window !== undefined)
        user = JSON.parse(localStorage.getItem("user-threads"))
      // if(userId === user._id){
      //   setcurrent(true);
      // }
        setConnect(!connect);
        await axios.post(createUserInvitationUrl , {
          toUserId:usr._id,
          fromUserId:user._id,
        })
        .then((res) => {
          console.log(res.data);

        })
        .catch((err) => {
          console.log(err);
        })
    };

    async function getUser(){
      try {
        await axios.post(getUserInfoUrl,{userId:userId})
        .then((res) => {
          // console.log(res.data);
          setUsr(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          setErr(err.response.data.msg);
        })
      } catch (error) {
        console.log(error)
      }
    }

  const handleMessage = () => {
    // Logic to open a messaging interface
  };

  const handleDonate = () => {
    // Logic to handle donation (e.g., open a payment gateway)
  };
  useEffect(() => {
      let user;
      if(typeof window !== undefined)
        user = JSON.parse(localStorage.getItem("user-threads"))
      if(userId === user._id){
        setcurrent(true);
      }
    console.log(userId)
    getUser();
  },[])

  return (
    <div>
    <Navbar2 />
   <div className='flex justify-center'>
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {usr?.name} <ArrowUpRight className="ml-2 h-4 w-4" />
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Macbook
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Apple
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Laptop
            </span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
          {
            iscurrent === true ? (
              <button onClick={()=>{router.push('/donation')}} className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Donate
              </button>
            ) : (
              <button onClick={handleFollow}
               className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                {connect ? 'Send Messege' : 'Connect'}
              </button>
            )
          }
    <button class="Btn" onClick={() => router.push('/update-profile')}   > Update Profile 
      <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button>
          </div>
        </div>
      </div>
    </div>
  


    </div>
    </div>
  );
};

export default Profile;

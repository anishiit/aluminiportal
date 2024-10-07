'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar2 from '@/components/header/Navbar2';

export default function ContactPageOne() {

    const url = "https://alumini-portal-backend.onrender.com/post/postjob";
  
    const [input , setInput] = useState({
        title:"",
        description:"",
        category:"",
        url:"",
    });

    const [thumbnail ,setThumbnail] = useState(undefined);
    const [msg,setmsg] = useState("");
    const [err,seterr] = useState("");



    async function handleSubmit(e){
        e.preventDefault();
        seterr("")
        setmsg("Posting..")
        console.log("posting job")
        let user;
        if(typeof window !== undefined){
            user = JSON.parse(localStorage.getItem("user-threads"))
        }
           if(!user) {
            alert("Please login to post a job")
            return;
           }
           console.log(user);
        const form = new FormData()
        form.append("thumbnail" , thumbnail)
        form.append("postedBy" , user._id)
        form.append("postedByName" , user.name)
        form.append("title" , input.title)
        form.append("description" , input.description)
        form.append("category" , input.category)
        form.append("url" , input.url)
        
        console.log(form.get("thumbnail"));
        try {
            await axios.post(url,form)
            .then((res) => {
                console.log(res.data);
                setInput({
                  title:"",
                  description:"",
                  category:"",
                  url:"",
                })
                setThumbnail({});
                setmsg(String(res.data.msg).toUpperCase());
                setInput({})
                setThumbnail({})
            })
            .catch((err) => {
                console.log(err);
                setmsg("")
                seterr(err.response.data.message);
            })
        } catch (error) {
            console.log(error)
            setmsg("")
            seterr(error.message);
        }
    }



  return (
    <div>
      <Navbar2 />
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-5 pt-10 md:pt-16 outline-none">
          <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              Share your Job Post
            </p>
          </div>
        </div>
        <div className="grid items-center justify-items-center mx-auto max-w-7xl py-12 md:py-14">
            {/* contact from */}
            <div className="flex w-full flex-col items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl w-full font-bold text-gray-900 md:text-4xl">Post</p>
                {/* <p className="mt-4 text-lg text-gray-600">
                  Our friendly team would love to hear from you.
                </p> */}


                <form onSubmit={handleSubmit} className="mt-8 space-y-4  md:w-[500px] w-[350px]">
                  <div className="grid w-full items-center gap-1.5">

                    <p className='text-blue-700 text-center text-lg font-semibold '>{msg}</p>

                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={input.title}
                        onChange={(e) => {
                            setInput({...input,title:e.target.value})
                        }}
                      />
                  </div>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="description"
                      value={input.description}
                      placeholder="Description"
                      onChange={(e) => {
                        setInput({...input,description:e.target.value})
                      }}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="thumbnail"
                    >
                      Thumbnail
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="file"
                      id="thumbnail"
                      placeholder=""
                      onChange={(e) => {
                        console.log(e.target.files[0])
                        setThumbnail(e.target.files[0])
                       }}
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5 text-black">
                  <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="thumbnail"
                    >
                      Category
                    </label>
                    <select
                      className="flex text-black h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      value={input.category}
                      onChange={(e) => {
                        setInput({...input,category:e.target.value})
                       }}
                    >
                        <option className='text-black dark:text-gray-300' value="">Select Category</option>
                        <option className='text-black dark:text-gray-300' value="SDE1">SDE1</option>
                        <option className='text-black dark:text-gray-300' value="SDE2">SDE2</option>
                        <option className='text-black dark:text-gray-300' value="SDE3">SDE3</option>
                    </select>
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="url"
                      >
                        Url
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="url"
                        id="url"
                        placeholder="url"
                        value={input.url}
                        onChange={(e) => {
                            setInput({...input,url:e.target.value})
                        }}
                      />
                  </div>
                  <p className='text-red-500 text-center text-lg font-semibold'>{err}</p>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Post
                  </button>
                </form>

              </div>
            </div>
        </div>
      </div>
      <hr />
    </div>
  )
}
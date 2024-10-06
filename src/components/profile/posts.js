import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CardTwo() {
  const location = usePathname()
  const userId = location.substring(9);

  const [userPosts , setPosts] = useState([]);

   async function getUserPosts(){
    if(typeof window !== undefined){
      const allPosts = JSON.parse(localStorage.getItem("posts"));
      console.log(allPosts)
      const usrPosts = allPosts?.filter(post => post.postedBy.includes(userId));
      console.log(usrPosts);
      setPosts(usrPosts);
   }
   }

   useEffect(() => {
    if(userId){
      getUserPosts();
    }
   },[])

  return (<>
    <div>
    <h5 className='font-semibold p-3 text-center'>Posts</h5>
    </div>
    <div className='w-full max-h-full flex flex-wrap gap-3 p-3'>
      {
        userPosts?.map((post) => {
          return (
            <>
            <div className="w-[300px] rounded-md border">
              <img
                src={post?.thumbnail}
                alt="post thumbnail"
                className="h-[200px] w-full rounded-md object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold">{post?.title}</h1>
                <Link href={post?.url}>
                <p className="mt-3 text-sm text-blue-600">
                 {post?.url}
                </p>
                </Link>
                <p className="mt-3 text-sm text-gray-600">
                 {post?.description}
                </p>
                {/* <button
                  type="button"
                  className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  update
                </button> */}
              </div>
            </div>
            </>
          )
        })

      }
    </div>
    </>
  )
}
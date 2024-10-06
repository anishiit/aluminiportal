'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { getAllPostsUrl } from "@/urls/urls"

const JobPostsPage = async () => {

    const getJobPostUrl = getAllPostsUrl

    const menuItems = [
        {
            name: 'Home',
            href: '#',
        },
        {
            name: 'About',
            href: '#',
        },
        {
            name: 'Contact',
            href: '#',
        },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [posts, setPostData] = useState(Array());
    

    async function getPostData() {
        try {
            await axios.get(getJobPostUrl)
                .then((res) => {
                    console.log(res.data.jobs)
                    setPostData(res.data.jobs);
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("posts", JSON.stringify(res.data.jobs))
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    useEffect(() => {
        getPostData();
    }, [])

    return (
        <div>
            <div className="mx-auto max-w-7xl px-2">
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                        Resources and insights
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
                        neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
                    </p>
                    <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
                    <select
                        className=" w-72 h-10 border-[1px] rounded-md"
                        name="" id="" placeholder="Search Category"
                    >
                        <option value="">Select Category</option>
                        <option className="" value="one">one</option>
                    </select>
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
                    <div className="flex w-full items-end border-b border-gray-300">
                        {['Design', 'Product', 'Software Engineering', 'Customer Success'].map(
                            (filter, index) => (
                                <div
                                    className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
                                    key={filter}
                                >
                                    {filter}
                                </div>
                            )
                        )}
                    </div>
                </div>
                {/* posts */}
                <div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice().reverse().map((post) => (
    <div key={post?.title} className="border">
        <img src={post?.thumbnail} className="aspect-video w-full rounded-md" alt="" />
        <div className="min-h-min p-3">
            <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
                #{post?.category}
            </p>
            <p className="mt-4 flex-1 text-base font-semibold text-gray-900">{post?.title}</p>
            <p className="mt-4 w-full text-sm leading-normal text-gray-600">
                {post?.description}
            </p>
            <Link href={`/profile/${post.postedBy}`}>
                <div className="mt-4 flex space-x-3">
                    <img className="h-full w-10 rounded-lg" src={post?.userImg || "https://picsum.photos/200"} alt={post?.postedByName} />
                    <div>
                        <p className="text-base font-semibold leading-tight text-gray-900">
                            {post?.postedByName}
                        </p>
                    </div>  
                </div>
            </Link>
        </div>
    </div>
))}

                </div>
            </div>
            <div className="mx-auto mt-12 max-w-7xl bg-gray-50">

            </div>
        </div>
    )
}

export default JobPostsPage

"use client"
import axios from "axios"
import Link from "next/link"
import { getAllPostsUrl } from "@/urls/urls"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Calendar, Bookmark, MessageCircle, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar2 from "@/components/header/Navbar2"

export default function SearchJob() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("all")

  const getJobPostUrl = getAllPostsUrl
  async function getPostData() {
            try {
                await axios.get(getJobPostUrl)
                    .then((res) => {
                        console.log(res.data.jobs)
                        setJobs(res.data.jobs);
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("posts", JSON.stringify(res.data.jobs))
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }

            useEffect(() => {
        getPostData();
    }, [])

//   useEffect(() => {
//     const dummyJobs = [
//       {
//         id: 1,
//         title: "Senior Software Engineer",
//         company: "Tech Innovators",
//         location: "San Francisco, CA",
//         postedBy: "John Doe",
//         postedByAvatar: "/placeholder.svg?height=100&width=100",
//         companyLogo: "/placeholder.svg?height=400&width=400",
//         description: "We are seeking a talented senior software engineer to lead our cutting-edge projects...",
//         postedDate: "2023-06-15",
//         likes: 245,
//         comments: 37,
//         type: "job",
//       },
//       {
//         id: 2,
//         title: "Data Science Intern",
//         company: "Data Dynamics",
//         location: "New York, NY",
//         postedBy: "Jane Smith",
//         postedByAvatar: "/placeholder.svg?height=100&width=100",
//         companyLogo: "/placeholder.svg?height=400&width=400",
//         description: "Join our team as a data science intern to gain hands-on experience in machine learning...",
//         postedDate: "2023-06-10",
//         likes: 189,
//         comments: 28,
//         type: "internship",
//       },
//       {
//         id: 3,
//         title: "UX/UI Designer",
//         company: "Creative Solutions",
//         location: "Seattle, WA",
//         postedBy: "Mike Johnson",
//         postedByAvatar: "/placeholder.svg?height=100&width=100",
//         companyLogo: "/placeholder.svg?height=400&width=400",
//         description: "We're looking for a creative UX/UI designer to help shape the future of our products...",
//         postedDate: "2023-06-05",
//         likes: 312,
//         comments: 52,
//         type: "job",
//       },
//     ]
//     setJobs(dummyJobs)
//   }, [])

  const filteredJobs = jobs.filter((job) =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (jobType === "all" || job.type === jobType)
  )

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const typeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar2 />
    <div className="container mx-auto p-4 max-w-6xl">
   
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-6">Find Your Dream</h1>
        <motion.div
          variants={typeVariants}
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          {jobType === "internship" ? "Internship" : "Job"}
        </motion.div>
      </motion.div>
      <div className="max-w-2xl mx-auto space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for jobs, companies, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-lg"
          />
        </div>
        <RadioGroup
          defaultValue="all"
          name="jobType"
          className="flex justify-center space-x-4"
          onValueChange={setJobType}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="job" id="job" />
            <Label htmlFor="job">Jobs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="internship" id="internship" />
            <Label htmlFor="internship">Internships</Label>
          </div>
        </RadioGroup>
      </div>
      <AnimatePresence>
        {filteredJobs.slice().reverse().map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3">
                    <img
                      src={job.thumbnail}
                      alt={`${job.company} banner`}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                      <Link href={`/profile/${job.postedBy}`}>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={job.postedByAvatar} alt={job.postedBy} />
                          <AvatarFallback>{job.postedBy[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{job?.postedByName}</p>
                          <p className="text-sm text-gray-500">{job.company}</p>
                        </div>
                        </Link>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <MessageCircle className="w-5 h-5 mr-1" />
                          {job.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Share2 className="w-5 h-5 mr-1" />
                          Share
                        </Button>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    </div>
  )
}





// 'use client'

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Link from "next/link"
// import { getAllPostsUrl } from "@/urls/urls"

// const JobPostsPage = async () => {

//     const getJobPostUrl = getAllPostsUrl

//     const menuItems = [
//         {
//             name: 'Home',
//             href: '#',
//         },
//         {
//             name: 'About',
//             href: '#',
//         },
//         {
//             name: 'Contact',
//             href: '#',
//         },
//     ]

//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const [posts, setPostData] = useState(Array());
    

//     async function getPostData() {
//         try {
//             await axios.get(getJobPostUrl)
//                 .then((res) => {
//                     console.log(res.data.jobs)
//                     setPostData(res.data.jobs);
//                     if (typeof window !== "undefined") {
//                         window.localStorage.setItem("posts", JSON.stringify(res.data.jobs))
//                     }
//                 })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen)
//     }


//     useEffect(() => {
//         getPostData();
//     }, [])

//     return (
//         <div>
//             <div className="mx-auto max-w-7xl px-2">
//                 <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
//                     <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
//                         Resources and insights
//                     </p>
//                     <p className="max-w-4xl text-base text-gray-600 md:text-xl">
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
//                         neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
//                     </p>
//                     <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
//                     <select
//                         className=" w-72 h-10 border-[1px] rounded-md"
//                         name="" id="" placeholder="Search Category"
//                     >
//                         <option value="">Select Category</option>
//                         <option className="" value="one">one</option>
//                     </select>
//                         <button
//                             type="button"
//                             className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                         >
//                             Search
//                         </button>
//                     </div>
//                 </div>
//                 <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
//                     <div className="flex w-full items-end border-b border-gray-300">
//                         {['Design', 'Product', 'Software Engineering', 'Customer Success'].map(
//                             (filter, index) => (
//                                 <div
//                                     className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
//                                     key={filter}
//                                 >
//                                     {filter}
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </div>
//                 {/* posts */}
//                 <div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
//                 {posts.slice().reverse().map((post) => (
//     <div key={post?.title} className="border">
//         <img src={post?.thumbnail} className="aspect-video w-full rounded-md" alt="" />
//         <div className="min-h-min p-3">
//             <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
//                 #{post?.category}
//             </p>
//             <p className="mt-4 flex-1 text-base font-semibold text-gray-900">{post?.title}</p>
//             <p className="mt-4 w-full text-sm leading-normal text-gray-600">
//                 {post?.description}
//             </p>
//             <Link href={`/profile/${post.postedBy}`}>
//                 <div className="mt-4 flex space-x-3">
//                     <img className="h-full w-10 rounded-lg" src={post?.userImg || "https://picsum.photos/200"} alt={post?.postedByName} />
//                     <div>
//                         <p className="text-base font-semibold leading-tight text-gray-900">
//                             {post?.postedByName}
//                         </p>
//                     </div>  
//                 </div>
//             </Link>
//         </div>
//     </div>
// ))}

//                 </div>
//             </div>
//             <div className="mx-auto mt-12 max-w-7xl bg-gray-50">

//             </div>
//         </div>
//     )
// }

// export default JobPostsPage
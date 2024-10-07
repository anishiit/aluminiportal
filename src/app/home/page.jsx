"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Calendar,  LayoutDashboard, LogOut, Mail, Menu, User, Users, X , GraduationCap,Briefcase, Search } from "lucide-react"
import { useRouter} from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AlumniHome() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: "Messages", href: "#messages", icon: <Mail className="h-4 w-4 mr-2" /> },
    { name: "Events", href: "#events", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { name: "Alumni", href: "#alumni", icon: <Users className="h-4 w-4 mr-2" /> },
    { name: "Get Involved", href: "#get-involved", icon: <Bell className="h-4 w-4 mr-2" /> },
    { name: "Profile", href: "#profile", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Post Job", href: "/postjob",  external: true , icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: "Search Job", href: "/jobposts", external: true , icon: <Search className="h-4 w-4 mr-2" /> },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute("id")

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add("text-blue-600")
          } else {
            document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove("text-blue-600")
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


//geting user info 
const [userData, setUserData] = useState({ collegeName: '', name: '' });
useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('user-threads'));
  if(user){
    const {collegeName ,name} = user;

    setUserData({collegeName , name});
  }

},[])

//logout 
const router = useRouter();
const handleLogout =  (e) => {
  e.preventDefault();
  try {
    if(typeof window !== undefined){
     localStorage.clear();
    
     router.push('/')
    }   
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl text-black">{userData.collegeName}</span>
          </Link>
       
          <nav className="hidden md:flex gap-6">
    {navItems.map((item) => (
      item.external ? (
        // For external links, directly use the Link component without <a> tag
        <Link key={item.name} href={item.href} className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center">
          {item.icon}
          {item.name}
        </Link>
      ) : (
        // For internal scroll links, keep the original logic
        <a
          key={item.name}
          href={item.href}
          className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.href);
          }}
        >
          {item.icon}
          {item.name}
        </a>
      )
    ))}
  </nav>

          <div className="flex items-center gap-4">
            {/* <Avatar>
              <AvatarImage src="/image/profileLogo.png" alt="Alumnus" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar> */}
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-2xl text-black">Menu</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      {/* <X className="h-6 w-6" /> */}
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    item.external ?(
                      <SheetClose asChild key={item.name}>
                      <Link key={item.name} href={item.href} className="text-2xl font-semibold hover:text-blue-600 transition-colors flex items-center">
                        {item.icon}
                          {item.name}
                        </Link> 
                       </SheetClose>
                    ):( 
                       <SheetClose asChild key={item.name}>
                    
                      <a
                        href={item.href}
                        className="text-2xl font-semibold hover:text-blue-600 transition-colors flex items-center"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                      >
                        {item.icon}
                        {item.name}
                      </a>
                    </SheetClose>)
                  
                  ))}
                </nav>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button size="lg" onClick={handleLogout} className="w-full" variant="outline">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section id="dashboard" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome, {userData.name}!
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-zinc-200">
                Stay connected with your alma mater and fellow alumni. Explore the latest updates and opportunities.
              </p>
            </div>
          </div>
        </section>
        <section id="messages" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Messages</h2>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Messages</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="/image/profileLogo.png" alt="Prof. Sharma" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Prof. Sharma</p>
                      <p className="text-sm text-gray-500">Re: Guest Lecture Invitation</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="/image/profileLogo.png" alt="Alumni Association" />
                      <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alumni Association</p>
                      <p className="text-sm text-gray-500">Annual Meet Announcement</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="/image/profileLogo.png" alt="Placement Cell" />
                      <AvatarFallback>PC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Placement Cell</p>
                      <p className="text-sm text-gray-500">Job Opportunity for Alumni</p>
                    </div>
                  </li>
                </ul>
                <Button className="mt-6 w-full">View All Messages</Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="events" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Annual Alumni Meet 2024"
                date="August 15-17, 2024"
                description="Join us for three days of networking, knowledge sharing, and nostalgia on the IIT Dhanbad campus."
                image="/image/event1.jpeg"
              />
              <EventCard
                title="Tech Symposium"
                date="September 5, 2024"
                description="A day-long event featuring talks from distinguished alumni in various tech fields."
                image="/image/event2.jpeg"
              />
              <EventCard
                title="Career Fair for Current Students"
                date="October 10, 2024"
                description="An opportunity for alumni to recruit top talent from their alma mater."
                image="/image/event3.jpeg"
              />
            </div>
          </div>
        </section>
        <section id="alumni" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Alumni</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AlumniCard
                name="Dr. Priya Verma"
                class="2005"
                position="AI Research Scientist, Google"
                image="/image/profileLogo.png"
              />
              <AlumniCard
                name="Amit Patel"
                class="2010"
                position="Founder & CEO, TechInnovate"
                image="/image/profileLogo.png"
              />
              <AlumniCard
                name="Neha Gupta"
                class="2008"
                position="Senior Manager, ISRO"
                image="/image/profileLogo.png"
              />
            </div>
          </div>
        </section>
        <section id="get-involved" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Get Involved</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <InvolvementCard
                icon={<Users className="h-10 w-10 text-blue-600" />}
                title="Mentor a Student"
                description="Share your experience and guide current students in their career paths."
              />
              <InvolvementCard
                icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
                title="Contribute to Scholarships"
                description="Help deserving students achieve their dreams by contributing to our scholarship fund."
              />
              <InvolvementCard
                icon={<Calendar className="h-10 w-10 text-blue-600" />}
                title="Organize Alumni Meetups"
                description="Bring together fellow alumni in your city for networking and nostalgia."
              />
            </div>
          </div>
        </section>
        <section id="profile" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Your Profile</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/image/profileLogo.png" alt="Rahul Kumar" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">Rahul Kumar</h3>
                    <p className="text-gray-500">Class of 2015</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>rahul.kumar@example.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Degree:</p>
                    <p>B.Tech in Computer Science and Engineering</p>
                  </div>
                  <div>
                    <p className="font-medium">Current Position:</p>
                    <p>Senior Software Engineer at Tech Solutions Inc.</p>
                  </div>
                  <div>
                    <p className="font-medium">Location:</p>
                    <p>Bangalore, India</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge>Machine Learning</Badge>
                  <Badge>Cloud Computing</Badge>
                  <Badge>Data Science</Badge>
                  <Badge>Blockchain</Badge>
                </div>
                <Button className="mt-6">Edit Profile</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-gray-500">&copy; 2024 IIT Dhanbad Alumni Association. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function EventCard({ title, date, description, image }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Image src={image} alt={title} width={400} height={200} className="object-cover h-48 w-full" />
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{date}</p>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline">Learn More</Button>
      </CardContent>
    </Card>
  )
}

function AlumniCard({ name, class: classYear, position, image }) {
  return (
    <Card className="flex flex-col items-center text-center p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={image} alt={`${name}'s profile`} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-1">Class of {classYear}</p>
      <p className="text-sm text-gray-600 mb-4">{position}</p>
      <Button variant="outline">View Profile</Button>
    </Card>
  )
}

function InvolvementCard({ icon, title, description }) {
  return (
    <Card className="flex flex-col items-center text-center p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button>Get Started</Button>
    </Card>
  )
}






















// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/HCLXFNEeJaP
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import Link from "next/link"

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       {/* <header className="px-4 lg:px-6 h-14 flex items-center">
//         <Link href="#" className="flex items-center justify-center" prefetch={false}>
//           <GraduationCapIcon className="h-6 w-6" />
//           <span className="sr-only">Alumni Association</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Events
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Alumni
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Get Involved
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Contact
//           </Link>
//         </nav>
//       </header> */}
//       <main className="flex-1">
//         <section className="w-full py-12 bg-black text-white md:py-24 lg:py-32 bg-primary">
//           <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6">
//             <div className="space-y-2 text-center ">
//               <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
//                 Welcome to the Alumni Portal
//               </h1>
//               <p className="max-w-[700px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 Connect with fellow alumni, stay up-to-date on campus news, and get involved in our community.
//               </p>
//             </div>
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary bg-white text-black shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Join Now
//             </Link>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Check out our upcoming alumni events and activities.
//                 </p>
//               </div>
//             </div>
//             {/* <div className="mx-auto grid max-w-3xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <img
//                 src="/placeholder.svg"
//                 width="550"
//                 height="310"
//                 alt="Event Image"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//               />
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="grid gap-1">
//                   <h3 className="text-xl font-bold">Alumni Reunion</h3>
//                   <p className="text-muted-foreground">Join us for our annual alumni reunion on June 15th.</p>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <CalendarDaysIcon className="h-4 w-4" />
//                     <span>June 15, 2024</span>
//                   </div>
//                 </div>
//                 <div className="grid gap-1">
//                   <h3 className="text-xl font-bold">Career Networking Event</h3>
//                   <p className="text-muted-foreground">
//                     Connect with fellow alumni and explore new career opportunities.
//                   </p>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <CalendarDaysIcon className="h-4 w-4" />
//                     <span>July 20, 2024</span>
//                   </div>
//                 </div>
//                 <Link
//                   href="#"
//                   className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                   prefetch={false}
//                 >
//                   View All Events
//                 </Link>
//               </div>
//             </div> */}
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 bg-gray-200 lg:py-32 bg-muted">
//           <div className="container  px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Alumni</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Learn more about the accomplishments and stories of our distinguished alumni.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <img
//                   src="/image/profileLogo.png"
//                   width="120"
//                   height="120"
//                   alt="Alumni Profile"
//                   className="rounded-full"
//                   style={{ aspectRatio: "120/120", objectFit: "cover" }}
//                 />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">Jane Doe</h3>
//                   <p className="text-muted-foreground">Class of 2010</p>
//                   <p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
//                 </div>
//                 <Link
//                   href="#"
//                   className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow bg-black text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                   prefetch={false}
//                 >
//                   View Profile
//                 </Link>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <img
//                   src="/image/profileLogo.png "
//                   width="120"
//                   height="120"
//                   alt="Alumni Profile"
//                   className="rounded-full"
//                   style={{ aspectRatio: "120/120", objectFit: "cover" }}
//                 />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">John Smith</h3>
//                   <p className="text-muted-foreground">Class of 2015</p>
//                   <p className="text-sm text-muted-foreground">Software Engineer, Vercel</p>
//                 </div>
//                 <Link
//                   href="#"
//                   className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1   bg-black text-white focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                   prefetch={false}
//                 >
//                   View Profile
//                 </Link>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <img
//                   src="/image/profileLogo.png"
//                   width="120"
//                   height="120"
//                   alt="Alumni Profile"
//                   className="rounded-full"
//                   style={{ aspectRatio: "120/120", objectFit: "cover" }}
//                 />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">Sarah Lee</h3>
//                   <p className="text-muted-foreground">Class of 2018</p>
//                   <p className="text-sm text-muted-foreground">Nonprofit Director, Acme Foundation</p>
//                 </div>
//                 <Link
//                   href="#"
//                   className="inline-flex h-9 items-center justify-center rounded-md bg-primary bg-black text-white px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                   prefetch={false}
//                 >
//                   View Profile
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Involved</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   There are many ways to get involved with the Alumni Association and support our community.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <VoteIcon className="h-12 w-12 text-primary" />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">Volunteer</h3>
//                   <p className="text-muted-foreground">
//                     Help organize events, mentor students, or serve on a committee.
//                   </p>
//                   <Link
//                     href="#"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 bg-black text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     Learn More
//                   </Link>
//                 </div>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <GiftIcon className="h-12 w-12 text-primary" />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">Donate</h3>
//                   <p className="text-muted-foreground">
//                     Support scholarships, programs, and initiatives that benefit our alumni community.
//                   </p>
//                   <Link
//                     href="#"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm bg-black text-white font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     Donate Now
//                   </Link>
//                 </div>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-4 text-center">
//                 <BadgeIcon className="h-12 w-12 text-primary" />
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-bold">Mentor</h3>
//                   <p className="text-muted-foreground">
//                     Share your expertise and experience with current students and recent graduates.
//                   </p>
//                   <Link
//                     href="#"
//                     className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm bg-black text-white  font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     Become a Mentor
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-muted-foreground">&copy; 2024 Alumni Association. All rights reserved.</p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
//             Terms of Service
//           </Link>
//           <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
//             Privacy
//           </Link>
//         </nav>
//       </footer> */}
//     </div>
//   )
// }

// function BadgeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
//     </svg>
//   )
// }


// function CalendarDaysIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M8 2v4" />
//       <path d="M16 2v4" />
//       <rect width="18" height="18" x="3" y="4" rx="2" />
//       <path d="M3 10h18" />
//       <path d="M8 14h.01" />
//       <path d="M12 14h.01" />
//       <path d="M16 14h.01" />
//       <path d="M8 18h.01" />
//       <path d="M12 18h.01" />
//       <path d="M16 18h.01" />
//     </svg>
//   )
// }


// function GiftIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect x="3" y="8" width="18" height="4" rx="1" />
//       <path d="M12 8v13" />
//       <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
//       <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
//     </svg>
//   )
// }


// function GraduationCapIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
//       <path d="M22 10v6" />
//       <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
//     </svg>
//   )
// }


// function VoteIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m9 12 2 2 4-4" />
//       <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
//       <path d="M22 19H2" />
//     </svg>
//   )
// }
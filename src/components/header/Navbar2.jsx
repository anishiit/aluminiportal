"use client"
import react from "react"
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

function Navbar2() {
        const [user , setUser]= useState("");
    const getUser =()=>{
        
        if(typeof window !== undefined){
         let data = JSON.parse(localStorage.getItem('user-threads'));
          if (data) {
            setUser(data);
          }
          console.log(user)
        }
    }
useEffect(()=>{getUser()},[])
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
  
    const navItems = [
      { name: "Messages", href: "#messages", icon: <Mail className="h-4 w-4 mr-2" /> },
      { name: "Events", href: "#events", icon: <Calendar className="h-4 w-4 mr-2" /> },
      { name: "Connections", href: "/network" ,  external: true , icon: <Users className="h-4 w-4 mr-2" /> },
      { name: "Get Involved", href: "#get-involved", icon: <Bell className="h-4 w-4 mr-2" /> },
      { name: "Profile", href:`/profile/${user._id}`,  external: true  , icon: <User className="h-4 w-4 mr-2" /> },
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
   
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/home" className="flex items-center space-x-2">
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
   
  )
}

export default Navbar2

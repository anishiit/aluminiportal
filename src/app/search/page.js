"use client";

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Search, UserPlus, UserCheck } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { getAllCollegeUsersUrl,connectUsersUrl,createChatOfUsers } from "@/urls/urls.js";

// const getAllCollegeUsersUrl = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/user/getcollegeusers`
// const connectUsersUrl = `${process.env.NEXT_PUBLIC_USER_BACKEND_URL}/user/connectusers`;
// const createChatOfUsers = `${process.env.NEXT_PUBLIC_CHAT_BACKEND_URL}/chat/createchat`


export default function UserConnectionPage() {

//   const [connectedUsers, setConnectedUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({});

  async function getAllCollegeUsers({collegeName}){
    try {
        let currUser = {};
        if(typeof window !== undefined){
            currUser = JSON.parse(localStorage.getItem("user-threads"))
        }
        
        await axios.post(getAllCollegeUsersUrl , {collegeName:collegeName})
        .then((res) => {
            console.log(res.data);
            const allUsers = res.data.users;
            // let formatedUsers = {};
            // console.log(allUsers)
            const x = allUsers.map((user) => {
              let isConnected = Boolean();
              
              if(user.connectedUsers?.includes(String(currUser._id))){
                isConnected = true;
              }else{
                isConnected = false;
              }
              const newUserObj = {...user, isConnected:isConnected}
              return newUserObj;
            })
            setUsers(x);
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.error(error)
    }
  }

  const handleConnect = async (id) => {
    setUsers(users.map(user => 
      user._id === id ? ({ ...user, isConnected: !user.isConnected }) : (user)
    ))
    try {
        await axios.post(connectUsersUrl , {userId1:currentUser?._id, userId2:id})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        await axios.post(createChatOfUsers, {userId1:currentUser?._id, userId2:id})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
  }

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if(typeof window !== undefined){
        const currUser = JSON.parse(localStorage.getItem("user-threads"))
        setCurrentUser(currUser);
        if(currUser){
            getAllCollegeUsers({collegeName:currUser.collegeName})
        }
    }
    // if(currentUser){
    //     getAllCollegeUsers({collegeName:currentUser.collegeName});
    // }
    // console.log(users)
  },[])

  if(!users){
    return (
        <></>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-900 text-white">
      <header className="bg-indigo-800 p-4 flex items-center">
        <Link href="/home" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Connect with Users</h1>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-indigo-800 text-white placeholder-indigo-300 border-indigo-700"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {filteredUsers?.map((user) => (
              <Card key={user._id} className="bg-indigo-800">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{user?.name}</h2>
                      <p className="text-sm text-indigo-300">{user?.name}</p>
                    </div>
                  </div>
                  <Button
                    variant={user?.isConnected ? "secondary" : "default"}
                    disabled={user?.isConnected ? true : false}
                    size="sm"
                    onClick={() => handleConnect(user?._id)}
                    className={user?.isConnected ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}
                  >
                    {user?.isConnected ? (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Connected
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
"use client"

import { useState ,useEffect } from "react" ;
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

import Profile from "@components/Profile";

const MyProfile = () => {
const {data:session} = useSession() ;
const [posts , setPosts] = useState([]);
const router = useRouter() ;

    const handleEdit =(post)=>{
router.push(`/update-prompt?id=${post._id}`)


    }
const handleDelete =async(post)=>{
// e.preventDefault();

const hasConfirm = confirm("Are you sure you delete this prompt ?")
if(hasConfirm){
  try {
  await fetch(`api/prompt/${post._id.toString()}`,{method:'DELETE'});
//  const re = await res.json()
//  console.log(re)

    const filterPost = posts.filter((p)=>p._id !== post._id)
    setPosts(filterPost)
  } catch (error) {
    console.log(error)
  }
}

}

useEffect(()=>{
    
    const fetchPost = async()=>{
      try{
    const  response = await fetch(`api/user/${session?.user.id}/post`);
    const data = await response.json()
    setPosts(data)
    console.log("the fetch data")
    console.log(data)}
    catch(e){
      console.log(e)
    }
    
    }
if(session?.user.id) fetchPost();

// for send the user to the home page if they are not loggdin
if(!session?.user.id){
  router.push('/')
}
},[session?.user.id])
  return (
  <Profile 
  name={"My"}
  desc="Welcome to you personilzed protfiel page"
   data = {posts}
handleEdit ={handleEdit}
handleDelete ={handleDelete}

  />
  )
}

export default MyProfile

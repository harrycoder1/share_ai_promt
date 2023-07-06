"use client"

import Profile from '@components/Profile'
import {useState ,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const UserID = ({params}) => {
const [dataInfo, setDataInfo] = useState([])
const {data:session}= useSession();
const [user , setUser] = useState("")

const router = useRouter();

const fetchdata =async ()=>{
  

  try {
    const response = await fetch(`/api/prompt/user/${params.id}` ,{method:"GET"})
const data  = await response.json()
console.log(data)
// if(data.ok){
  setDataInfo(data)
  setUser(data[0].creator.username)
// }
  } catch (error) {
    console.log(error)
  }
}


  useEffect(()=>{
   
fetchdata();



console.log(dataInfo)
  },[])

  // for rediract the user if they click on thier post 
  if(session?.user.id === params.id ) {
    router.push('/profile')
  }


  
  console.log(dataInfo && dataInfo[0])
  return (

    <Profile 
    name={user}
    desc="Welcome to you personilzed protfiel page"
     data = {dataInfo}

    />
  )
}

export default UserID

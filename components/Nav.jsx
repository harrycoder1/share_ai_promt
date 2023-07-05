'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState ,useEffect} from 'react'

// for next auth
import {signIn ,signOut,useSession ,getProviders} from 'next-auth/react'

const Nav = () => {
// const isUserLoggedin =true ;
const {data:session} = useSession();


const [providers , setProviders] =useState(null)
const[toggleDropdown ,setToggleDropDown] =useState(false)

useEffect(()=>{
    const setUpProviders = async()=>{

        const response = await getProviders();
        setProviders(response)
    }
    setUpProviders()
},[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>

<Link href={"/"} className='flex gap-2 flex-center'>

<Image src={'/assets/images/logo.svg'} width={30} height={30} alt="logo" className='object-contain'></Image>
<p className='logo_text'>promtia</p>

</Link>
{/* for the destop  naviagtion */}
<div className="sm:flex hidden">
{session?.user ?(
<div className='flex gap-3 md:gap-5 '>
    <Link href={'/create-prompt'}  className='black_btn'>Create Post</Link>
    <button type="button" onClick={signOut} className='outline_btn'>Sign Out </button>
<Link href={'/profie'}>
    <Image 
    src={session?.user.image} 
    width={37} 
    height={37} c
    lassName='rounded-full' 
    alt='Profile'/>
</Link>
</div>
):<>
{providers&& 
Object.values(providers).map((provider)=>(
    <button type='button'
    key={provider.name}
    onClick={()=>signIn(provider.id)}
    className='black_btn'
    >
        SignIn
    </button>
))
}
{/* /api/auth/callback/:provider */}

</>}
</div>

{/* {alert(providers)} */}
{/* Mobile navigation */}
<div className="sm:hidden flex relative">

    {session?.user ?(
    <div className='flex '>
   <Image src={'/assets/images/logo.svg'} width={37} height={37} className='rounded-full' alt='Profile'
   onClick={()=>setToggleDropDown((prev)=>!prev)}
   />
{toggleDropdown &&

<div className="dropdown">
<Link href={'/profile'} 
className='dropdown_link'
onClick={()=>setToggleDropDown(false)}

>
    My Profile
</Link>
<Link href={'/create-prompt'} 
className='dropdown_link'
onClick={()=>setToggleDropDown(false)}

>
    Create Prompts
</Link>
<button 
type='button'
onClick={()=>{
    setToggleDropDown(false);
    signOut();
}}
className='mt-5 w-full black_btn'
>
    Sign Out
</button>
</div>
}
    </div>):<>{
    providers &&
    Object.values(providers).map((provider)=>(
        <button className='black_btn'
        onClick={()=>signIn(provider.id)}
        type='button'>SignIn</button>
    ))
    
    
    }</>}
</div>
    </nav>
  )
}

export default Nav

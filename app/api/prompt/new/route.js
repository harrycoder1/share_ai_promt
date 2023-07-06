import {connectToDB} from '@utils/database.js'
// import { Prompt } from 'next/font/google';
import Prompt from '@models/prompt'
export const POST = async(req)=>{
    const {userId , prompt , tag} = await req.json();

try{
await connectToDB();
const newPrompt = await new Prompt({
creator:userId ,
tag:tag ,
prompt:prompt

});
await newPrompt.save() ;
return new Response(JSON.stringify(newPrompt) ,{status:201})
}catch(e){
console.log(e)
return new Response(JSON.stringify("Failed to create prompt") , {status:500})
}

}
import {connectToDB} from '@utils/database.js'
import Prompt from  '@models/prompt'


export const GET = async (request , {params})=>{
try {
    await connectToDB() ;
const prompt = await Prompt.find({creator:params.id}).populate('creator')

console.log("prompt data for perticular user")
console.log(prompt)
return new Response(JSON.stringify(prompt) , {status:200})
} catch (error) {
console.log(error)
console.log(error)
    return new Response(JSON.stringify("Failed to fetch the prompt for user"))
}

}
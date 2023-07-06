import {connectToDB} from '@utils/database.js'
import Prompt from  '@models/prompt'


export const GET = async (request)=>{
try {
    await connectToDB() ;
const prompt = await Prompt.find({}).populate('creator')


console.log(prompt)
return new Response(JSON.stringify(prompt) , {status:200})
} catch (error) {
console.log(error)

    return new Response(JSON.stringify("Failed to fetch the prompt"))
}

}
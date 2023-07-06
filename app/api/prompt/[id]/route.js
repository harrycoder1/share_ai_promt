// GET read
import {connectToDB} from '@utils/database.js'
import Prompt from  '@models/prompt'


export const GET = async (request, {params})=>{
try {
    await connectToDB() ;
const prompt = await Prompt.findById(params.id).populate('creator')

if(!prompt ){
    return new Response("Prompt not found" , {status:404})
}

console.log(prompt)
return new Response(JSON.stringify(prompt) , {status:200})
} catch (error) {
console.log(error)

    return new Response(JSON.stringify("Failed to fetch the perticular prompt"))
}

}
// PATCH update
export const PATCH = async(request , {params})=>{
const {prompt , tag} =await request.json();

try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id) ;

    if(! existingPrompt){
        return new Response("Prompt are not found in  Database" , {status :200})
    }

    existingPrompt.prompt = prompt ;
    existingPrompt.tag = tag ;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt) , {status:200})

} catch (error) {
    
    return new Response("Failed to update the data " , {status:500})
}


}


// DELETE

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
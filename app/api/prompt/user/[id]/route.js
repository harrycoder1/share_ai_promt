import Prompt from "@models/prompt"
import {connectToDB} from '@utils/database.js'
export const GET = async(request, {params})=>{


try {
    await connectToDB() ;

    const fetchdata =  await  Prompt.find({creator:params.id}).populate('creator')
    if(! fetchdata){
        return new Response("invalid user Id" , {status:404})
    }

    console.log(fetchdata)
    return new Response(JSON.stringify(fetchdata) , {status:200})
    
} catch (error) {
    console.log(error)
    return new Response("internal error" , {status:500})

}


}
import  mongoose from 'mongoose'

let isConnected = false ; //track the connection

export const connectToDB =async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("MongoDB is already Connected!")
        return ; //for stop the function
    }
// for established the connection
try{
await mongoose.connect(process.env.MONGODB_URI,{
    dbName:"share_prompt",
    useNewUrlParser:true ,
    useUrlfieldTopology:true ,
});

isConnected =true ;
console.log("MongoDB connected")

}catch(error){}
console.log(error)
}
 
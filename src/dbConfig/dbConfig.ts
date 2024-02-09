import mongoose from "mongoose";

export async function connect() {
    try {
        // Connect the mongoDb to app
        mongoose.connect(process.env.MONGO_URI!);

        // Grab a connection and hold in a variable
        const connection = mongoose.connection;

        // JAb connection on ho 
        connection.on('connected', ()=>{
            console.log("mongoDb Connected")
        })

        // Error
        connection.on('error', (error)=>{
            console.log("MongoDb connection error . please make sure MongoDb is running . " +error )
            process.exit();
        })        

//        
    } catch (error) {
        console.log("Somethig goes wrong")
        console.log(error)
    }
}
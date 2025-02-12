import mongoose from "mongoose"

const MONGO_URL = "mongodb://127.0.0.1/next-auth-1"

export const conectMongoDb = async () => {
    try{
        await mongoose.connect(MONGO_URL);
        console.log('Conectado a la base de datos exitosamente.');
    } catch(error){
        console.log(error)
    }
}
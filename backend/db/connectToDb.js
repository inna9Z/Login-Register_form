import mongoose from "mongoose";


const connectToMangoDB = async () => {
    try{
        await mongoose.connect(process.env.MONG0_DB_URI)
        console.log('Connected to Mango DB')
    } catch (error) {
        console.log('Error connecting to MangoDB', error.message)
    }

}

export default connectToMangoDB;
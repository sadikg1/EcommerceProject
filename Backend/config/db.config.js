const mongoose = require("mongoose")

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mogoDB database ${conn.connection.host}`)
    }
    catch (err) {
        console.log(`Eroor in connecting MongoDb ${err}`)
        
    }
}
module.exports=connectDb 

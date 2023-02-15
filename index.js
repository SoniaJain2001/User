import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/DB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=> {
   console.log("DB Connect")
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Birthday: Date,
    Mobile: Number
})

const User = new mongoose.model("User", userSchema)


// Routes
app.post("/submit",(req,res) =>{
    const { username,email,Birthday, Mobile} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } 
        else {
            const user= new User({
                username,
                Birthday,
                Mobile
            })
        
            user.save(err =>{
                if(err){
                    res.send(err)
                }else{
                    alert("submitted")
                    // res.send({message:"submitted"})
                }
            })
       }
    
   })
})
app.listen(9002,()=>{
    console.log("BE started at port 9002")

})

import User from "../models/users.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookies from "../utils/generateToken.js"


export const signup = async (req, res) => {
    try{
        const {fullName, email, password, confirmPassword} = req.body
       
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password do not match"})
        }
        const user = await User.findOne({email}) 
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }
    
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User ({
            fullName,
            email,
            password: hashPassword,
            
        })
        await newUser.save();
        if(newUser) {
            //Generate JWT token  here 
    
         generateTokenAndSetCookies(newUser._id, res);
    
         
    
            // Return success response
            res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,  
        });
           } else {
            res.status(400).json({error: 'Invalid user data '})
           }
    } catch(error) {
        console.log("Error in signup controller", error.message)
    }

}
export const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid user name or password"})
        }

        generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,  

        })


    } catch(error) {
        console.log("Error in signup controller", error.message)
    }
}

export const logout = async (req, res) => {
    try{
      
            res.cookie("jwt", "", {maxAge:0})
            res.status(200).json({message: "Logged out successfully"})
           
             
            
    } catch(error) {
        console.log("Error in logout controller", error.message)
             res.status(500).json({error: "Internal server error"})
    }
}
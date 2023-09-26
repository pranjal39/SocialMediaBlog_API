import User from "../model/user";
import bcrypt from 'bcryptjs'

//home page route
export const getAllUser = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
        if(!users) {
            return res.status(404).json({message: "No users found"});
        }
        return res.status(200).json({ users });
    }catch (err){
        console.log(err);
    }
    
}

//signup route
export const signup = async (req,res,next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists! login instead" })
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs: []
    });

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user })
}

//login route
export const login = async(req,res,next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Couldn't find user by this email" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(404).json({ message: "wrong password" });
    }
    return res.status(200).json({ message: "succesfully logged in" })

}

import mongoose, {Schema, Document} from "mongoose";


export interface User extends Document{
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

const userSchema: Schema<User> = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "please enter a valid email address"]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default User;
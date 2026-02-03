import mongoose, {Document, Schema, Model} from "mongoose";

export interface IUser extends Document {
    fname: string;
    lname: string;
    email: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const Iusername = {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9_]{3,30}$/,
}

const UserSchema: Schema<IUser> = new Schema(
    {
        fname: { type: String, required: true, trim: true },
        lname: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        username: Iusername,
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const UserModel: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
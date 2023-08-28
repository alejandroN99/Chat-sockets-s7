import {Schema, model, Document, Model} from "mongoose";

//Interface IUser
export interface IUser extends Document{
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

//Schema mongoose 
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

//Model mongoose
export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
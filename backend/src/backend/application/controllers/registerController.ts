import { Response, Request } from "express";
import { UserModel } from "../../domain/userSchema";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


const secretKey = 'abJsbfcjaFnck45';

export const registerController = async (req: Request,res: Response) => {
    
    const { username, password } = req.body;
    
    const userExist = await UserModel.findOne({username});

    if(userExist){
        return res.status(401).send('This username already exist!');
    };

    const newUser = new UserModel({username, password});

    //Encriptar contraseña

    const saltRounds = bcrypt.genSaltSync();
    const passwordBcrypt = bcrypt.hashSync(password, saltRounds);
    newUser.password = passwordBcrypt;
    

    await newUser.save();

    return res.status(200).json({ 
        msg: `User ${username} registred succefully!`,
        newUser
    });
};

export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const userExist = await UserModel.findOne({username});

    if(!userExist){
        return res.status(401).send('username is incorrect!');
    };

    const validPassword = bcrypt.compareSync( password, userExist.password);

    if(!validPassword){
        return res.status(401).send('username or password is incorrect!');
    }

     // Generar un token JWT con la información del usuario
     const token = jwt.sign({ userId: userExist._id, username: userExist.username }, secretKey, { expiresIn: '4h' });

     return res.status(200).json({ msg: `User logged succesfully!`, token });

};
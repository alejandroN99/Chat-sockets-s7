import { Response, Request } from "express";
import { UserModel } from "../../domain/userSchema";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { verify } from "../../domain/verifyTokenGoogle";
// import { TokenPayload } from "google-auth-library";
dotenv.config({ path: "../../.env" });

const secretKey = process.env.SECRET;

export const registerController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .json({ msg: "Error, fill in both username and password!" });
  }

  const userExist = await UserModel.findOne({ username });

  if (userExist) {
    return res.status(401).json({ msg: "This username already exist!" });
  }

  const newUser = new UserModel({ username, password });

  //Encriptar contraseña

  const saltRounds = bcrypt.genSaltSync();
  const passwordBcrypt = bcrypt.hashSync(password, saltRounds);
  newUser.password = passwordBcrypt;

  await newUser.save();

  return res.status(200).json({
    msg: `User ${username} registred succefully!`,
    newUser,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userExist = await UserModel.findOne({ username });

  if (!userExist) {
    return res.status(401).send("username is incorrect!");
  }

  const validPassword = bcrypt.compareSync(password, userExist.password);

  if (!validPassword) {
    return res.status(401).json({ msg: "username or password is incorrect!" });
  }

  // Generar un token JWT con la información del usuario
  const payload = { userId: userExist._id, username: userExist.username };

  if (secretKey) {
    const token = jwt.sign(payload, secretKey);
    return res.status(200).json({ msg: `User logged succesfully!`, token });
  }
};


export const googleController = async (req: Request, res: Response) => {
    const { id_token } = req.body;
    let payload: any;
  
    try {
      payload = await verify(id_token);
      console.log(payload);
      if (payload) {
        const { given_name } = payload;
  
        const user = await UserModel.findOne({ username: given_name });
  
        if (!user) {
          // Si el usuario no existe, créalo
          const password: string = "123";
  
          const data = {
            username: given_name,
            password,
          };
  
          const newUserGoogle = new UserModel(data);
  
          // Encriptar contraseña
          const saltRounds = bcrypt.genSaltSync();
          const passwordBcrypt = bcrypt.hashSync(password, saltRounds);
          newUserGoogle.password = passwordBcrypt;
  
          await newUserGoogle.save();
        }
  
        // Generar un token JWT para el usuario (existente o recién creado)
        const userExist = await UserModel.findOne({ username: given_name });
        if(userExist){

            const tokenPayload = { userId: userExist._id, username: userExist.username };
            if (secretKey) {
              const token = jwt.sign(tokenPayload, secretKey);
              return res.status(200).json({ msg: `User logged successfully!`, token });
            }
        }
  
      }
    } catch (error) {
      res.status(400).json({
        msg: "El token no se pudo verificar",
      });
    }
  };
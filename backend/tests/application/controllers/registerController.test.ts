import { Request, Response } from "express";
import { UserModel } from "../../../src/backend/domain/userSchema";
import {
  registerController,
  loginController,
} from "../../../src/backend/application/controllers/registerController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// describe("Authentication Controllers", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   // test('debe registrar un nuevo usuario', async () => {
//   //   const req: Partial<Request> = { body: { username: 'testuser', password: 'testpassword' } };
//   //   const res: Partial<Response> = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn(),
//   //   };

//   //   // Simular que UserModel.findOne devuelve null (usuario no existe)
//   //   const findOneSpy = jest.spyOn(UserModel, 'findOne');
//   //   // findOneSpy.mockResolvedValue();

//   //   await registerController(req as Request, res as Response);

//   //   expect(res.status).toHaveBeenCalledWith(200);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     msg: 'User testuser registred succefully!',
//   //     newUser: expect.any(Object), // Puedes utilizar expect.any para verificar que se haya creado un objeto
//   //   });

//   //   findOneSpy.mockRestore(); // Restaurar la función espía después de la prueba
//   // });
// });
jest.mock('../../../src/backend/domain/userSchema');

test("debe manejar el caso en el que el usuario ya existe", async () => {
  const req: Partial<Request> = {
    body: { username: "existinguser", password: "testpassword" },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Simular que UserModel.findOne devuelve un usuario existente
  const findOneSpy = jest.spyOn(UserModel, "findOne");
  findOneSpy.mockResolvedValue({
    username: "existinguser",
    password: "hashedpassword",
  });

  await registerController(req as Request, res as Response);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    msg: "This username already exist!",
  });

  findOneSpy.mockRestore();
});

const UserModelMock = UserModel as jest.Mocked<typeof UserModel>;

describe("Login Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

//   test("debe autenticar al usuario con éxito y devolver un token", async () => {
//     const mockUser = {
//       _id: "user123",
//       username: "testuser",
//       password: bcrypt.hashSync("testpassword", 10),
//     };

//     // Simular que UserModel.findOne devuelve un usuario válido
//     UserModelMock.findOne.mockResolvedValue(mockUser);

//     const req: Partial<Request> = {
//       body: { username: "testuser", password: "testpassword" },
//     };
//     const res: Partial<Response> = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const secretKey = "abJsbfcjaFnck45";

//     await loginController(req as Request, res as Response);

//     // Verificar que se haya llamado a UserModel.findOne con el nombre de usuario correcto
//     expect(UserModelMock.findOne).toHaveBeenCalledWith({
//       username: "testuser",
//     });

//     // Verificar que se haya llamado a bcrypt.compareSync con la contraseña correcta
//     expect(bcrypt.compareSync("testpassword", mockUser.password)).toBe(true);

//     // Verificar que se haya llamado a jwt.sign con la información del usuario correcta
//     expect(jwt.sign).toHaveBeenCalledWith(
//       { userId: "user123", username: "testuser" },
//       secretKey
//     );

//     // Verificar que se haya devuelto un estado 200 y un token en la respuesta
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       msg: "User logged succesfully!",
//       token: expect.any(String),
//     });
//   });

  test("debe manejar el caso en el que el usuario no existe", async () => {
    // Simular que UserModel.findOne devuelve null (usuario no existe)
    UserModelMock.findOne.mockResolvedValue(null);

    const req: Partial<Request> = {
      body: { username: "nonexistentuser", password: "testpassword" },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await loginController(req as Request, res as Response);

    // Verificar que se haya llamado a UserModel.findOne con el nombre de usuario correcto
    expect(UserModelMock.findOne).toHaveBeenCalledWith({
      username: "nonexistentuser",
    });

    // Verificar que se haya devuelto un estado 401 y un mensaje en la respuesta
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("username is incorrect!");
  });

  test("debe manejar el caso en el que la contraseña es incorrecta", async () => {
    const mockUser = {
      _id: "user123",
      username: "testuser",
      password: bcrypt.hashSync("testpassword", 10),
    };

    // Simular que UserModel.findOne devuelve un usuario válido
    UserModelMock.findOne.mockResolvedValue(mockUser);

    const req: Partial<Request> = {
      body: { username: "testuser", password: "incorrectpassword" },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginController(req as Request, res as Response);

    // Verificar que se haya llamado a UserModel.findOne con el nombre de usuario correcto
    expect(UserModelMock.findOne).toHaveBeenCalledWith({
      username: "testuser",
    });

    // Verificar que se haya llamado a bcrypt.compareSync con la contraseña incorrecta
    expect(bcrypt.compareSync("incorrectpassword", mockUser.password)).toBe(
      false
    );

    // Verificar que se haya devuelto un estado 401 y un mensaje en la respuesta
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      msg: "username or password is incorrect!",
    });
  });
});

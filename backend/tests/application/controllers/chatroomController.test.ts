import { Request, Response } from "express";
import { chatroomController, getAllChatrooms } from "../../../src/backend/application/controllers/chatroomController";
import { ChatroomModel } from "../../../src/backend/domain/chatroomSchema";



jest.mock("../../../src/backend/domain/chatroomSchema"); // Mockear el módulo ChatroomModel

describe("chatroomController", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks después de cada prueba
  });

  test("debe crear una nueva sala de chat", async () => {
    const req: Partial<Request> = { body: { name: "Sala de Prueba" } };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula que no existe una sala de chat con el mismo nombre
    (ChatroomModel.findOne as jest.Mock).mockResolvedValue(null);

    await chatroomController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Chatroom Sala de Prueba created successfully!",
    });
  });

  test("debe manejar una sala de chat existente", async () => {
    const req: Partial<Request> = { body: { name: "Sala Existente" } };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula que ya existe una sala de chat con el mismo nombre
    (ChatroomModel.findOne as jest.Mock).mockResolvedValue(true);

    await chatroomController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Chatroom with that name already exists!",
    });
  });
});

describe("getAllChatrooms", () => {
  test("debe obtener todas las salas de chat", async () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      json: jest.fn(),
    };

    // Simula que hay algunas salas de chat en la base de datos
    const mockChatrooms = [
      { name: "Sala 1" },
      { name: "Sala 2" },
    ];
    (ChatroomModel.find as jest.Mock).mockResolvedValue(mockChatrooms);

    await getAllChatrooms(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(mockChatrooms);
  });
});

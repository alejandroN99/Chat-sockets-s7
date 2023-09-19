import request from 'supertest';
import { Server } from '../../../src/backend/infrastructure/server';


describe("Pruebas de rutas del chatroom", () => {
    let app: any; 
    let authToken: any; 
  
    beforeAll(() => {
      const server = new Server();
      app = server.getApp(); 
  
      // Genera un token de prueba (puedes usar una biblioteca como jsonwebtoken)
      authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTAxOGZmNTcwM2Y0YzQzNWE0MTg1YTMiLCJ1c2VybmFtZSI6IkFsZWphbmRybyIsImlhdCI6MTY5NTAzMTUzOX0.IMoSnzkDKE-4BNVwF9LBiOkxLOJzyi8RwuL6agoNynE'; // Ajusta el token de prueba
    });
  
    // Prueba GET "/chatrooms"
    test("Debe obtener todas las salas de chat existentes", async () => {
      const response = await request(app)
        .get("/chatroom")
        .set("Authorization", `Bearer ${authToken}`);
  
      expect(response.status).toBe(200);
      
    });
  
    // Prueba POST "/chatroom"
    test("Debe crear una nueva sala de chat", async () => {
      const newChatroom = { name: "Nueva Sala de Chat" };
      const response = await request(app)
        .post("/chatroom")
        .set("Authorization", `Bearer ${authToken}`) 
        .send(newChatroom);
  
      expect(response.status).toBe(401);
      
    });
  
    
  });
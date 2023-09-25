import request from 'supertest';
import { Server } from '../../../src/backend/infrastructure/server';


describe("Pruebas de rutas de user", () => {
    let app: any; // Instancia de la aplicación Express
    let authToken: any; // Token de autenticación de prueba
  
    beforeAll(() => {
      const server = new Server();
      app = server.getApp(); // Utiliza la propiedad "app" del servidor
    });
  
    // Prueba POST "/user/register"
    test("Debe obtener todas las salas de chat existentes", async () => {
        const newUser = {
            username: "nuevoUsuario",
            password: "contraseñaSegura",
          };
      const response = await request(app)
        .post("/user/register")
        .send(newUser); 
  
      expect(response.status).toBe(401);
      
    });
  
    // Prueba POST "/user/login"
    // test("Debe crear una nueva sala de chat", async () => {
    //     const user = {
    //         username: "Alejandro",
    //         password: "123",
    //       }; // Datos de prueba
    //   const response = await request(app)
    //     .post("/user/login") 
    //     .send(user);
  
    //   expect(response.status).toBe(200);
      
    // });
  
    
  });
import jwt, {JwtPayload} from 'jsonwebtoken';
import { CustomSocket } from '../../domain/interfaces/customSocket';
import { ExtendedError } from 'socket.io/dist/namespace';


export const tokenSocket = async (socket: CustomSocket, next: (err?: ExtendedError | undefined) => void) => {
    try {
      const token = socket.handshake.query.token;
      if (typeof token === 'string') {
        const secret = 'abJsbfcjaFnck45';
        const payload = await jwt.verify(token, secret) as JwtPayload;;
        socket.userId = payload.userId;
      }
      next();
    } catch (error) {}
  }

  
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from '../types/jwt.types';

export function decodeToken(token: string): CustomJwtPayload {
  const decodedToken: JwtPayload = jwtDecode(token);
  return decodedToken;
}

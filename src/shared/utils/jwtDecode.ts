import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

export function decodeToken(token: string): JwtPayload {
  const decodedToken: JwtPayload = jwtDecode(token);
  return decodedToken;
}

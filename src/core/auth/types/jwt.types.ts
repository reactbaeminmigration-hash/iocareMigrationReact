import type { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  remember_me?: string;
}

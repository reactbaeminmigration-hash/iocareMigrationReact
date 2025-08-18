import type { JwtPayload } from 'jwt-decode';

export type CustomJwtPayload = JwtPayload & {
  remember_me?: string;
};

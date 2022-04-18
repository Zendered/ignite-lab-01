export interface AuthUserDTO {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  gty: string;
}

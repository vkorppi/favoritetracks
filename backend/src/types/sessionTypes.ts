
import  { Session } from 'express-session';

export interface refreshtoken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface decodedTokenType {
  username: string;
  id: string;
}

export interface spotifyToken {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface TokenType {
  value: string;
  admin: boolean;
}

export interface requestType {
  req: SessionControllType
}

interface SessionControllType {
  session: sessionType
}

interface sessionType {
  sessionid: string
  destroy: Session["destroy"];
}

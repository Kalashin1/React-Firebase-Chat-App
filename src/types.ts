import { DocumentData } from "firebase/firestore";

export interface Chat extends DocumentData {
  id: string;
  messages: Message[];
  users: string[]
}

export interface Message extends DocumentData {
  id: string;
  createdAt: number;
  textContent: string;
  encoder: User,
  decoder: User,
  status: "CREATED" | "DELIVERED" | "READ" | "DELETED"
  event: string;
  assetURL: string[]
}

export interface User extends DocumentData {
  id: string;
  fullName: string;
}
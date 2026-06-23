export type ChatRole = "user" | "model";

export interface ChatMessage {
    id: string;
    role: ChatRole;
    text: string;
    date: string;
}
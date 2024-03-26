// import { io, Socket } from "socket.io-client";

// export interface Message {
//   senderUsername: string;
//   receiverUsername: string;
//   content: string;
//   timestamp: Date;
// }

// class ChatService {
//   private socket: Socket;

//   constructor() {
//     this.socket = io("http://localhost:3000");

//     this.socket.on("receiveMessage", (message: Message) => {
//       console.log("Received message:", message);
//     });
//   }

//   sendMessage(message: Message) {
//     this.socket.emit("sendMessage", message);
//   }
// }

// export default new ChatService();

import io from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket: any = null;

export function initSocket(userId: string): any {
  if (socket) {
    return socket;
  }

  // connect to the /telehealth namespace by including it in the URL
  socket = io(`${SOCKET_URL}/telehealth`, {
    path: "/socket.io",
    auth: { userId },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  return socket;
}

export function getSocket(): any {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

import { getConfigByKey } from "@/api/config";

export enum SOCKETS_ENDPOINTS {
  UPDATE_MATCHES = "update_matches",
}

type TEvenCb<D> = (data: D) => void;

export class Sockets {
  private static socket: WebSocket;
  private static events: Record<string, TEvenCb<unknown>[]> = {};

  static connect() {
    Sockets.socket = new WebSocket(getConfigByKey("socketURL"));

    Sockets.socket.onopen = () => {};

    Sockets.socket.onerror = (e) => {
      console.error(e);
      Sockets.socket.close();
    };

    Sockets.socket.onclose = () => {
      setTimeout(() => Sockets.connect(), 5000);
    };

    Sockets.socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);

      Sockets.events[type]?.forEach((cb) => {
        cb(data);
      });
    };
  }

  static on<D>(event: string, cb: TEvenCb<D>) {
    Sockets.events[event] = [...(Sockets.events[event] ?? []), cb];

    return () => {
      const index = Sockets.events[event]?.findIndex((el) => {
        return el === cb;
      });

      if (index < 0) {
        return;
      }

      Sockets.events[event].splice(index, 1);
    };
  }
}

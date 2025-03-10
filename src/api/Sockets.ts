import { getConfigByKey } from "@/api/config";

export enum SOCKETS_ENDPOINTS {
  UPDATE_MATCHES = "update_matches",
}

type TEventCb<D> = (data: D) => void;

export class Sockets {
  private static socket: WebSocket;
  private static events: Record<string, TEventCb<unknown>[]> = {};

  private static currentSocketReconnectionAttempt = 0;

  static connect() {
    Sockets.socket = new WebSocket(getConfigByKey("socketURL"));

    Sockets.socket.onopen = () => {
      console.log("Socket connected!");
      Sockets.currentSocketReconnectionAttempt = 0;
    };

    Sockets.socket.onerror = (e) => {
      console.error(e);
      Sockets.socket.close();
    };

    Sockets.socket.onclose = () => {
      Sockets.reconnect();
    };

    Sockets.socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);

      Sockets.events[type]?.forEach((cb) => {
        cb(data);
      });
    };
  }

  public static on<D>(event: string, cb: TEventCb<D>) {
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

  private static reconnect() {
    console.log("Socket starts reconnection!");

    if (
      Sockets.currentSocketReconnectionAttempt >=
      getConfigByKey("maxSocketReconnectionAttempts")
    ) {
      console.error("Limit socket reconnections!");

      return;
    }

    setTimeout(() => {
      Sockets.currentSocketReconnectionAttempt += 1;

      Sockets.connect();
    }, 5000);
  }
}

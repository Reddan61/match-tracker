import { getConfigByKey } from "@/api/config";

export enum SOCKETS_ENDPOINTS {
  UPDATE_MATCHES = "update_matches",
}

type TEventCb<D> = (data: D) => void;

export class Sockets {
  private static socket: WebSocket;
  private static events: Record<string, TEventCb<unknown>[]> = {};

  private static currentSocketReconnectionAttempt = 0;

  static connect(socketURL: string) {
    Sockets.socket = new WebSocket(socketURL);

    Sockets.socket.onopen = () => {
      console.log("Socket connected!");
      Sockets.currentSocketReconnectionAttempt = 0;
    };

    Sockets.socket.onerror = (e) => {
      console.error(e);
    };

    Sockets.socket.onclose = () => {
      Sockets.reconnect(socketURL);
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
      const events = Sockets.events[event];

      if (!events) {
        return;
      }

      const index = events.findIndex((el) => {
        return el === cb;
      });

      if (index < 0) {
        return;
      }

      events.splice(index, 1);
    };
  }

  public static off() {
    Sockets.events = {};
  }

  private static reconnect(socketURL: string) {
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

      Sockets.connect(socketURL);
    }, 5000);
  }
}

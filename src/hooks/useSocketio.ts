import { io, Socket } from "socket.io-client";

let eventList: Array<{ eventName: string, callback: (data: any) => void }> = [];
let ws: Socket;
let url: string

type EventOptions = {
  on: Record<string, any>,
  send: Record<string, any>,
};

export function setupWsUrl(domain: string) {
  url = domain
}

export function useWs<K extends EventOptions>() {
  if (!ws) {
    ws = io(url)
  }

  ws.on('connect', () => {
    console.log('連上瞜');
  })

  ws.on('disconnect', () => {
    console.log('段線搂');
  })

  return {
    ws
  }
}

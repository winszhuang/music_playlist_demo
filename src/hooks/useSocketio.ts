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

  function onOpen(callback = () => console.log('ws open connection')) {
    ws.on('connect', () => callback())
  }

  function onClose(callback = () => console.log('ws close connection')) {
    ws.on('disconnect', () => {
      console.log('段線搂，馬上再次重連');
      ws = io(url)
      callback()
    })
  }

  return {
    ws,
    onOpen,
    onClose
  }
}

let eventList: Array<{ eventName: string, callback: (data: any) => void }> = [];
let ws: WebSocket;

type EventOptions = {
  on: Record<string, any>,
  send: Record<string, any>,
};

export function useWs<K extends EventOptions>(config = { 
  dev: (import.meta.env.VITE_API_URL as string).replace('http', 'ws'), 
  prod: 'wss://wave-working-backend.vercel.app:9453/'
  // prod: (import.meta.env.VITE_API_URL as string).replace('https', 'wss')
}) {
  
  const isDev = import.meta.env.DEV
  ws ??= new WebSocket(isDev ? config.dev : config.prod);
  // ws ??= new WebSocket('ws://wave-working-backend-ofsuql9rf-winszhuang.vercel.app:443')

  ws.onmessage = (e) => {
    const source = e.data;
    const sourceJson = JSON.parse(source);
    const { event, data } = sourceJson;

    for (const ev of eventList) {
      if (ev.eventName === event) {
        return ev.callback(data)
      }
    }
  }

  function on<T extends keyof K['on']>(eventName: T, callback: (data: K['on'][T]) => void) {
    eventList.push({
      eventName: eventName as string,
      callback
    })
  }

  function onOpen(callback = () => console.log('ws open connection')) {
    ws.onopen = () => callback();
  }

  function onClose(callback = () => console.log('ws close connection')) {
    ws.onclose = () => callback();
  }

  function send<T extends keyof K['send']>(eventName: T, data: K['send'][T]) {
    ws.send(JSON.stringify({
      event: eventName,
      data
    }))
  }

  return {
    send,
    on,
    onOpen,
    onClose,
    ws,
  }
}


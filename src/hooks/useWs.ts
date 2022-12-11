let eventList: Array<{ eventName: string, callback: (data: any) => void }> = [];
let ws: WebSocket;

type EventOptions = Record<string, any>;

export function useWs<K extends EventOptions>(url = 'ws://localhost:3000') {
  ws ??= new WebSocket(url);

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

  function on<T extends keyof K>(eventName: T, callback: (data: K[T]) => void) {
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

  function send<T extends keyof K>(eventName: T, data: K[T]) {
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


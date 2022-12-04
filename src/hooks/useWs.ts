export function useWs(url = 'ws://localhost:3000') {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('ws open connection');
  }

  ws.onclose = () => {
    console.log('ws close connection');
  }

  function send(eventName: 'join-channel', data: JoinChannelEventData): void;
  function send(eventName: 'add-music', data: AddMusicEventData): void;
  function send(eventName: WsEvent, data: EventData) {
    ws.send(JSON.stringify({
      event: eventName,
      data
    }))
  }

  function on(eventName: 'update-playlist', data: UpdatePlayListEventData): void;
  function on(eventName: WsEvent, data: EventData) {
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event as unknown as string)
        console.log(data);
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  }

  return {
    send,
    on,
    ws
  }
}


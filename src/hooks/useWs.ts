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
  function send(eventName: 'insert-music', data: AddMusicEventData): void;
  function send(eventName: WsEvent, data: EventData) {
    ws.send(JSON.stringify({
      event: eventName,
      data
    }))
  }

  function on(eventName: 'update-playlist', callback: (data: UpdatePlayListEventData) => void): any;
  function on(eventName: WsEvent, callback: (data: EventData) => void): any {
    ws.onmessage = (event) => {
      const source = event.data;
      console.log(event);
      const sourceJson = JSON.parse(source);
      
      if (sourceJson.event === 'update-playlist') {
        console.log(sourceJson);
        callback(sourceJson.data)
      }
    }
  }

  return {
    send,
    on,
    ws
  }
}


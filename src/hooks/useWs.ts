export function useWs(url = 'ws://localhost:3000') {
  const eventList: Array<{ eventName: string, callback: (data: any) => void }> = [];
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
  function send(eventName: 'apply-to-insert-music', data: AddMusicEventData): void;
  function send(eventName: WsEvent, data: EventData) {
    ws.send(JSON.stringify({
      event: eventName,
      data
    }))
  }

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

  function on(eventName: 'update-playlist', callback: (data: UpdatePlayListEventData) => void): any;
  function on(eventName: 'update-audited-list', callback: (data: AuditedMusicData[]) => void): any;
  function on(eventName: WsEvent, callback: (data: EventData) => void): any {
    eventList.push({
      eventName,
      callback
    })
  }

  return {
    send,
    on,
    ws
  }
}


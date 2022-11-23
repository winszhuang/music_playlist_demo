import { inject } from 'vue';
import { wsKey } from '../const';

export function useWs() {
  const ws = inject(wsKey)!;

  function send(eventName: 'join-channel', data: JoinChannelEventData): void;
  function send(eventName: 'add-music', data: AddMusicEventData): void;
  function send(eventName: WsEvent, data: EventData) {
    if (eventName === 'join-channel') {
      const d = data as JoinChannelEventData;
      const res = {
        event: 'join-channel',
        data
      }
      ws.send(JSON.stringify(res))
    } else if (eventName === 'add-music') {
      const d = data as AddMusicEventData;
      const res = {
        event: 'add-music',
        data
      }
      ws.send(JSON.stringify(res))
    }
  }

  return {
    send,
    ws
  }
}


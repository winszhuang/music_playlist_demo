import { inject } from 'vue';
import { wsKey } from '../const';

export function useWs() {
  const ws = inject(wsKey)!;

  function send(eventName: 'join-channel', data: JoinChannelEventData): void;
  function send(eventName: 'add-music', data: AddMusicEventData): void;
  function send(eventName: WsEvent, data: EventData) {
    ws.send(JSON.stringify({
      event: eventName,
      data
    }))
  }

  return {
    send,
    ws
  }
}


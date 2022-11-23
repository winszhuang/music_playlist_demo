type UseWs = () => { 
  send: (eventName: 'join-channel', data: JoinChannelEventData) => void;
  send: (eventName: 'add-music', data: AddMusicEventData) => void;
}

type WsEvent = 
  | 'join-channel'
  | 'add-music'
  | 'test'

interface JoinChannelEventData {
  token: string
}

interface AddMusicEventData {
  musicId: string
}

type EventData = 
  | JoinChannelEventData
  | AddMusicEventData

interface WsEventData<T> {
  event: WsEvent,
  data: T
}
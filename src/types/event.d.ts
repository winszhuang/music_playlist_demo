type UseWs = () => { 
  send: (eventName: 'join-channel', data: JoinChannelEventData) => void;
  send: (eventName: 'add-music', data: AddMusicEventData) => void;
}

type WsEvent = 
  | 'join-channel'
  | 'add-music'
  | 'insert-music'
  | 'update-playlist'

interface JoinChannelEventData {
  token: string
}

interface AddMusicEventData {
  musicId: string
}

type UpdatePlayListEventData = MusicData[]

type EventData = 
  | JoinChannelEventData
  | AddMusicEventData
  | UpdatePlayListEventData

interface WsEventData<T> {
  event: WsEvent,
  data: T
}
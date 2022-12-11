/** websocket事件，on表示接收，send表示寄送 */
type WsEventOptions = {
  on: {
    'update-playlist': UpdatePlayListEventData,
    'update-inserted-list': UpdatePlayListEventData,
    'update-audited-list': AuditedMusicData[]
  },
  send: {
    'join-channel': JoinChannelEventData,
    'add-music': AddMusicEventData,
    'apply-to-insert-music': AddMusicEventData,
    'insert-music': InsertMusicEventData,
  }
}

interface JoinChannelEventData {
  token: string
}

interface AddMusicEventData {
  musicId: string
}

type InsertMusicEventData = Array<{
  _id: string,
  cancel: boolean
}>

type UpdatePlayListEventData = MusicData[]
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
    'delete-music': DeleteMusicEventData,
    'like': AddMusicEventData,
    'unlike': AddMusicEventData,
    'apply-to-insert-music': AddMusicEventData,
    'insert-music': InsertMusicEventData,
    'update-current-music': UpdateCurrentMusicEventData | null
  }
}

interface JoinChannelEventData {
  token: string
}

interface UpdateCurrentMusicEventData {
  _id: string;
}

interface AddMusicEventData {
  musicId: string
}

interface DeleteMusicEventData {
  _id: string;
}

type InsertMusicEventData = Array<{
  _id: string,
  cancel: boolean
}>

type UpdatePlayListEventData = MusicDataDetail[]
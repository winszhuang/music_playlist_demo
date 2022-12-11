type WsEventOptions = {
  'join-channel': JoinChannelEventData,
  'add-music': AddMusicEventData,
  'apply-to-insert-music': AddMusicEventData,
  'insert-music': InsertMusicEventData,
  'update-playlist': UpdatePlayListEventData,
  'update-inserted-list': UpdatePlayListEventData,
  'update-audited-list': AuditedMusicData[]
}

interface JoinChannelEventData {
  token: string
}

interface AddMusicEventData {
  musicId: string
}

interface InsertMusicEventData {
  _id: string
}

type UpdatePlayListEventData = MusicData[]
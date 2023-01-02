/** websocket事件，on表示接收，send表示寄送 */
type WsEventOptions = {
  on: {
    'update-playlist': UpdatePlayListEventData,
    'update-inserted-list': UpdatePlayListEventData,
    'update-audited-list': AuditedMusicData[],
    'update-current-time': UpdateCurrentTimeEventData,
    'update-history': UpdateHistoryEventData
  },
  send: {
    'join-channel': JoinChannelEventData,
    'add-music': AddMusicEventData,
    'add-music-from-history': AddMusicFromHistory,
    'delete-music': DeleteMusicEventData,
    'like': AddMusicEventData,
    'unlike': AddMusicEventData,
    'apply-to-insert-music': AddMusicEventData,
    'insert-music': InsertMusicEventData,
    'update-current-music': UpdateCurrentMusicEventData | null,
    'update-current-time': UpdateCurrentTimeEventData,
    'set-page-index-of-history': SetPageIndexOfHistoryEventDate,
    'set-page-size-of-history': SetPageSizeOfHistoryEventDate,
    'like-music-from-history': LikeMusicFromHistoryEventData
  }
}

interface JoinChannelEventData {
  token: string
}

interface UpdateCurrentMusicEventData {
  _id: string;
}

interface UpdateCurrentTimeEventData {
  time: string;
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

type UpdateHistoryEventData = {
  pageIndex: number,
  totalCount: number,
  pageCount: number,
  list: MusicDataDetail[]
}

interface SetPageIndexOfHistoryEventDate {
  pageIndex: number;
}

interface SetPageSizeOfHistoryEventDate {
  pageSize: number;
}

interface AddMusicFromHistory {
  _id: string;
  musicId: string;
}

interface LikeMusicFromHistoryEventData {
  _id: string;
  musicId: string;
}
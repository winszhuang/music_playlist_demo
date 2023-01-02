interface MusicData {
  musicId: string;
  name: string;
  author: string;
  thumbnail: string;
  duration: string;
  _id: string;
}

interface AuditedMusicData {
  name: string,
  author: string,
  createdAt: string,
  _id: string,
  thumbnail: string,
  duration: string,
}


interface MusicDataDetail extends MusicData {
  /**
   * e.g.
   * {
   *    637c85907f2cb79eb4608ea3: true,
   * }
   */
  likes: Record<string, boolean | null | undefined>;
  createdAt: string;
  userId: string;
  channelId: string;
  onTime: null | string;
  __v: number;
  /** 是否為插播 */
  insert?: boolean;
  canBeReAddedTime?: string;
}
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
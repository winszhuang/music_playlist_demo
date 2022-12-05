interface MusicData {
  musicId: string;
  name: string;
  author: string;
  thumbnail: string;
  duration: string;
}

interface AuditedMusicData {
  name: string,
  author: string,
  createdAt: string,
  serialId: string,
  thumbnail: string,
  duration: string,
}
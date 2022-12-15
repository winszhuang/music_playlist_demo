interface ChannelInfoData {
  _id: string;
  name: string;
  thumbnail: string;
  isLock: boolean;
}

interface Token {
  token: string;
}

interface DjJoinChannelDto {
  email: string;
  password: string;
  channelId: string;
}

interface GuestJoinChannelDto {
  name: string;
  channelPassword: string;
  channelId: string;
}

interface Profile {
  id: string;
  channelId: string;
  iat: number;
  exp: number;
}

type SearchMusicListOutput = MusicData[]

interface UserInfo {
  _id: string,
  name: string,
  email: string,
  gender: number,
  __v: number,
  roleId: number
}
export interface ChannelInfoData {
  _id: string;
  name: string;
  thumbnail: string;
  isLock: boolean;
}

export interface Token {
  token: string;
}

export interface DjJoinChannelDto {
  email: string;
  password: string;
  channelId: string;
}
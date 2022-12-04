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

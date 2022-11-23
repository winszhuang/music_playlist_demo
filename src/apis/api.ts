import axios, { AxiosResponse } from 'axios'
import { ChannelInfoData, DjJoinChannelDto, Token } from '../types/api';

export const api = axios.create({
  timeout: 60000,
  baseURL: 'http://localhost:3000'
})

export async function getChannelList(): Promise<AxiosResponse<ChannelInfoData[]>> {
  return api.get('/channels');
}

export async function djJoinChannel(postData: DjJoinChannelDto): Promise<AxiosResponse<Token>> {
  return api.post('/channels/join-dj', postData);
}
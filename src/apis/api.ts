import axios, { AxiosResponse } from 'axios'

export const api = axios.create({
  timeout: 60000,
  baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  }
)

export async function getChannelList(): Promise<AxiosResponse<ChannelInfoData[]>> {
  return api.get('/channels');
}

export async function guestJoinChannel(postData: GuestJoinChannelDto): Promise<AxiosResponse<Token>> {
  return api.post('/channels/join-dj', postData);
}

export async function djJoinChannel(postData: DjJoinChannelDto): Promise<AxiosResponse<Token>> {
  return api.post('/channels/join-dj', postData);
}
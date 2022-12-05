import axios, { AxiosResponse } from 'axios'
import { fakeMusicList } from '../const'

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
  return api.post('/channels/join', postData);
}

export async function djJoinChannel(postData: DjJoinChannelDto): Promise<AxiosResponse<Token>> {
  return api.post('/channels/join-dj', postData);
}

// export async function searchMusic(queryString: string): Promise<AxiosResponse<SearchMusicListOutput>> {
//   // youtube search api用一次扣100點，很貴
//   return api.get(`/music/search?q=${queryString}`);
// }

export async function searchMusic(queryString: string) {
  return new Promise((resolve, reject) => {
    resolve({
      data: fakeMusicList
    })
  })
}

export async function getMe() {
  return api.get('/users/me')
}
import axios, { AxiosError } from 'axios';
import { create } from 'zustand';
import { PREFIX } from '../src/config/api.config';

export const useMemberStore = create((set) => ({
    // member: [],

    // getMembers: async () => {  
    //   try {
    //     const response = await axios.get(`${PREFIX}/api/getMembers`)
    //     set({ member: response.data })
    //   } catch (err) {
    //     if (err instanceof AxiosError) {
    //       throw new Error(err.response?.data.message)
    //     } else if (err.request) {
    //       throw new Error('Нет ответа от сервера')
    //     } else {
    //       throw new Error('Ошибка соединения')
    //     }
    //   }
    //  }
     
}))

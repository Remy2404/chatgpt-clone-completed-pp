import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const uploadImage = (file) => {
  return api.get('/upload').then(response => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('publicKey', response.data.publicKey);
    formData.append('signature', response.data.signature);
    formData.append('expire', response.data.expire);
    formData.append('token', response.data.token);

    return axios.post(response.data.uploadURL, formData);
  });
};

export const createChat = (text) => api.post('/chats', { text });

export const getUserChats = () => api.get('/userchats');

export const getChat = (id) => api.get(`/chats/${id}`);

export const updateChat = (id, question, answer, img) => 
  api.put(`/chats/${id}`, { question, answer, img });

export default api;

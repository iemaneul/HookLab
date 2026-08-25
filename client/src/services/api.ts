import axios from 'axios';
export const api=axios.create({baseURL:`${import.meta.env.VITE_API_URL||'http://localhost:3001'}/api`});
api.interceptors.request.use(c=>{const token=localStorage.getItem('hooklab_token');if(token)c.headers.Authorization=`Bearer ${token}`;return c;});
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401){localStorage.removeItem('hooklab_token');if(!location.pathname.match(/^\/(login|register)/))location.href='/login';}return Promise.reject(e);});

import api from './api';

export default async function LoginAPI(data) {
  const { email, password } = data;

  const response = await api.post('login', { email, password });

  const access = await api.get('/me', { headers: { Accept: 'application/json', Authorization: `Bearer ${ response.data.access_token }` } });

  if(access.status === 200){
    localStorage.setItem('token', response.data.access_token);
    return true;
  } else {
    return false;
  }
}
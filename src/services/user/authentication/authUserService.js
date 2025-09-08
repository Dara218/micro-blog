import { api } from '@/services/common/http';

export const login = (credentials) => api.post('/api/user/authenticate', credentials);
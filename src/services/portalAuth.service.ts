import api from './api';

const portalAuthService = {
  signIn: async (payload: { login_id: string; password: string }) => {
    const response = await api.post('/auth/portal/signin', payload);
    return response.data;
  },
  verifyOtp: async (payload: { login_id: string; otp: string }) => {
    const response = await api.post('/auth/portal/otp/verify', payload);
    return response.data;
  },
};

export default portalAuthService;

import api from "@/lib/axios";

const authService = {
  signup: async (userData: any) => {
    try {
      const { data } = await api.post("/auth/signup", userData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  login: async (userData: any) => {
    try {
      const { data } = await api.post("/auth/login", userData);
      return data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const { data } = await api.post("/auth/logout");
      return data;
    } catch (error) {
      throw error;
    }
  },
  // refreshToken: async () => {
  //   try {
  //     const { data } = await api.post("/auth/refresh-token");
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getProfile: async () => {
    try {
      const { data } = await api.get("/auth/get-profile");
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;

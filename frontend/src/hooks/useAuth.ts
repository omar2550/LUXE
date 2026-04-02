import authService from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  return useQuery({
    queryKey: ["useUser"],
    queryFn: authService.getProfile,
    retry: false,
    staleTime: Infinity,
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.signup,
    onMutate: () => {
      toast.loading("Creating account...", { id: "signup" });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["useUser"], data.user);
      // Please verify your email
      toast.success(
        `Welcome, ${data.user?.name || ""}! Explore the collection.`,
        { id: "signup" },
      );
      // navigate('/verify-email');
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Signup failed", {
        id: "signup",
      });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["useUser"], data.user);
      toast.success("Welcome Back", { id: "login" });
      navigate("/");
    },
    onError: (error: any) => {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Login failed", {
        id: "login",
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      toast.success("Logged out Successfully", { id: "Logout" });
      queryClient.clear();
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed", {
        id: "Logout",
      });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authService.refreshToken,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "AUTH - ERROR!");
    },
  });
};

"use client";

import { setHead, verifyToken, apiUserData, logout } from "@/axios";
import { SERVER_URL } from "@/utils/loadEnv";
import { errorToast, infoToast, successToast } from "@/utils/toastSettings";
// import { userDetailsType } from "@/types/ContextTypesUser";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type userContextType = {
  token: string | null;
  userDetails: any | null;
  signOut: () => void;
  handleAuthentication: () => void;
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
  loading: boolean;
};

const userContext = createContext<userContextType>({
  token: null,
  userDetails: null,
  signOut: () => {},
  handleAuthentication: () => {},
  fetchUserDetails: async () => Promise.resolve(),
  authenticated: false,
  loading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);
  const fetchToken = async () => {
    try {
      const res = await verifyToken();
      console.log("fetch token", res);

      if (res.status === 200) {
        setToken(res.data.data);
        setHead(res.data.data);
        setAuthenticated(true);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const updateDetails = async () => {
    try {
      setLoading(true);
      const res = await apiUserData();

      if (res.status === 200) {
        setUserDetails(res.data.data);
      }
    } catch (err: any) {
      console.log("err", err);
      setAuthenticated(false);
      errorToast(err.response.data.message);
    }
    setLoading(false);
  };
  // redirect to google auth
  const handleAuthentication = async () => {
    if (typeof window === "undefined") return;
    
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    if (!token) {
      await fetchToken();
    }
    await updateDetails();
  };

  const signOut = () => {
    setLoading(true);
    logout().then((res) => {
      setLoading(false);
      setToken(null);
      // setUserDetails(null);
      setAuthenticated(false);
      infoToast(res.data.message);
    });
  };
  return (
    <userContext.Provider
      value={{
        token,
        userDetails,
        signOut,
        handleAuthentication,
        fetchUserDetails,
        authenticated,
        loading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => useContext(userContext);

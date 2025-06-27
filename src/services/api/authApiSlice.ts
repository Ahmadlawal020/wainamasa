import { apiSlice } from "./apislice";
import { logout, setCredentials } from "../authSlice";

// Define types for your credentials and responses
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

interface LogoutResponse {
  message: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login a user
    loginUser: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    // // Logout a user
    // logoutUser: builder.mutation<LogoutResponse, void>({
    //   query: () => ({
    //     url: "/api/auth/logout",
    //     method: "POST",
    //   }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       // console.log(data);
    //       dispatch(logout());
    //       setTimeout(() => {
    //         dispatch(apiSlice.util.resetApiState());
    //       }, 1000);
    //     } catch (err) {
    //       // console.log(err);
    //     }
    //   },
    // }),

    logoutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // ✅ Clear auth state and API cache
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error("Logout error", err); // helpful log
        }
      },
    }),

    refreshToken: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/api/auth/refresh",
        method: "GET",
        credentials: "include", // 🔥 Ensure cookies are sent
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
} = authApiSlice;

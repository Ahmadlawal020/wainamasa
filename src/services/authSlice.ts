import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  // Define your user properties here
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  // Add other user properties as needed
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

interface CredentialsPayload {
  accessToken: string;
  user: User;
}

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
//       const { accessToken, user } = action.payload;
//       state.accessToken = accessToken;
//       state.user = user;
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.user = null;
//     },
//   },
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;

      // ✅ Optional: store auth persistently
      localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;

      // ✅ Optional: clear persistent data
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Define RootState type according to your store structure
interface RootState {
  auth: AuthState;
}

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

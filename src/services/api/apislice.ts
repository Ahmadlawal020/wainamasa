import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../authSlice";

interface Credentials {
  accessToken?: string;
  refreshToken?: string;
  // Add other credential properties if they exist
}

interface ErrorData {
  message?: string;
  // Add other error properties if they exist
}

interface CustomError {
  status?: number;
  data?: ErrorData | string;
}

interface CustomQueryResult {
  data?: unknown;
  error?: CustomError;
  meta?: FetchBaseQueryMeta;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001",
  // baseUrl: "https://waina.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { accessToken: string } }).auth
      .accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
}) as BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle both 401 and 403 status codes
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    // Attempt to refresh token
    const refreshResult = (await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    )) as CustomQueryResult;

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials(refreshResult.data as Credentials));

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle refresh token failure
      if (
        refreshResult?.error?.status === 401 ||
        refreshResult?.error?.status === 403
      ) {
        api.dispatch(logout());
        if (refreshResult.error) {
          refreshResult.error.data = {
            message: "Your login has expired. Please log in again.",
          };
        }
      }
      return refreshResult as { error: FetchBaseQueryError };
    }
  }

  // Handle non-JSON responses
  if (result.error && typeof result.error.data === "string") {
    result.error.data = { message: result.error.data };
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});

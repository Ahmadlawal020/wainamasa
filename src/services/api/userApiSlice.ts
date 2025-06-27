// import { apiSlice } from "./apislice";

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "/api/users",
//       providesTags: (result = [], error, arg) =>
//         result
//           ? [
//               ...result.map(({ id }: { id: string }) => ({
//                 type: "User" as const,
//                 id,
//               })),
//               { type: "User", id: "LIST" },
//             ]
//           : [{ type: "User", id: "LIST" }],
//     }),

//     createUser: builder.mutation({
//       query: (newUser) => ({
//         url: "/api/users",
//         method: "POST",
//         body: newUser,
//       }),
//       invalidatesTags: [{ type: "User", id: "LIST" }],
//     }),

//     updateUser: builder.mutation({
//       query: (updatedUser) => ({
//         url: "/api/users",
//         method: "PATCH",
//         body: updatedUser,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "User", id },
//         { type: "User", id: "LIST" },
//       ],
//     }),

//     deleteUser: builder.mutation({
//       query: ({ id }) => ({
//         url: "/api/users",
//         method: "DELETE",
//         body: { id },
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "User", id },
//         { type: "User", id: "LIST" },
//       ],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetUsersQuery,
//   useCreateUserMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } = userApiSlice;

import { apiSlice } from "./apislice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/users",
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query({
      query: (id: string) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/api/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/api/users",
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/api/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

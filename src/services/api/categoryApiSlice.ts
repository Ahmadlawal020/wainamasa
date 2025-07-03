import { apiSlice } from "./apislice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET: All categories
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: "Category" as const,
                id: _id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // GET: Single category by ID
    getCategoryById: builder.query({
      query: (id: string) => `/api/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // POST: Create a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/api/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    // PATCH: Update category
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/categories/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),

    // DELETE: Remove category
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;

// import { apiSlice } from "./apislice";

// export const productApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // GET: All products
//     getProducts: builder.query({
//       query: () => "/api/products",
//       providesTags: (result = [], error, arg) =>
//         result
//           ? [
//               ...result.map(({ _id }: { _id: string }) => ({
//                 type: "Product" as const,
//                 id: _id,
//               })),
//               { type: "Product", id: "LIST" },
//             ]
//           : [{ type: "Product", id: "LIST" }],
//     }),

//     // ✅ GET: Products by category
//     getProductsByCategory: builder.query({
//       query: (category: string) => `/api/products/category/${category}`,
//       providesTags: (result = [], error, arg) =>
//         result
//           ? [
//               ...result.map(({ _id }: { _id: string }) => ({
//                 type: "Product" as const,
//                 id: _id,
//               })),
//               { type: "Product", id: `CATEGORY-${arg}` },
//             ]
//           : [{ type: "Product", id: `CATEGORY-${arg}` }],
//     }),

//     // GET: Single product by ID
//     getProductById: builder.query({
//       query: (id: string) => `/api/products/${id}`,
//       providesTags: (result, error, id) => [{ type: "Product", id }],
//     }),

//     // POST: Create a product
//     createProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/api/products",
//         method: "POST",
//         body: newProduct,
//       }),
//       invalidatesTags: [{ type: "Product", id: "LIST" }],
//     }),

//     // // PUT: Update a product
//     // updateProduct: builder.mutation({
//     //   query: ({ id, ...rest }) => ({
//     //     url: `/api/products/${id}`,
//     //     method: "PUT",
//     //     body: rest,
//     //   }),
//     //   invalidatesTags: (result, error, { id }) => [
//     //     { type: "Product", id },
//     //     { type: "Product", id: "LIST" },
//     //   ],
//     // }),

//     updateProduct: builder.mutation({
//       query: ({ id, ...rest }) => ({
//         url: `/api/products/${id}`,
//         method: "PATCH", // ✅ This matches your backend
//         body: rest,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "Product", id },
//         { type: "Product", id: "LIST" },
//       ],
//     }),

//     // DELETE: Delete a product
//     deleteProduct: builder.mutation({
//       query: ({ id }) => ({
//         url: `/api/products/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "Product", id },
//         { type: "Product", id: "LIST" },
//       ],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetProductsQuery,
//   useGetProductsByCategoryQuery,
//   useGetProductByIdQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productApiSlice;

import { apiSlice } from "./apislice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET: All products
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // ✅ GET: Products by category
    getProductsByCategory: builder.query({
      query: (category: string) => `/api/products/category/${category}`,
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Product", id: `CATEGORY-${arg}` },
            ]
          : [{ type: "Product", id: `CATEGORY-${arg}` }],
    }),

    // GET: Single product by ID
    getProductById: builder.query({
      query: (id: string) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // POST: Create a product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/api/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // PATCH: Update a product
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/products/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // DELETE: Delete a product
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;

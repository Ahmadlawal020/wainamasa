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

    // PUT: Update a product
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
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
// import { apiSlice } from "./apislice";

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all products
//     getProducts: builder.query({
//       query: () => "/api/products",
//       providesTags: (result = [], error, arg) =>
//         result
//           ? [
//               ...result.map(({ id }: { id: string }) => ({
//                 type: "Product" as const,
//                 id,
//               })),
//               { type: "Product", id: "LIST" },
//             ]
//           : [{ type: "Product", id: "LIST" }],
//     }),

//     // Get a single product by ID
//     getProductById: builder.query({
//       query: (id: string) => `/api/products/${id}`,
//       providesTags: (result, error, id) => [{ type: "Product", id }],
//     }),

//     // Create new product
//     createProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/api/products",
//         method: "POST",
//         body: newProduct,
//       }),
//       invalidatesTags: [{ type: "Product", id: "LIST" }],
//     }),

//     // Update product
//     updateProduct: builder.mutation({
//       query: (updatedProduct) => ({
//         url: `/api/products/${updatedProduct.id}`,
//         method: "PATCH",
//         body: updatedProduct,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "Product", id },
//         { type: "Product", id: "LIST" },
//       ],
//     }),

//     // Delete product
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

//     // ✅ Get unique product categories
//     getCategories: builder.query<string[], void>({
//       query: () => "/api/products/categories",
//       providesTags: [{ type: "Category", id: "LIST" }],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetCategoriesQuery,
// } = productsApiSlice;

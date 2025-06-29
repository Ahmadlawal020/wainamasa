// // services/orderApi.ts
// import { apiSlice } from "./apislice"; // your base RTK Query API

// export const orderApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Verify Paystack Payment
//     verifyPayment: builder.mutation<
//       any,
//       {
//         reference: string;
//         orderData: {
//           buyer: {
//             fullName: string;
//             phoneNumber: string;
//             emailAddress: string;
//           };
//           items: Array<{ product: string; quantity: number }>;
//           delivery: {
//             type: "pickup" | "delivery";
//             address: string;
//           };
//           isScheduled: boolean;
//           scheduledDate: string;
//           scheduledTime: string;
//           paymentOnDelivery: boolean;
//           totalAmount: number;
//         };
//       }
//     >({
//       query: ({ reference, orderData }) => ({
//         url: "/api/paystack/verify", // full path (recommended)
//         method: "POST",
//         body: { reference, orderData },
//       }),
//       // No tags needed unless orders are listed elsewhere
//     }),

//     // // ✅ Optionally add order listing for admin panel
//     // getOrders: builder.query<any[], void>({
//     //   query: () => "/api/orders",
//     //   providesTags: (result = []) =>
//     //     result
//     //       ? [
//     //           ...result.map(({ _id }: { _id: string }) => ({
//     //             type: "Order" as const,
//     //             id: _id,
//     //           })),
//     //           { type: "Order", id: "LIST" },
//     //         ]
//     //       : [{ type: "Order", id: "LIST" }],
//     // }),
//     // Add support for query params
//     getOrders: builder.query<any[], { status?: string }>({
//       query: ({ status } = {}) => {
//         const queryString = status ? `?status=${status}` : "";
//         return `/api/orders${queryString}`;
//       },
//       providesTags: (result = []) =>
//         result
//           ? [
//               ...result.map(({ _id }: { _id: string }) => ({
//                 type: "Order" as const,
//                 id: _id,
//               })),
//               { type: "Order", id: "LIST" },
//             ]
//           : [{ type: "Order", id: "LIST" }],
//     }),

//     // ✅ Get order by ID
//     getOrderById: builder.query({
//       query: (id: string) => `/api/orders/${id}`,
//       providesTags: (result, error, id) => [{ type: "Order", id }],
//     }),

//     // ✅ Update order status
//     updateOrderStatus: builder.mutation({
//       query: ({ id, status }: { id: string; status: string }) => ({
//         url: `/api/orders/${id}`,
//         method: "PATCH",
//         body: { status },
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         { type: "Order", id },
//         { type: "Order", id: "LIST" },
//       ],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useVerifyPaymentMutation,
//   useGetOrdersQuery,
//   useGetOrderByIdQuery,
//   useUpdateOrderStatusMutation,
// } = orderApiSlice;

import { apiSlice } from "./apislice";

// === Types ===
interface Buyer {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
}

interface OrderItem {
  product: string;
  quantity: number;
}

interface Delivery {
  type: "pickup" | "delivery";
  address: string;
}

export interface Order {
  _id: string;
  buyer: Buyer;
  items: OrderItem[];
  totalPrice: number;
  delivery: Delivery;
  paymentOnDelivery: boolean;
  isScheduled: boolean;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface VerifyPaymentRequest {
  reference: string;
  orderData: {
    buyer: Buyer;
    items: OrderItem[];
    delivery: Delivery;
    isScheduled: boolean;
    scheduledDate: string;
    scheduledTime: string;
    paymentOnDelivery: boolean;
    totalAmount: number;
  };
}

interface VerifyPaymentResponse {
  message: string;
  order: Order;
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Verify Paystack Payment
    verifyPayment: builder.mutation<
      VerifyPaymentResponse,
      VerifyPaymentRequest
    >({
      query: ({ reference, orderData }) => ({
        url: "/api/paystack/verify",
        method: "POST",
        body: { reference, orderData },
      }),
    }),

    // ✅ Get Orders (with optional filter)
    getOrders: builder.query<Order[], { status?: string }>({
      query: ({ status } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        return `/api/orders?${params.toString()}`;
      },
      providesTags: (result = []) =>
        result.length > 0
          ? [
              ...result.map((order) => ({
                type: "Order" as const,
                id: order._id,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    // ✅ Get Single Order by ID
    getOrderById: builder.query<Order, string>({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // ✅ Update Order Status
    updateOrderStatus: builder.mutation<
      { message: string; updatedOrder: Order },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/api/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

// === RTK Hooks ===
export const {
  useVerifyPaymentMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = orderApiSlice;

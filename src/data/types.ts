export type ProductCategory =
  | "masa"
  | "meat"
  | "soups"
  | "drinks"
  | "extras"
  | "featured";

export interface PackageOption {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  category: ProductCategory;
  featured?: boolean;
  hasPackageOptions?: boolean;
  packageOptions?: PackageOption[];
  minimumOrder?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
  selectedPackage?: PackageOption;
}

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type DeliveryMethod = "pickup" | "delivery";

export interface DeliveryZone {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: Customer;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  deliveryZone?: string;
  deliveryAddress?: string;
  scheduledTime?: Date;
  createdAt: Date;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentReference?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  deliveryAddresses?: string[];
  orders?: Order[];
}

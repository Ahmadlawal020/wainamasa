// import { Product } from './types';

// export const products: Product[] = [
//   {
//     id: '1',
//     name: 'Plain Masa',
//     description: 'Traditional fermented rice cake, a staple of Northern Nigerian cuisine.',
//     price: 300, // Price per single piece
//     imageSrc: '/lovable-uploads/80025eac-cdc2-4952-8088-cfb2126342c1.png',
//     category: 'masa',
//     featured: true,
//     hasPackageOptions: true,
//     minimumOrder: 4,
//     packageOptions: [
//       {
//         id: 'solo',
//         name: 'Solo Pack',
//         quantity: 4,
//         price: 1200,
//         description: '4 Masa pieces, perfect for one person'
//       },
//       {
//         id: 'family',
//         name: 'Family Pack',
//         quantity: 8,
//         price: 2400,
//         description: '8 Masa pieces, great for sharing'
//       },
//       {
//         id: 'custom',
//         name: 'Custom Order',
//         quantity: 4,
//         price: 1200,
//         description: 'Choose your own quantity (minimum 4 pieces)'
//       }
//     ]
//   },
//   {
//     id: '5',
//     name: 'Miyan Taushe',
//     description: 'Traditional pumpkin soup with rich flavors and spices.',
//     price: 1000,
//     imageSrc: '/lovable-uploads/65af3008-80ea-421b-a486-7f16e0141d2c.png',
//     category: 'soups',
//     featured: true,
//   },
//   {
//     id: '2',
//     name: 'Beef',
//     description: 'Tender beef, perfectly seasoned with traditional Northern spices.',
//     price: 300,
//     imageSrc: '/placeholder.svg',
//     category: 'meat',
//   },
//   {
//     id: '3',
//     name: 'Brisket Bone',
//     description: 'Savory brisket bone, flavorful and tender.',
//     price: 300,
//     imageSrc: '/placeholder.svg',
//     category: 'meat',
//   },
//   {
//     id: '6',
//     name: 'Cowtail Peppersoup',
//     description: 'Spicy and aromatic soup with tender cow tail and traditional spices.',
//     price: 3500,
//     imageSrc: '/placeholder.svg',
//     category: 'soups',
//   },
//   {
//     id: '13',
//     name: 'Ram Meat Peppersoup',
//     description: 'Rich and flavorful peppersoup with tender ram meat and traditional Northern spices.',
//     price: 3500,
//     imageSrc: '/placeholder.svg',
//     category: 'soups',
//     featured: true,
//   },
//   {
//     id: '4',
//     name: 'Peppered Chicken',
//     description: 'Spicy chicken prepared with our special blend of peppers and spices.',
//     price: 2000,
//     imageSrc: '/placeholder.svg',
//     category: 'meat',
//     featured: true,
//   },
//   {
//     id: '9',
//     name: 'Zobo Drink',
//     description: 'Refreshing hibiscus drink with a hint of ginger and spices. 50cl bottle.',
//     price: 1000,
//     imageSrc: '/placeholder.svg',
//     category: 'drinks',
//     featured: true,
//   },
//   {
//     id: '10',
//     name: 'Kunun Aya (Tiger Nut)',
//     description: 'Nutritious tiger nut drink, slightly sweetened. 50cl bottle.',
//     price: 1500,
//     imageSrc: '/placeholder.svg',
//     category: 'drinks',
//   },
//   {
//     id: '11',
//     name: 'Kunun Tsamiya',
//     description: 'Traditional millet drink with tamarind. 50cl bottle.',
//     price: 1000,
//     imageSrc: '/placeholder.svg',
//     category: 'drinks',
//   },
//   {
//     id: '12',
//     name: 'Ginger Drink',
//     description: 'Refreshing and spicy ginger drink. 50cl bottle.',
//     price: 1000,
//     imageSrc: '/placeholder.svg',
//     category: 'drinks',
//   },
//   {
//     id: '7',
//     name: 'Dry Pepper (Yaji)',
//     description: 'Our special blend of dry pepper spices, perfect for enhancing any meal.',
//     price: 300,
//     imageSrc: '/placeholder.svg',
//     category: 'extras',
//   },
//   {
//     id: '8',
//     name: 'Man Shanu',
//     description: 'Traditional butter oil, adds rich flavor to your meals.',
//     price: 500,
//     imageSrc: '/placeholder.svg',
//     category: 'extras',
//   },
// ];

// export const getProductsByCategory = (category: string) => {
//   return products.filter(product => product.category === category);
// };

// export const getFeaturedProducts = () => {
//   return products.filter(product => product.featured);
// };

// export const getProductById = (id: string) => {
//   return products.find(product => product.id === id);
// };

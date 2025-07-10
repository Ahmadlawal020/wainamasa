export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
}

export const deliveryZones: DeliveryZone[] = [
  { id: "citec-estate-mbora", name: "Citec Estate – Mbora", price: 2400 },
  { id: "nile-university", name: "Nile University", price: 2400 },
  { id: "baze-university", name: "Baze University", price: 2400 },
  { id: "apo", name: "Apo", price: 3400 },
  { id: "asokoro", name: "Asokoro", price: 4500 },
  { id: "central-area", name: "Central Area", price: 3500 }, // Price based on your example
  { id: "dawaki", name: "Dawaki", price: 2900 },
  { id: "dakibiyu", name: "Dakibiyu", price: 2400 },
  { id: "durumi", name: "Durumi", price: 3200 },
  { id: "dutse-alhaji", name: "Dutse Alhaji", price: 4000 },
  { id: "gaduwa", name: "Gaduwa", price: 3000 },
  { id: "galadimawa", name: "Galadimawa", price: 2500 },
  { id: "games-village", name: "Games Village", price: 2500 },
  { id: "garki-area-1", name: "Garki – Area 1", price: 3000 },
  { id: "garki-area-2", name: "Garki – Area 2", price: 3400 },
  { id: "garki-area-3", name: "Garki – Area 3", price: 3800 },
  { id: "garki-area-7", name: "Garki – Area 7", price: 3500 },
  { id: "garki-area-8", name: "Garki – Area 8", price: 3500 },
  { id: "garki-area-10", name: "Garki – Area 10", price: 3100 },
  { id: "garki-area-11", name: "Garki – Area 11", price: 3600 },
  { id: "garki-ii", name: "Garki II", price: 3600 },
  { id: "gudu", name: "Gudu", price: 3000 },
  { id: "guzape", name: "Guzape", price: 4300 },
  { id: "idu", name: "Idu", price: 2400 },
  { id: "jabi", name: "Jabi", price: 2500 },
  { id: "jahi", name: "Jahi", price: 2500 },
  { id: "kabusa", name: "Kabusa", price: 3000 },
  { id: "kado", name: "Kado", price: 2700 },
  { id: "karmo", name: "Karmo", price: 2400 },
  { id: "karsana", name: "Karsana", price: 4100 },
  { id: "katampe", name: "Katampe", price: 2900 },
  { id: "katampe-extension", name: "Katampe Extension", price: 2800 },
  { id: "katampe-hill", name: "Katampe Hill", price: 3700 },
  { id: "kukwaba", name: "Kukwaba", price: 2500 },
  { id: "kubwa", name: "Kubwa", price: 5000 },
  { id: "life-camp", name: "Life Camp", price: 2400 },
  { id: "life-camp-brains-hammers-city", name: "Life Camp – Brains & Hammers City", price: 2800 },
  { id: "lokogoma", name: "Lokogoma", price: 2500 },
  { id: "lugbe-fha", name: "Lugbe – FHA", price: 2800 },
  { id: "lugbe-pyakasa", name: "Lugbe – Pyakasa", price: 3000 },
  { id: "lugbe-sabon-lugbe", name: "Lugbe – Sabon Lugbe", price: 3800 },
  { id: "maitama", name: "Maitama", price: 3100 },
  { id: "mbora", name: "Mbora", price: 2400 },
  { id: "mpape", name: "Mpape", price: 4200 },
  { id: "piwoyi", name: "Piwoyi", price: 2400 },
  { id: "utako", name: "Utako", price: 2400 },
  { id: "wuse-zone-1", name: "Wuse – Zone 1", price: 2800 },
  { id: "wuse-zone-2", name: "Wuse – Zone 2", price: 2400 },
  { id: "wuse-zone-3", name: "Wuse – Zone 3", price: 2800 },
  { id: "wuse-zone-4", name: "Wuse – Zone 4", price: 2800 },
  { id: "wuse-zone-5", name: "Wuse – Zone 5", price: 2400 },
  { id: "wuse-zone-6", name: "Wuse – Zone 6", price: 2400 },
  { id: "wuse-zone-7", name: "Wuse – Zone 7", price: 2600 },
  { id: "wuse-2", name: "Wuse 2", price: 2900 },
  { id: "wuye", name: "Wuye", price: 2400 },
];

export const getDeliveryZoneById = (id: string): DeliveryZone | undefined => {
  return deliveryZones.find((zone) => zone.id === id);
};

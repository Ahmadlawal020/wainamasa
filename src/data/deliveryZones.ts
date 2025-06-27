export interface DeliveryZone {
  id: string;
  name: string;
  price: number;
}

export const deliveryZones: DeliveryZone[] = [
  { id: "central", name: "Central Area", price: 1500 },
  { id: "maitama", name: "Maitama", price: 1800 },
  { id: "wuse", name: "Wuse", price: 1500 },
  { id: "garki", name: "Garki", price: 1500 },
  { id: "asokoro", name: "Asokoro", price: 2000 },
  { id: "gwarinpa", name: "Gwarinpa", price: 2500 },
  { id: "jabi", name: "Jabi", price: 2000 },
  { id: "lokogoma", name: "Lokogoma", price: 2500 },
  { id: "lugbe", name: "Lugbe", price: 3000 },
  { id: "kubwa", name: "Kubwa", price: 3500 },
  { id: "lifecamp", name: "Life Camp", price: 2500 },
  { id: "dawaki", name: "Dawaki", price: 3000 },
  { id: "karu", name: "Karu", price: 3500 },
  { id: "dutse", name: "Dutse", price: 3500 },
  { id: "mbora", name: "Mbora", price: 2000 },
  { id: "katampe", name: "Katampe", price: 2500 },
  { id: "apo", name: "Apo", price: 2500 },
  { id: "utako", name: "Utako", price: 2000 },
  { id: "wuye", name: "Wuye", price: 2000 },
  { id: "durumi", name: "Durumi", price: 2000 },
  { id: "gudu", name: "Gudu", price: 2200 },
  { id: "jahi", name: "Jahi", price: 2200 },
];

export const getDeliveryZoneById = (id: string): DeliveryZone | undefined => {
  return deliveryZones.find((zone) => zone.id === id);
};

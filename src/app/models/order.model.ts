export interface Order {
  Order_ID: number;       // Unique ID used for delete and identifying orders
  Flavor: string;         // e.g., "PEPPERONI"
  Crust: string;          // e.g., "THIN"
  Size: string;           // e.g., "L"
  Table_No: number;       // e.g., 5
  Timestamp: string;      // ISO date string
}

import type {
  Grn,
  GrnReceiptStatus,
  MaterialType,
  Product,
  ProductionOrder,
  ProductionOrderStatus,
  PurchaseOrder,
  PurchaseOrderStatus,
  StatusTone,
  Supplier,
} from "../types/supply-chain.types";

/** Rows shown per page across every list table. */
export const LIST_PAGE_SIZE = 12;

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=d1f4e0`;

/* ------------------------------------------------------------------ *
 * Status → pill tone
 * ------------------------------------------------------------------ */

export const PRODUCTION_ORDER_STATUS_TONE: Record<ProductionOrderStatus, StatusTone> = {
  Pending: "amber",
  Approved: "blue",
  Completed: "green",
};

export const PURCHASE_ORDER_STATUS_TONE: Record<PurchaseOrderStatus, StatusTone> = {
  Pending: "amber",
  Partial: "magenta",
  "Email Sent": "indigo",
  Fulfilled: "blue",
  Confirmed: "green",
  Cancel: "red",
};

export const MATERIAL_TYPE_TONE: Record<MaterialType, StatusTone> = {
  Tea: "amber",
  "Packing Material": "blue",
  "Flavour and Herbs": "magenta",
};

export const GRN_RECEIPT_TONE: Record<GrnReceiptStatus, StatusTone> = {
  Full: "green",
  Partial: "amber",
  Rejected: "red",
};

/* ------------------------------------------------------------------ *
 * Product List
 * ------------------------------------------------------------------ */

const PRODUCT_SEED: Array<[name: string, description: string, units: number]> = [
  ["Ceylon Black Tea", "Single-origin high grown black tea, BOPF grade", 100],
  ["Ceylon Green Tea", "Steamed green tea leaves from Nuwara Eliya", 150],
  ["Jasmine Green Tea", "Green tea infused with jasmine flowers", 150],
  ["Earl Grey Classic", "Black tea blended with bergamot oil", 150],
  ["English Breakfast", "Full-bodied blend of Assam and Ceylon leaves", 150],
  ["Peppermint Herbal", "Caffeine-free peppermint leaf infusion", 150],
  ["Chamomile Calm", "Whole chamomile flowers, evening blend", 160],
  ["Ginger Lemon Tea", "Black tea with dried ginger and lemon peel", 170],
  ["Cinnamon Spice Tea", "Ceylon cinnamon bark with black tea", 190],
  ["Silver Tips White", "Hand-picked unopened buds, limited batch", 50],
  ["Masala Chai", "Black tea with cardamom, clove and pepper", 150],
  ["Lemongrass Infusion", "Dried lemongrass, caffeine free", 270],
  ["Vanilla Ceylon", "Black tea with natural vanilla extract", 140],
  ["Berry Hibiscus", "Hibiscus with dried berries, served iced", 120],
  ["Oolong Reserve", "Semi-oxidised leaves, medium roast", 80],
  ["Matcha Latte Mix", "Stone-ground matcha with milk powder", 90],
  ["Rooibos Red", "South African rooibos, naturally sweet", 130],
  ["Turmeric Wellness", "Turmeric, ginger and black pepper blend", 110],
  ["Decaf Ceylon", "CO2 decaffeinated Ceylon black tea", 100],
  ["Mango Iced Tea", "Black tea with mango pieces for cold brew", 200],
  ["Blue Butterfly Pea", "Colour-changing floral infusion", 60],
  ["Cardamom Tea", "Ceylon black tea with crushed cardamom", 150],
  ["Moringa Leaf Tea", "Dried moringa leaves, high in antioxidants", 95],
  ["Festive Gift Blend", "Seasonal spiced blend in gift carton", 40],
];

export const PRODUCTS: Product[] = PRODUCT_SEED.map(([name, description, unitsPerCarton], index) => {
  const productId = `P${String(index + 1).padStart(4, "0")}`;
  return { id: productId, productId, name, description, unitsPerCarton };
});

/* ------------------------------------------------------------------ *
 * Production Order List
 * ------------------------------------------------------------------ */

const CUSTOMER_NAMES = [
  "Dissanayake",
  "Fernando",
  "Perera",
  "Jayawardena",
  "Wickramasinghe",
  "Rathnayake",
  "Gunasekara",
  "Samarasinghe",
];

const PRODUCTION_STATUS_CYCLE: ProductionOrderStatus[] = [
  "Approved",
  "Completed",
  "Approved",
  "Completed",
  "Pending",
  "Approved",
  "Completed",
  "Pending",
];

export const PRODUCTION_ORDERS: ProductionOrder[] = Array.from({ length: 24 }, (_, index) => {
  const sequence = String(index + 1).padStart(3, "0");
  const customerName = CUSTOMER_NAMES[index % CUSTOMER_NAMES.length];

  return {
    id: `Or${String(index + 1).padStart(4, "0")}`,
    orderId: `Or${String(index + 1).padStart(4, "0")}`,
    productId: `P${String(index + 1).padStart(4, "0")}`,
    salesOrderId: `S${String(index + 1).padStart(4, "0")}`,
    qtyToProduce: `PRD_TEA_${sequence}`,
    customer: {
      name: customerName,
      phone: `078 8200 ${String(310 + index)}`,
      avatarUrl: avatar(`${customerName}-${index}`),
    },
    status: PRODUCTION_STATUS_CYCLE[index % PRODUCTION_STATUS_CYCLE.length],
  };
});

/* ------------------------------------------------------------------ *
 * Supplier List
 * ------------------------------------------------------------------ */

const SUPPLIER_SEED: Array<[
  contactName: string,
  company: string,
  email: string,
  address: string,
  materialType: MaterialType,
]> = [
  ["Dissanayake", "Greenleaf Estates", "greenleaf@gmail.com", "45 Main Street, Colombo 03", "Tea"],
  ["Fernando", "Lanka Pack Co.", "lankapack@gmail.com", "12 Station Road, Gampaha", "Packing Material"],
  ["Perera", "Herbal Source Ltd", "herbalsource@gmail.com", "88 Temple Lane, Kandy", "Flavour and Herbs"],
  ["Silva", "Ceylon Carton Works", "cartonworks@gmail.com", "7 Industrial Zone, Ja-Ela", "Packing Material"],
  ["Bandara", "Highland Tea Growers", "highland@gmail.com", "230 Estate Road, Nuwara Eliya", "Tea"],
  ["Jayasuriya", "Spice Island Exports", "spiceisland@gmail.com", "19 Market Street, Matale", "Flavour and Herbs"],
  ["Rathnayake", "PrintPack Lanka", "printpack@gmail.com", "56 Canal Road, Peliyagoda", "Packing Material"],
  ["Gunasekara", "Uva Leaf Traders", "uvaleaf@gmail.com", "3 Hill Street, Badulla", "Tea"],
  ["Weerasinghe", "Aroma Botanicals", "aroma@gmail.com", "102 Lake Road, Kurunegala", "Flavour and Herbs"],
  ["Samarasinghe", "Sunrise Packaging", "sunrisepack@gmail.com", "41 Negombo Road, Wattala", "Packing Material"],
  ["Ekanayake", "Dimbula Tea Co.", "dimbula@gmail.com", "9 Factory Lane, Hatton", "Tea"],
  ["Mendis", "Island Foils Pvt Ltd", "islandfoils@gmail.com", "15 Port Access Road, Colombo 15", "Packing Material"],
  ["Abeysekara", "Cinnamon Valley", "cinnamonvalley@gmail.com", "6 Coast Road, Galle", "Flavour and Herbs"],
  ["Wijeratne", "Kelani Tea Estates", "kelanitea@gmail.com", "77 Estate Drive, Avissawella", "Tea"],
  ["Karunaratne", "EcoWrap Solutions", "ecowrap@gmail.com", "23 Green Park, Moratuwa", "Packing Material"],
  ["Herath", "Ceylon Herb House", "herbhouse@gmail.com", "34 Lily Avenue, Anuradhapura", "Flavour and Herbs"],
  ["Peiris", "Ruhuna Tea Exports", "ruhunatea@gmail.com", "68 Beach Road, Matara", "Tea"],
  ["Rodrigo", "Label Line Printers", "labelline@gmail.com", "5 Print Street, Kelaniya", "Packing Material"],
  ["Senanayake", "Pure Essence Oils", "pureessence@gmail.com", "91 Garden Road, Kegalle", "Flavour and Herbs"],
  ["Amarasinghe", "Sabaragamuwa Leaf", "sabaleaf@gmail.com", "14 Mountain View, Ratnapura", "Tea"],
];

export const SUPPLIERS: Supplier[] = SUPPLIER_SEED.map(
  ([contactName, company, email, address, materialType], index) => {
    const supplierId = `SU-${String(index + 1).padStart(4, "0")}`;
    return {
      id: supplierId,
      supplierId,
      contact: {
        name: company,
        phone: `078 8200 ${String(320 + index)}`,
        avatarUrl: avatar(`${contactName}-${index}`),
      },
      email,
      phoneNumber: `07712345${String(60 + index).slice(-2)}`,
      address,
      materialType,
    };
  },
);

/* ------------------------------------------------------------------ *
 * Purchase Order List
 * ------------------------------------------------------------------ */

const PURCHASE_ORDER_SEED: Array<[
  productName: string,
  materialName: string,
  quantity: number,
  unitPrice: number,
  status: PurchaseOrderStatus,
]> = [
  ["Herbal Tea Box", "Black Tea", 200, 100, "Partial"],
  ["Herbal Tea Box", "Kraft Carton", 500, 45, "Pending"],
  ["Green Tea Pouch", "Green Tea Leaves", 320, 130, "Email Sent"],
  ["Earl Grey Carton", "Bergamot Oil", 60, 480, "Fulfilled"],
  ["Ceylon Black Tea", "Black Tea", 800, 95, "Confirmed"],
  ["Jasmine Green Tea", "Jasmine Flowers", 120, 260, "Cancel"],
  ["Masala Chai Box", "Cardamom", 90, 720, "Pending"],
  ["Peppermint Sachets", "Peppermint Leaf", 240, 150, "Partial"],
  ["Gift Blend Carton", "Printed Sleeve", 400, 38, "Pending"],
  ["Iced Tea Refill", "Mango Pieces", 180, 210, "Cancel"],
  ["Chamomile Calm", "Chamomile Flowers", 150, 340, "Pending"],
  ["Cinnamon Spice Tea", "Ceylon Cinnamon", 110, 560, "Partial"],
  ["Silver Tips White", "White Tea Buds", 40, 1450, "Confirmed"],
  ["Rooibos Red", "Rooibos Leaf", 260, 190, "Email Sent"],
  ["Vanilla Ceylon", "Vanilla Extract", 55, 890, "Fulfilled"],
  ["Turmeric Wellness", "Turmeric Powder", 300, 120, "Pending"],
  ["Oolong Reserve", "Oolong Leaf", 130, 410, "Partial"],
  ["Matcha Latte Mix", "Matcha Powder", 70, 980, "Confirmed"],
  ["Lemongrass Infusion", "Lemongrass", 280, 85, "Email Sent"],
  ["Decaf Ceylon", "Decaf Black Tea", 220, 165, "Pending"],
  ["Berry Hibiscus", "Hibiscus Petals", 170, 230, "Fulfilled"],
  ["Ginger Lemon Tea", "Dried Ginger", 200, 175, "Cancel"],
];

export const PURCHASE_ORDERS: PurchaseOrder[] = PURCHASE_ORDER_SEED.map(
  ([productName, materialName, quantity, unitPrice, status], index) => {
    const orderId = `PO-${String(index + 1).padStart(4, "0")}`;
    return { id: orderId, orderId, productName, materialName, quantity, unitPrice, status };
  },
);

/* ------------------------------------------------------------------ *
 * GRN List
 * ------------------------------------------------------------------ */

const GRN_SEED: Array<[
  supplierName: string,
  linkedPo: string,
  receivingDate: string,
  receiptStatus: GrnReceiptStatus,
]> = [
  ["Ceylon Tea Growers", "PO-2312", "12th Feb 2026", "Full"],
  ["Lanka Pack Co.", "PO-2313", "12th Feb 2026", "Partial"],
  ["Herbal Source Ltd", "PO-2314", "13th Feb 2026", "Full"],
  ["Greenleaf Estates", "PO-2315", "14th Feb 2026", "Full"],
  ["Sunrise Packaging", "PO-2316", "14th Feb 2026", "Partial"],
  ["Highland Tea Growers", "PO-2317", "16th Feb 2026", "Full"],
  ["Spice Island Exports", "PO-2318", "17th Feb 2026", "Rejected"],
  ["PrintPack Lanka", "PO-2319", "18th Feb 2026", "Full"],
  ["Uva Leaf Traders", "PO-2320", "19th Feb 2026", "Full"],
  ["Aroma Botanicals", "PO-2321", "20th Feb 2026", "Partial"],
  ["Dimbula Tea Co.", "PO-2322", "21st Feb 2026", "Full"],
  ["Island Foils Pvt Ltd", "PO-2323", "23rd Feb 2026", "Full"],
  ["Cinnamon Valley", "PO-2324", "24th Feb 2026", "Partial"],
  ["Kelani Tea Estates", "PO-2325", "25th Feb 2026", "Full"],
  ["EcoWrap Solutions", "PO-2326", "26th Feb 2026", "Rejected"],
  ["Ceylon Herb House", "PO-2327", "27th Feb 2026", "Full"],
  ["Ruhuna Tea Exports", "PO-2328", "28th Feb 2026", "Full"],
  ["Label Line Printers", "PO-2329", "2nd Mar 2026", "Partial"],
  ["Pure Essence Oils", "PO-2330", "3rd Mar 2026", "Full"],
  ["Sabaragamuwa Leaf", "PO-2331", "4th Mar 2026", "Full"],
];

export const GRNS: Grn[] = GRN_SEED.map(
  ([supplierName, linkedPo, receivingDate, receiptStatus], index) => {
    const grnId = `GRN-${String(index + 1).padStart(4, "0")}`;
    return { id: grnId, grnId, supplierName, linkedPo, receivingDate, receiptStatus };
  },
);

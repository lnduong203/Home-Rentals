import {
  BarChart2,
  Users,
  LogOut,
  ShoppingCart,
  Settings,
  Home,
} from "lucide-react";

export const SIDE_BAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", path: "/" },
  { name: "Listings", icon: Home, color: "#8B5CF6", path: "listings" },
  { name: "Users", icon: Users, color: "#EC4899", path: "/users" },
  { name: "Bookings", icon: ShoppingCart, color: "#F59E0B", path: "/bookings" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", path: "/settings" },
  { name: "LogOut ", icon: LogOut, color: "#3B82F6", path: "/logout" },
];

export const COLORS = [
  "#ffffff",
  "#1E90FF",
  "#FFD700",
  "#FF4500",
  "#32CD32",
  "#00CED1",
  "#FF6347",
  "#4682B4",
  "#87CEEB",
  "#8B4513",
  "#2F4F4F",
  "#228B22",
  "#00FFFF",
  "#DAA520",
  "#A52A2A",
  "#FFD700",
];

export const CATEGORIES = [
  "All",
  "Beachfront",
  "Windmills",
  "Iconic cities",
  "Countryside",
  "Amazing Pools",
  "Islands",
  "Lakefront",
  "Ski-in/out",
  "Castles",
  "Caves",
  "Camping",
  "Arctic",
  "Desert",
  "Barns",
  "Luxury",
];

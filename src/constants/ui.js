import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

export const SIDEBAR_WIDTH = 260;

export const MENU_ITEMS = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Categories', icon: CategoryIcon, path: '/categories' },
  { text: 'Products', icon: ShoppingCartIcon, path: '/products' },
  { text: 'Orders', icon: ReceiptIcon, path: '/orders' },
  { text: 'Customers', icon: PeopleIcon, path: '/customers' },
  { text: 'Inventory', icon: InventoryIcon, path: '/inventory' },
  { text: 'Settings', icon: SettingsIcon, path: '/settings' },
];

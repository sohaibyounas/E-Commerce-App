import React from 'react';
import { Box, Grid, Typography, Chip } from '@mui/material';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import { 
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material';

const columns = [
  { id: 'id', label: 'Order ID', minWidth: 100 },
  { id: 'customer', label: 'Customer', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 120 },
  { 
    id: 'amount', 
    label: 'Amount', 
    minWidth: 100, 
    align: 'right',
    format: (value) => `$${value.toFixed(2)}`,
  },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 100,
    format: (value) => {
      const color = value === 'Delivered' ? 'success' : value === 'Pending' ? 'warning' : 'primary';
      return <Chip label={value} color={color} size="small" />;
    }
  },
];

const rows = [
  { id: '#ORD-001', customer: 'John Doe', date: '2023-10-25', amount: 120.50, status: 'Delivered' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2023-10-25', amount: 350.00, status: 'Pending' },
  { id: '#ORD-003', customer: 'Bob Johnson', date: '2023-10-24', amount: 45.99, status: 'Processing' },
  { id: '#ORD-004', customer: 'Alice Brown', date: '2023-10-23', amount: 890.00, status: 'Delivered' },
  { id: '#ORD-005', customer: 'Charlie Davis', date: '2023-10-22', amount: 55.20, status: 'Delivered' },
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Revenue" 
            value="$24,500" 
            icon={<AttachMoneyIcon />}
            trend="up"
            trendValue="12.5%"
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Orders" 
            value="1,240" 
            icon={<ShoppingCartIcon />}
            trend="up"
            trendValue="8.2%"
            color="#ec4899"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Total Customers" 
            value="845" 
            icon={<PeopleIcon />}
            trend="down"
            trendValue="2.1%"
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard 
            title="Pending Deliveries" 
            value="45" 
            icon={<LocalShippingIcon />}
            trend="up"
            trendValue="5.4%"
            color="#10b981"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable 
            title="Recent Orders" 
            columns={columns} 
            data={rows} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

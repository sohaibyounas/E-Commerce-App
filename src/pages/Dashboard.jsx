import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Chip, Alert, CircularProgress } from '@mui/material';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import { fetchDashboard } from '../api/dashboardApi';
import { 
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  LocalShipping as LocalShippingIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon
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
    format: (value) => `$${Number(value).toFixed(2)}`,
  },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 100,
    format: (value) => {
      const colorMap = {
        Delivered: 'success',
        Pending: 'warning',
        Processing: 'info',
        Shipped: 'primary',
        Cancelled: 'error',
      };
      const color = colorMap[value] || 'default';
      return <Chip label={value} color={color} size="small" />;
    }
  },
];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetchDashboard();
        setData(res.data);
        setError('');
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        data && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Total Revenue" 
                  value={`$${Number(data.stats.totalRevenue || 0).toLocaleString()}`} 
                  icon={<AttachMoneyIcon />}
                  trend="up"
                  trendValue="Live"
                  color="#6366f1"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Total Orders" 
                  value={data.stats.totalOrders || 0} 
                  icon={<ShoppingCartIcon />}
                  trend="up"
                  trendValue="All time"
                  color="#ec4899"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Total Customers" 
                  value={data.stats.totalCustomers || 0} 
                  icon={<PeopleIcon />}
                  trend="up"
                  trendValue="All time"
                  color="#f59e0b"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Pending Deliveries" 
                  value={data.stats.pendingDeliveries || 0} 
                  icon={<LocalShippingIcon />}
                  trend="up"
                  trendValue="Pending"
                  color="#10b981"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Products" 
                  value={data.stats.totalProducts || 0} 
                  icon={<InventoryIcon />}
                  trend="up"
                  trendValue="In store"
                  color="#8b5cf6"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard 
                  title="Categories" 
                  value={data.stats.totalCategories || 0} 
                  icon={<CategoryIcon />}
                  trend="up"
                  trendValue="Active"
                  color="#0ea5e9"
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DataTable 
                  title="Recent Orders" 
                  columns={columns} 
                  data={data.recentOrders || []} 
                />
              </Grid>
            </Grid>
          </>
        )
      )}
    </Box>
  );
};

export default Dashboard;
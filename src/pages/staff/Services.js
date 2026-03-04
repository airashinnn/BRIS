import { Box, Typography, Grid, Paper, Button } from "@mui/material";

const Services = () => {
  const services = [
    { id: 1, name: "Barangay Clearance", description: "Request for barangay clearance", fee: "₱50" },
    { id: 2, name: "Certificate of Residency", description: "Proof of residency certificate", fee: "₱30" },
    { id: 3, name: "Business Permit", description: "Permit for business operations", fee: "₱500" },
    { id: 4, name: "Indigency Certificate", description: "Certificate of indigency", fee: "Free" },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Services</Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>{service.name}</Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>{service.description}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}><strong>Fee:</strong> {service.fee}</Typography>
              <Button variant="contained" sx={{ mt: 'auto' }}>Apply Now</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
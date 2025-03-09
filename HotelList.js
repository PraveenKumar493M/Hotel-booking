import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Available Hotels
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card
              onClick={() => navigate(`/check-in/${hotel.id}`)}
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelList;

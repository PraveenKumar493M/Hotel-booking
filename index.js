const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// User Registration
app.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await prisma.userJson.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
  
      const user = await prisma.userJson.create({ data: { email, password } });
      res.status(201).json({ message: "Registration successful", user });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

// Book a Hotel
app.post("/book-hotel", async (req, res) => {
  try {
    const { userId, hotelName, checkIn, checkOut, family } = req.body;
    const booking = await prisma.booking.create({
      data: {
        userId,
        hotelName,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        family: { create: family },
      },
      include: { family: true },
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to book hotel" });
  }
});

// Get User Bookings
app.get("/bookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId) },
      include: { family: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

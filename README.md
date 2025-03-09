# Hotel-booking
Reactjs, prisma, sample hotel booking application

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model UserJson { 
  id       Int    @id @default(autoincrement()) 
  email    String @unique 
  password String 
  bookings Booking[]
}

model Booking {
  id         Int      @id @default(autoincrement())
  userId     Int
  hotelName  String
  checkIn    DateTime
  checkOut   DateTime
  family     Family[]
  user       UserJson @relation(fields: [userId], references: [id])
}

model Family {
  id        Int    @id @default(autoincrement())
  name      String
  aadhaar   String @unique
  booking   Booking @relation(fields: [bookingId], references: [id])
  bookingId Int
}

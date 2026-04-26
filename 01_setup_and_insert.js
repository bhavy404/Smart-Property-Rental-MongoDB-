// 1. Collections Management & Setup
print("Creating Smart Property Rental Database...");
db = db.getSiblingDB("property_rental_db");

// Drop existing collections to start fresh
db.users.drop();
db.properties.drop();
db.bookings.drop();
db.reviews.drop();

// Explicitly create collections (optional but good for demonstration)
db.createCollection("users");
db.createCollection("properties");
db.createCollection("bookings");
db.createCollection("reviews");

print("Collections created successfully.");
print("List of collections:");
printjson(db.getCollectionNames());

// 2. Insert Data (CRUD - Create)
print("\nInserting Users...");
db.users.insertMany([
    { _id: 1, name: "Bhavya", email: "bhavya@example.com", phone: "9876543210", role: "admin" },
    { _id: 2, name: "Rahul", email: "rahul@example.com", phone: "9876543211", role: "user" },
    { _id: 3, name: "Priya", email: "priya@example.com", phone: "9876543212", role: "user" },
    { _id: 4, name: "Amit", email: "amit@example.com", phone: "9876543213", role: "user" }
]);

print("Inserting High-Quality Property Data...");
db.properties.insertMany([
    { 
      _id: 101, 
      title: "Luxury 4BHK Penthouse", 
      location: "Mumbai", 
      price: 125000, 
      amenities: ["WiFi", "Private Pool", "Gym", "Sea View", "Smart Home"], 
      available: true,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3500,
      description: "A stunning penthouse overlooking the Arabian Sea, featuring a private infinity pool and smart home automation."
    },
    { 
      _id: 102, 
      title: "Modern Minimalist Villa", 
      location: "Pune", 
      price: 75000, 
      amenities: ["WiFi", "Garden", "Garage", "Home Theater", "Solar Power"], 
      available: true,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      description: "Eco-friendly villa located in a serene gated community with beautiful landscaping."
    },
    { 
      _id: 103, 
      title: "Cozy Downtown Apartment", 
      location: "Delhi", 
      price: 45000, 
      amenities: ["WiFi", "AC", "Balcony", "Metro Access"], 
      available: false,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      description: "Perfect city apartment walking distance to major commercial hubs and transport."
    },
    { 
      _id: 104, 
      title: "Lakeside Wooden Cabin", 
      location: "Lonavala", 
      price: 55000, 
      amenities: ["Fireplace", "Lake View", "Pet Friendly", "BBQ Area"], 
      available: true,
      verified: false,
      image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      description: "A perfect weekend getaway home right next to the lake."
    },
    { 
      _id: 105, 
      title: "Premium Tech-Park Studio", 
      location: "Bangalore", 
      price: 35000, 
      amenities: ["High-Speed Internet", "Gym", "Co-working Space", "Cafe"], 
      available: true,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1502672260266-1c1c24240f38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 750,
      description: "Ideal for young professionals, located right inside the tech park corridor."
    },
    { 
      _id: 106, 
      title: "Heritage Colonial Home", 
      location: "Jaipur", 
      price: 85000, 
      amenities: ["Courtyard", "Library", "Antique Furnishings", "Staff Quarters"], 
      available: true,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      description: "Live like royalty in this beautifully restored heritage home."
    },
    { 
      _id: 107, 
      title: "High-Rise Glass Condominium", 
      location: "Gurgaon", 
      price: 65000, 
      amenities: ["City View", "Central AC", "Clubhouse", "24/7 Security"], 
      available: true,
      verified: true,
      image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2100,
      description: "Modern condo with floor-to-ceiling windows and panoramic city views."
    },
    { 
      _id: 108, 
      title: "Suburban Family House", 
      location: "Noida", 
      price: 50000, 
      amenities: ["Backyard", "Community Pool", "Playground", "Garage"], 
      available: false,
      verified: false,
      image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      description: "A comfortable house in a quiet, family-friendly neighborhood."
    }
]);

print("Inserting Bookings...");
db.bookings.insertMany([
    { _id: 1001, user_id: 2, property_id: 103, booking_date: new Date("2024-03-01"), amount: 45000, status: "confirmed" },
    { _id: 1002, user_id: 3, property_id: 108, booking_date: new Date("2024-03-05"), amount: 50000, status: "confirmed" }
]);

print("Data insertion completed.");
print("\nDatabase initialization completed successfully! Open your Next.js app to see the new high-quality data.");
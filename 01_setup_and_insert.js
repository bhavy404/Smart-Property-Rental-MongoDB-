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

print("Inserting Properties...");
db.properties.insertMany([
    { _id: 101, title: "Luxury 2BHK", location: "Mumbai", price: 25000, amenities: ["WiFi", "Pool", "Gym"], available: true },
    { _id: 102, title: "Cozy 1BHK", location: "Delhi", price: 12000, amenities: ["WiFi", "AC"], available: true },
    { _id: 103, title: "Spacious 3BHK", location: "Bangalore", price: 35000, amenities: ["WiFi", "Pool", "Gym", "Parking"], available: false },
    { _id: 104, title: "Studio Apartment", location: "Mumbai", price: 15000, amenities: ["AC"], available: true },
    { _id: 105, title: "Villa with Garden", location: "Pune", price: 45000, amenities: ["WiFi", "Pool", "Garden", "Parking"], available: true }
]);

print("Inserting Bookings...");
db.bookings.insertMany([
    { _id: 1001, user_id: 2, property_id: 103, booking_date: new Date("2024-03-01"), amount: 35000, status: "confirmed" },
    { _id: 1002, user_id: 3, property_id: 101, booking_date: new Date("2024-03-05"), amount: 25000, status: "confirmed" },
    { _id: 1003, user_id: 4, property_id: 104, booking_date: new Date("2024-03-10"), amount: 15000, status: "cancelled" }
]);

print("Inserting Reviews...");
db.reviews.insertMany([
    { _id: 501, property_id: 103, user_id: 2, rating: 5, comment: "Amazing stay, very spacious!" },
    { _id: 502, property_id: 101, user_id: 3, rating: 4, comment: "Good location, but pool was under maintenance." }
]);

print("Data insertion completed.");

// 3. Update Operations (CRUD - Update)
print("\nUpdating documents...");
// Update single document
db.properties.updateOne(
    { _id: 102 },
    { $set: { price: 11000 } }
);
print("Updated price for property 102.");

// Update multiple documents (Adding a new field)
db.properties.updateMany(
    {},
    { $set: { verified: true } }
);
print("Added verified flag to all properties.");

// Update of embedded documents/arrays
db.properties.updateOne(
    { _id: 104 },
    { $push: { amenities: "WiFi" } }
);
print("Added WiFi to amenities for property 104.");

// 4. Delete Operations (CRUD - Delete)
print("\nDeleting documents...");
db.bookings.deleteOne({ _id: 1003 });
print("Deleted cancelled booking 1003.");

print("\nDatabase initialization completed successfully!");

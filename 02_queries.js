// Advanced Queries
print("--- Starting Advanced Queries ---");
db = db.getSiblingDB("property_rental_db");

print("\n1. Find properties in Mumbai OR Delhi with price < 20000:");
var cursor1 = db.properties.find({
    $or: [ { location: "Mumbai" }, { location: "Delhi" } ],
    price: { $lt: 20000 }
});
while (cursor1.hasNext()) { printjson(cursor1.next()); }

print("\n2. Find properties using IN condition (Location in Pune or Bangalore):");
var cursor2 = db.properties.find({
    location: { $in: ["Pune", "Bangalore"] }
});
while (cursor2.hasNext()) { printjson(cursor2.next()); }

print("\n3. Find properties using AND condition (Available AND has WiFi):");
var cursor3 = db.properties.find({
    $and: [
        { available: true },
        { amenities: "WiFi" }
    ]
});
while (cursor3.hasNext()) { printjson(cursor3.next()); }

print("\n4. Query with Projection (Show only title and price, hide _id):");
var cursor4 = db.properties.find(
    { location: "Mumbai" },
    { _id: 0, title: 1, price: 1 }
);
while (cursor4.hasNext()) { printjson(cursor4.next()); }

print("\n5. Limit, Skip, and Sort (Top 2 most expensive available properties):");
var cursor5 = db.properties.find({ available: true })
    .sort({ price: -1 })
    .limit(2);
while (cursor5.hasNext()) { printjson(cursor5.next()); }

print("\n6. Count the results (Number of available properties):");
var availableCount = db.properties.countDocuments({ available: true });
print("Available Properties: " + availableCount);

// findOne example
print("\n7. Find One (Get details of property 101):");
printjson(db.properties.findOne({ _id: 101 }));

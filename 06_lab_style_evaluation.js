// ==========================================
// 06_lab_style_evaluation.js
// This script maps your exact Lab Assignment concepts
// (Array Modifiers, Update Operators, Advanced Aggregation)
// to your Smart Property Rental project!
// ==========================================

print("--- Starting Lab Style Evaluation Queries ---");
db = db.getSiblingDB("property_rental_db");

// ---------------------------------------------------------
// PART 1: ARRAY MODIFIERS (Like the 'movies' and 'students' lab)
// ---------------------------------------------------------
print("\n--- Array Modifiers ---");

// Q: Add a new amenity "Smart Lock" to Property 101. (Like adding genre)
db.properties.updateOne(
  { _id: 101 },
  { $push: { amenities: "Smart Lock" } }
);
print("Added 'Smart Lock' to Property 101.");

// Q: Add amenity "WiFi" to Property 102 ensuring no duplicates. ($addToSet)
db.properties.updateOne(
  { _id: 102 },
  { $addToSet: { amenities: "WiFi" } }
);
print("Tried adding 'WiFi' to Property 102 without duplicates.");

// Q: Add multiple amenities to Property 103 in a single operation. ($push with $each)
db.properties.updateOne(
  { _id: 103 },
  { $push: { amenities: { $each: ["Heater", "Washing Machine"] } } }
);
print("Added multiple amenities to Property 103.");

// Q: Insert "CCTV" at the first position of the amenities array for Property 104. ($position)
db.properties.updateOne(
  { _id: 104 },
  { $push: { amenities: { $each: ["CCTV"], $position: 0 } } }
);
print("Added 'CCTV' at the first position for Property 104.");

// Q: Remove the last amenity from Property 101. ($pop: 1)
db.properties.updateOne(
  { _id: 101 },
  { $pop: { amenities: 1 } }
);
print("Removed the last amenity from Property 101.");

// Q: Remove "AC" from Property 103's amenities. ($pull)
db.properties.updateOne(
  { _id: 103 },
  { $pull: { amenities: "AC" } }
);
print("Removed 'AC' from Property 103.");

// Q: Remove genres "WiFi" and "Gym" from Property 105 using a single query. ($pullAll)
db.properties.updateOne(
  { _id: 105 },
  { $pullAll: { amenities: ["WiFi", "Gym"] } }
);
print("Removed 'WiFi' and 'Gym' from Property 105.");


// ---------------------------------------------------------
// PART 2: UPDATE OPERATORS (Like the 'record' lab)
// ---------------------------------------------------------
print("\n--- Update Operators ---");

// Q: Update the location of user Rahul to 'Panchkula' (Using $set)
db.users.updateOne(
  { name: "Rahul" },
  { $set: { city: "Panchkula" } }
);

// Q: Increase the price of all properties in Mumbai by 5000. ($inc)
db.properties.updateMany(
  { location: "Mumbai" },
  { $inc: { price: 5000 } }
);
print("Increased price of all Mumbai properties by 5000.");

// Q: Multiply the price of Property 104 by 1.05 (5% tax). ($mul)
db.properties.updateOne(
  { _id: 104 },
  { $mul: { price: 1.05 } }
);
print("Multiplied Property 104 price by 1.05.");

// Q: Ensure the price of Property 102 does not exceed 80000. ($min)
db.properties.updateOne(
  { _id: 102 },
  { $min: { price: 80000 } }
);

// Q: Update the price of Property 103 to 50000 if it is lower. ($max)
db.properties.updateOne(
  { _id: 103 },
  { $max: { price: 50000 } }
);

// Q: Rename the field 'phone' to 'contactNumber' for all users. ($rename)
db.users.updateMany(
  {},
  { $rename: { "phone": "contactNumber" } }
);
print("Renamed 'phone' to 'contactNumber' in Users collection.");

// Q: Remove the 'role' field from User 4. ($unset)
db.users.updateOne(
  { _id: 4 },
  { $unset: { role: "" } }
);
print("Removed 'role' field from User 4.");

// Q: Add a field lastUpdated with the current date and time to all properties. ($currentDate)
db.properties.updateMany(
  {},
  { $currentDate: { lastUpdated: true } }
);
print("Added lastUpdated timestamp to all properties.");


// ---------------------------------------------------------
// PART 3: ADVANCED AGGREGATION (Like the 'orders' lab)
// ---------------------------------------------------------
print("\n--- Advanced Aggregation ---");

// Q: Flatten the amenities array and count how many properties have each amenity ($unwind + $group)
print("Count of properties by amenity:");
var agg1 = db.properties.aggregate([
  { $unwind: "$amenities" },
  { $group: { _id: "$amenities", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
while(agg1.hasNext()) printjson(agg1.next());

// Q: Group properties into categories based on price: Low, Medium, High ($project with $switch)
print("\nCategorizing Properties by Price:");
var agg2 = db.properties.aggregate([
  {
    $project: {
      title: 1,
      price: 1,
      priceCategory: {
        $switch: {
          branches: [
            { case: { $lt: ["$price", 40000] }, then: "Low" },
            { case: { $and: [{ $gte: ["$price", 40000] }, { $lte: ["$price", 80000] }] }, then: "Medium" }
          ],
          default: "High"
        }
      }
    }
  }
]);
while(agg2.hasNext()) printjson(agg2.next());

// Q: Store aggregation result (Average price per city) into a NEW collection named cityRevenue ($out)
db.properties.aggregate([
  { $group: { _id: "$location", avgPrice: { $avg: "$price" }, totalProperties: { $sum: 1 } } },
  { $out: "cityRevenue" }
]);
print("\nStored Average City Prices into new collection 'cityRevenue'.");
printjson(db.cityRevenue.find().toArray());

print("\n--- Lab Style Queries Completed ---");
// Aggregation Framework
print("--- Starting Aggregation Operations ---");
db = db.getSiblingDB("property_rental_db");

print("\n1. Average property price by location:");
var agg1 = db.properties.aggregate([
    { $group: { _id: "$location", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
    { $sort: { avgPrice: -1 } }
]);
while (agg1.hasNext()) { printjson(agg1.next()); }

print("\n2. Total revenue from confirmed bookings:");
var agg2 = db.bookings.aggregate([
    { $match: { status: "confirmed" } },
    { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
]);
while (agg2.hasNext()) { printjson(agg2.next()); }

print("\n3. Join properties and reviews (using $lookup):");
var agg3 = db.properties.aggregate([
    { $match: { _id: 103 } },
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "property_id",
            as: "property_reviews"
        }
    },
    { $project: { title: 1, location: 1, property_reviews: 1 } }
]);
while (agg3.hasNext()) { printjson(agg3.next()); }

print("\n4. Find the most popular location (max properties):");
var agg4 = db.properties.aggregate([
    { $group: { _id: "$location", totalProperties: { $sum: 1 } } },
    { $sort: { totalProperties: -1 } },
    { $limit: 1 }
]);
while (agg4.hasNext()) { printjson(agg4.next()); }

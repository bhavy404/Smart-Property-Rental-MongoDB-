// Indexing
print("--- Starting Indexing Operations ---");
db = db.getSiblingDB("property_rental_db");

print("\n1. Creating Single Field Index on Location...");
db.properties.createIndex({ location: 1 });

print("2. Creating Compound Index on Location and Price...");
db.properties.createIndex({ location: 1, price: -1 });

print("3. Creating Unique Index on User Email...");
db.users.createIndex({ email: 1 }, { unique: true });

print("4. Creating Sparse/Partial Index for amenities...");
// Only indexes documents that have the amenities field
db.properties.createIndex(
    { amenities: 1 },
    { partialFilterExpression: { amenities: { $exists: true } } }
);

print("\n5. Get Indices of Properties Collection:");
var indices = db.properties.getIndexes();
printjson(indices);

print("\n6. Dropping the single field location index...");
db.properties.dropIndex("location_1");
print("Index dropped.");

print("\n7. Final List of Indices:");
printjson(db.properties.getIndexes());

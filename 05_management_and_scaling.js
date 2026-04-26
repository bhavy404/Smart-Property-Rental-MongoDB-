// Database Management, Sharding and Replication (Theoretical & Shell commands)
print("--- Database Management, Sharding and Replication ---");
print("Note: These are administrative commands. Some may fail if the environment is not set up for sharding/replication.");

db = db.getSiblingDB("property_rental_db");

// 1. Database Stats
print("\n1. Collection Stats (properties):");
var stats = db.properties.stats();
print("Document count: " + stats.count);
print("Total index size: " + stats.totalIndexSize);

print("\n2. Database Replication (Replica Set):");
print("To initiate a replica set, you would run the following command on the primary node:");
print("  rs.initiate()");
print("To check replica set status:");
print("  rs.status()");
print("To add a node to the replica set:");
print("  rs.add('hostname:port')");

// Trying to get replica set status (will error out if not a replica set, so we use try-catch)
try {
    var rsStatus = rs.status();
    print("Replica set status: " + rsStatus.ok);
} catch (e) {
    print("Replica set is not initialized in this environment.");
}

print("\n3. Database Sharding:");
print("Sharding is used for database scaling across multiple servers.");
print("Steps to enable sharding:");
print("  sh.enableSharding('property_rental_db')");
print("  sh.shardCollection('property_rental_db.properties', { location: 1 })"); // Shard key

try {
    var shStatus = sh.status();
    print("Sharding status obtained.");
} catch (e) {
    print("Sharding is not enabled/configured in this environment.");
}

print("\nManagement script completed.");

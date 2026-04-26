# Smart Property Rental Management System (MongoDB)

## Overview
The **Smart Property Rental Management System** is a MongoDB-based application designed to efficiently manage rental property data using a NoSQL approach. The system focuses on storing, retrieving, and analyzing data related to users, properties, bookings, and reviews through a document-oriented database model.

This project is built to comprehensively cover all core concepts of Data Engineering and MongoDB, including CRUD operations, advanced querying, aggregation, indexing, and database management/scaling. It can be showcased as a GitHub repository for evaluation.

## File Structure & Syllabus Mapping

1. **`01_setup_and_insert.js`**
   - **Topics Covered:** Getting started with MongoDB, NoSQL approach, Documents, Collections, Databases, JavaScript in MongoDB, CRUD (Create, Update, Delete), Update operators, Embedded documents.
   - **Description:** Initializes the database, creates collections, inserts mock data, and demonstrates update and delete operations.

2. **`02_queries.js`**
   - **Topics Covered:** Find(), FindOne(), limit, skip, sort, count, AND, OR, IN Conditions, Projection.
   - **Description:** Runs advanced MongoDB queries to fetch specific data, applying filtering, sorting, and projection.

3. **`03_aggregation.js`**
   - **Topics Covered:** Aggregation Pipelines.
   - **Description:** Demonstrates real-world analytics, such as average property prices per location and total revenue calculations.

4. **`04_indexing.js`**
   - **Topics Covered:** Indexes, Index Creation, Dropping/Deleting Index, Sparse/Partial indexes, Get Indices, Compound, Unique Index, Single field.
   - **Description:** Optimizes database queries by creating and managing various types of indexes.

5. **`05_management_and_scaling.js`**
   - **Topics Covered:** Managing Database for Availability and Performance, Database Scaling, Replication (Master-Slave, Peer-to-Peer), Sharding.
   - **Description:** Explains and demonstrates administrative commands for monitoring collections and setting up replica sets and sharding.

## How to Run the Project

1. Ensure MongoDB is installed and the MongoDB server (`mongod`) is running on your machine.
2. Open your terminal or command prompt in this repository folder.
3. Run the scripts sequentially using the `mongosh` (or `mongo`) shell:

```bash
mongosh < 01_setup_and_insert.js
mongosh < 02_queries.js
mongosh < 03_aggregation.js
mongosh < 04_indexing.js
mongosh < 05_management_and_scaling.js
```

*(Note: You can also open `mongosh` interactively and use the `load("01_setup_and_insert.js")` command inside the shell.)*

## Database Schema (Collections)

- **`users`**: Stores user information (name, email, role).
- **`properties`**: Stores property details, location, price, and amenities list.
- **`bookings`**: Tracks rental bookings made by users.
- **`reviews`**: Stores reviews, ratings, and comments for properties.

## Academic Context
This project aligns perfectly with the **UCS677: DATA ENGINEERING** MongoDB Lab syllabus, practically covering all the required topics without unnecessary complexities like ML models or complex frontends, keeping it laser-focused on evaluating MongoDB expertise.

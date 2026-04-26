# MongoDB Lab Evaluation - Presentation Guide

During your lab evaluation, the instructor's main goal is to verify that you understand **MongoDB** and the NoSQL concepts from the syllabus. The beautiful Next.js UI is an incredible bonus that will guarantee you top marks, but you need to bridge the gap between the UI and the database.

Here is exactly how to present your project and showcase the database concepts:

## Part 1: The "Wow" Factor (The UI)
1. **Start the Next.js Server:** (You already know how: `npm run dev` in the `my-app` folder).
2. **Open the Browser:** Show them the Spark Properties landing page (`http://localhost:3000`).
3. **What to say:** *"Sir/Ma'am, for my data engineering project, I built a Smart Property Rental System. Instead of just writing shell scripts, I integrated MongoDB with a full-stack Next.js application to demonstrate how NoSQL databases are used in modern, scalable web applications."*
4. **Show Interactivity:** Click the "Explore" button to smoothly scroll to the properties. Click "Saved" or "Messages" and show the alerts—explain that *"These features represent our User and embedded document schemas in MongoDB."*

## Part 2: Showcasing the Database (The Core Syllabus)
After showing the UI, immediately transition to the MongoDB shell and Compass. This proves you did the backend work.

### Step 1: MongoDB Compass (Visual Proof)
1. Open **MongoDB Compass** and connect to `mongodb://localhost:27017`.
2. Open the `property_rental_db` database.
3. Click on the `properties` collection.
4. **What to say:** *"As you can see, all the data on the website is being fetched live from this MongoDB collection. I used a document-oriented structure, which is perfect for properties because some properties have different amenities or fields, taking advantage of NoSQL's flexible schema."*

### Step 2: Live Shell Demonstration (Running the Scripts)
Keep a Command Prompt open to your project folder (`C:\Users\bhavy\Smart-Property-Rental-MongoDB`).

**1. Show CRUD & Queries (Syllabus: JavaScript in MongoDB, Queries)**
Run: `mongosh 02_queries.js`
* **What to point out:** *"Here, I am demonstrating advanced queries. We are using `$or`, `$in`, and `$and` operators to filter properties based on location and price. I also used projections to only return specific fields like title and price."*

**2. Show Aggregation (Syllabus: Aggregation Framework)**
Run: `mongosh 03_aggregation.js`
* **What to point out:** *"This is the most powerful part. I built an aggregation pipeline using `$group` to find the average property price in each city, and `$lookup` to join the properties collection with the reviews collection."*

**3. Show Indexing (Syllabus: Indexes)**
Run: `mongosh 04_indexing.js`
* **What to point out:** *"To optimize the search queries, I created several indexes. I made a compound index on Location and Price, and a Unique index on the User's email to prevent duplicates."*

**4. Show Scaling/Sharding Theory (Syllabus: Sharding & Replication)**
Run: `mongosh 05_management_and_scaling.js`
* **What to point out:** *"Finally, to cover database management, I wrote the commands required to initiate a Replica Set (`rs.initiate()`) for high availability, and to enable Sharding (`sh.enableSharding()`) for horizontal scaling. Though my local machine is a single node, these are the exact commands used in production."*

## Part 3: The Live Code Edit (The Ultimate Proof)
If they ask you to prove the website is really connected to the database:
1. Go into **MongoDB Compass**, find a property (like the "Luxury 4BHK Penthouse").
2. Change its `price` from `125000` to `999999` directly in Compass and click **Update**.
3. Go back to your Chrome browser and refresh the page.
4. The price on the website will instantly update to ₹999,999!
5. **What to say:** *"This demonstrates the seamless real-time connection between the Next.js React frontend and the MongoDB backend via the Mongoose ODM."*
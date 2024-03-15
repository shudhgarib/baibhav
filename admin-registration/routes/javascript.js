const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'student_attendance';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    return;
  }
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // Create admins collection
  db.createCollection('admins', function(err, collection) {
    if (err) {
      console.error('Error occurred while creating admins collection:', err);
      return;
    }
    console.log('Admins collection created successfully');

    // Insert sample data into admins collection
    collection.insertMany([
      { name: 'Admin User', email: 'admin@example.com', mobileNumber: '1234567890', password: 'hashed_password' }
    ], function(err, result) {
      if (err) {
        console.error('Error occurred while inserting data into admins collection:', err);
        return;
      }
      console.log('Sample data inserted into admins collection');
    });
  });

  // Create students collection
  db.createCollection('students', function(err, collection) {
    if (err) {
      console.error('Error occurred while creating students collection:', err);
      return;
    }
    console.log('Students collection created successfully');

    // Insert sample data into students collection
    collection.insertMany([
      { name: 'John Doe', email: 'john@example.com', mobileNumber: '9876543210', password: 'hashed_password', rollNumber: 'S001' }
    ], function(err, result) {
      if (err) {
        console.error('Error occurred while inserting data into students collection:', err);
        return;
      }
      console.log('Sample data inserted into students collection');
    });
  });

  // Create attendance collection
  db.createCollection('attendance', function(err, collection) {
    if (err) {
      console.error('Error occurred while creating attendance collection:', err);
      return;
    }
    console.log('Attendance collection created successfully');
  });

  // Close the client
  client.close();
});

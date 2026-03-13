require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/spice-store';

mongoose.connect(MONGO_URI)
  .then(async () => {
    try {
      let admin = await User.findOne({ email: 'admin@spicehaven.com' });
      
      if (admin) {
        // Ensure role is admin
        if(admin.role !== 'admin') {
            admin.role = 'admin';
            await admin.save();
        }
        console.log(`\nAdmin account exists:\nEmail: ${admin.email}\nPassword: (Use the password you registered with, or drop the user and run this script again)`);
      } else {
        admin = await User.create({
          name: 'Store Admin',
          email: 'admin@spicehaven.com',
          password: 'adminpassword123',
          role: 'admin'
        });
        console.log(`\nNew Admin Created Successfully! 🎉\n`);
        console.log(`Email: admin@spicehaven.com`);
        console.log(`Password: adminpassword123\n`);
        console.log(`You can now log in at http://localhost:5173/login and then navigate to the dashboard at http://localhost:5173/admin`);
      }
    } catch (err) {
      console.error("Error creating admin:", err);
    } finally {
      process.exit();
    }
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

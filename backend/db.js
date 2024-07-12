const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/gofood';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    if (!collectionNames.includes('food_item')) {
      throw new Error('Collection "food_item" does not exist.');
    }

    const foodItemsCollection = db.collection('food_item');
    const data = await foodItemsCollection.find({}).toArray();

    if (data.length === 0) {
      console.log('No data found in the collection.');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');

async function dropGoogleIdIndex() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pacific-clothing', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const User = mongoose.connection.collection('users');

    // Drop the googleId_1 index
    const result = await User.dropIndex('googleId_1');
    console.log('Index dropped:', result);

    await mongoose.disconnect();
  } catch (error) {
    if (error.codeName === 'IndexNotFound') {
      console.log('Index googleId_1 does not exist.');
    } else {
      console.error('Error dropping index:', error);
    }
    await mongoose.disconnect();
  }
}

dropGoogleIdIndex();

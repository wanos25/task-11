const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('testdb');
    const collection = database.collection('testcollection');

    await collection.insertOne({ name: 'marvel', age: 30 });
    await collection.insertOne({ name: 'basma', age: 25 });

    await collection.insertMany([
      { name: 'islam', age: 27 },
      { name: 'abdelrahman', age: 27 },
      { name: 'jehad', age: 27 },
      { name: 'israa', age: 27 },
      { name: 'mohamed', age: 27 },
      { name: 'nour', age: 20 },
      { name: 'kareem', age: 35 },
      { name: 'joud', age: 40 },
      { name: 'marven', age: 50 },
      { name: 'ghem', age: 22 }
    ]);


    const age27Docs = await collection.find({ age: 27 }).limit(3).toArray();
    console.log('Documents with age 27 (limited to 3):', age27Docs);

    const firstFourDocs = await collection.find().limit(4).toArray();
    for (let i = 0; i < firstFourDocs.length; i++) {
      await collection.updateOne({ _id: firstFourDocs[i]._id }, { $set: { name: `Renamed${i + 1}` } });
    }

    for (let i = 0; i < firstFourDocs.length; i++) {
      await collection.updateOne({ _id: firstFourDocs[i]._id }, { $inc: { age: 1 } });
    }

    await collection.updateMany({}, { $inc: { age: 10 } });

    const deleteResult = await collection.deleteMany({ age: 41 });
    console.log('Deleted documents count:', deleteResult.deletedCount);
  } finally {
    await client.close();
  }
}

main().catch(console.error);












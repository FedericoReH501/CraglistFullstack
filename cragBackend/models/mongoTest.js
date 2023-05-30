const mongoose = require("mongoose");
const cragObject = {
  sectors: [
    {
      name: "Sector A",
      routes: [
        { routeName: "Route 1", difficult: "3a" },
        { routeName: "Route 2", difficult: "4b" },
        { routeName: "Route 3", difficult: "5c" },
      ],
    },
    {
      name: "Sector B",
      routes: [
        { routeName: "Route 4", difficult: "4c" },
        { routeName: "Route 5", difficult: "6a" },
        { routeName: "Route 6", difficult: "6c+" },
      ],
    },
  ],
};

const Parent = require("./test"); // Assuming you have created a separate file for the Crag model

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://federicore1996:sg24yCV35LX2yhqj@craglistdb.8sbimzs.mongodb.net/CragAPP?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");

    // Create a new instance of Crag using the cragObject
    const newCrag = new Parent(cragObject);

    // Save the newCrag to the database
    newCrag
      .save()
      .then((savedCrag) => {
        console.log("Crag saved:", savedCrag);
        // You can perform additional operations or handle success here
      })
      .catch((error) => {
        console.error("Error saving crag:", error);
        // Handle the error appropriately
      })
      .finally(() => {
        // Disconnect from MongoDB when done
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error appropriately
  });

// You can now use this cragObject to create a new instance of the Crag model and save it to the database.

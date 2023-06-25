//-------
const express = require("express");    
const cors = require("cors");          

const app = express();                 

//#call connect() method in server.js for defining Mongoose:
const db = require("./app/models");

db.mongoose.connect(db.url, {  
    useNewUrlParser: true,       
    useUnifiedTopology: true     
  })
  .then(() => {                 
    console.log("Successfully connected to the database!");
  })
  .catch(err => {
    console.log("Sorry, it cannot connect to the database!", err);
    process.exit();
  });

//#set the origin then add cors middlewares using corsOptions as an argument
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

//#parse requests of content-type - application/json (body-parser: json)
app.use(express.json());                   
//#parse requests of content-type - application/x-www-form-urlencoded (body-parser: urlencoded)
app.use(express.urlencoded({ extended: true }));   

//#define a simple GET route for testing the connection
app.get("/", (req, res) => {   
  res.json({ message: "Welcome to DressStore application." });
});

//#Include routes in server.js passing 'app' as an argument (right before app.listen())
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);

//#set port and listen for incoming requests on port 8081
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
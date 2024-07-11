const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models"); // Import the db object
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); // Import the Swagger configuration
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger spec as JSON
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Serve Swagger spec as YAML
app.get('/swagger.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    const swaggerDocument = yaml.stringify(swaggerSpec, 4);
    res.send(swaggerDocument);
});

// Sync database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Define your routes here...
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/lectures", require("./routes/lectureRoutes"));
app.use("/api/assets", require("./routes/assetRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

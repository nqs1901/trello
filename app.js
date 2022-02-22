const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require('morgan')
const { errorConverter, errorHandler } = require('./middlewares/error')
const { APP_HOST,APP_PORT, APP_ROUTE_PREFIX, DB_CONNECTION } = require("./configs/env");
const routeConfig = require("./apis/routes");
const app = express();

 app.use(morgan('dev'))

mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Trello",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
              }
            },
            BasicAuth: {
                type: 'http',
                scheme: 'basic' 
            }
          },
          security: [{
            bearerAuth: []
          },
            {BasicAuth:[]}
            ],
		servers: [
			{
				url: `http://localhost:${APP_PORT}`,
			},
		],
	},
	apis: ["./routes/*.js", "./swaggers/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(APP_ROUTE_PREFIX, routeConfig);

app.use(errorConverter)

app.use(errorHandler)

app.listen(APP_PORT, async function () {
  console.log(`Server is running at http://${APP_HOST}:${APP_PORT}`);
});

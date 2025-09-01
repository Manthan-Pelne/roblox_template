// Install dependencies: npm install express multer face-api.js @tensorflow/tfjs-node
import express from "express";
import nunjucks from "nunjucks";
import minify from "express-minify";
import minifyHTML from "express-minify-html-2";
import routes from "./routes/index.js";
import connection from "./db.js";

import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json())
const PORT = 3000;
  
// Static files
app.use(express.static("public"));

// Minify HTML
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: false,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);


// Minify CSS and JS
app.use(
  minify({
    cache: false,
    jsMatch: /js/,
    cssMatch: /css/,
  })
);

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Nunjucks templating
function setUpNunjucks() {
  const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
  })
}

app.set('view engine', 'html')
app.use("/", routes);

// Start the server
const start = async () => {
  app.listen(PORT, async() => {
      await connection
      console.log(`Listening on port: ${PORT}`);
    });
};


  setUpNunjucks()
  start();

  export default app;
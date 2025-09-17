import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/mongoose'
import { dark, light, noSidebar } from '@adminjs/themes'
import express from 'express'
import mongoose from 'mongoose'
import nunjucks from 'nunjucks'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import MongoDBStore from 'connect-mongodb-session'
import bodyParser from 'body-parser'
import Category from './models/Category.js';
import AllCard from './models/AllCard.js'

import slugify from 'slugify';

import * as AdminJSMongoose from '@adminjs/mongoose'
import { ComponentLoader } from 'adminjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import uploadFeature from '@adminjs/upload'



dotenv.config()
const app = express()


AdminJS.registerAdapter({
  Database: AdminJSMongoose.Database,
  Resource: AdminJSMongoose.Resource,
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))
  
const MongoDBStoreInstance = MongoDBStore(session)
const store = new MongoDBStoreInstance({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
})

// Handle errors
store.on('error', function (error) {
  console.error(error)
})


// Set up Nunjucks templating

function setUpNunjucks() {
  const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
  });

  // Add custom filter for slugify
  env.addFilter('slugify', (str) => {
    return slugify(str, { lower: true, strict: true }); 
  });
  env.addFilter('split', function(str, delimiter) {
    if (typeof str === 'string') {
      return str.split(delimiter).map(s => s.trim());
    }
    return [];
  });
    env.addFilter('formatNumber', (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';  // For millions
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';   // For thousands
    } else {
      return number.toString();  // For smaller numbers
    }
  });
}

setUpNunjucks()
app.set('view engine', 'html')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static("public"));
app.use('/admin-assets', express.static('admin/assets'))

// Express session configuration (should be applied before passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    resave: false, // Better for performance
    saveUninitialized: false, // Avoid storing empty sessions
    store: store,
  })
)

// Connect flash messages
app.use(flash());

// register middleware to log flash
app.use((req, res, next) => {
  const getFlashMessage = (key) => {
    const messages = req.flash(key);
    return messages.length > 0 ? messages[0] : null;
  };
  res.locals.success_msg = getFlashMessage('success_msg');
  res.locals.error_msg = getFlashMessage('error_msg');
  res.locals.error = getFlashMessage('error');
  res.locals.user = req.user || null;
  next();
});



  //////////////////////admin js set up start////////////////////
// Authenticate AdminJS
const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: '123456',
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}


import { getdropDownCategoryOptions } from './admin/dropdown.js'; // path as per your folder

const availableValues  = await getdropDownCategoryOptions();
const componentLoader = new ComponentLoader()
const UploadImageListComponent = componentLoader.add(
  'UploadImageListComponent',
  path.join(__dirname, 'admin/components/custom-image.jsx') // 👈 custom image preview
)

const UploadCustomComponent = componentLoader.add(
  'UploadCustomComponent',
  path.join(__dirname, 'admin/components/upload.jsx') // 👈 used for show/edit if needed
)

  const admin = new AdminJS({
    rootPath: '/admin',
    defaultTheme: light.id,
    availableThemes: [dark, light, noSidebar],
    assets: {
      styles: ['/admin/admin.css'],
      scripts: ['/admin/custom.js'],
    },
     resources: [   
      {
            resource: AllCard,
            options: {
                properties: {
                    category: {
                        availableValues,
                        isRequired: true,
                      },
                    filePath: { isVisible: false },
                     uploadedFile: { isVisible: {
                          list: false,   
                          filter: false,
                          show: false,    
                          edit: true,  
                      }, },
                    fileKey: {
                        isVisible: { list: true, edit: true, filter: false, show: true },
                        components: {
                            list: UploadImageListComponent,
                            show: UploadCustomComponent,
                            edit: UploadCustomComponent,
                  }
                  },
              }
            },
            features: [
              uploadFeature({
              componentLoader,
              provider: {
                  local: {
                  bucket: path.join(__dirname, ''),
                  },
              },
              properties: {
                  key: 'fileKey',  
                  file: 'uploadedFile',
              },
              uploadPath: (record, filename) => `/uploads/files/${Date.now()}-${filename.replace(/\s+/g, '-')}`,
              })
            ],
      },   
      {
            resource: Category,
      }, 
    ],
    componentLoader
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.COOKIE_SECRET || 'sessionsecret',
    },
    null,
    {
      store: store,
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'sessionsecret',
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }
  );

  app.use(admin.options.rootPath, adminRouter);

//////////////////////admin js set up end////////////////////
// Body-parser middleware AFTER AdminJS router
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
import routes from './routes/index.js'
app.use('/', routes)

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 8000')
})



//  {% if currentPage == '1' and i <= 3  %}
//         <a href="/tests-and-quizzes/{{i}}{% if sort %}?sort={{sort}}{% endif %}"
//             class="page-number-btn py-2 px-4 rounded-lg font-semibold {% if i === currentPage %}bg-blue-600 text-white{% else %}bg-gray-200 dark:bg-[#484C67] dark:text-gray-200{% endif %}">
//             {{ i }}
//         </a>
//    {% endif %}
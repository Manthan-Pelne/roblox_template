# Admin Dashboard using AdminJS, Express.js & Node.js

A lightweight and customizable admin panel built using [AdminJS](https://adminjs.co/), [Express.js](https://expressjs.com/), and [Node.js](https://nodejs.org/). This project provides a backend admin interface to manage data models with authentication and session management.

---

## 🚀 Features

- ⚙️ Built with [AdminJS](https://adminjs.co/) – modern admin panel for Node.js
- 🧩 Modular Express.js project structure
- 🔐 Basic authentication (can be extended with Passport.js, etc.)
- 💾 Session management with PostgreSQL (via `connect-pg-simple`)
- 🌐 Server-side rendered views with Nunjucks
- ⚡ HTML, CSS, JS minification in production
- 📁 Static file serving (`public/` directory)

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Admin Panel**: AdminJS
- **Templating Engine**: Nunjucks
- **Session Store**: MangoDB via `connect-pg-simple`
- **Environment Variables**: Managed with `dotenv`
- **View Minification**: `express-minify` and `express-minify-html-2`

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/adminjs-dashboard.git
cd adminjs-dashboard


## Installation

1. Clone the repository:
   ```
   https://github.com/sagarshelke1995/AdminJsSetup.git
   cd AdminJsSetup
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
  
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm run dev
   ```

The application should now be running on `http://localhost:3000`.

## Usage

Navigate to `http://localhost:3000` in your web browser.

## Project Structure

- `app.js`: Main application file
- `config/`: Configuration files (passport setup, authentication middleware)
- `models/`: MongoDB schema definitions
- `routes/`: Express route handlers
- `views/`: Nunjucks template files
- `public/`: Static assets (if any)

## Contributing

Contributions to this project are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Express.js
- Passport.js
- MongoDB
- Nunjucks

---

For any questions or issues, please open an issue in the GitHub repository. 
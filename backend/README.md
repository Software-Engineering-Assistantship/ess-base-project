## How to run

1. Create a `.env` file in the root directory of the project and add:
  ```dotenv
  DATABASE_URL="file:./dev.db"
  SERVER_PORT=3001
  ```
2. Run:
  ```bash
  npm install
  npm run migration
  npm run dev
  ```
3. To run tests:
  ```bash
  npm run test
  ```
import { app } from "./app.js";
import { dbConnect } from "./db/dbConnect.js";

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ DB connection failed!", error.message);
    process.exit(1);
  });

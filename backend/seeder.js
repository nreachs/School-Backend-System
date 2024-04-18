import dotenv from "dotenv";
import { users } from "./data/users.js";
import { items } from "./data/Data.js";
import Dashboard from "./models/dashboardModel.js";
import Admin from "./models/adminModel.js";

dotenv.config();
import connectDB from "./config/db.js";
connectDB();
const importData = async () => {
  try {
    await Admin.deleteMany();

    await Dashboard.deleteMany();

    await Admin.insertMany(users);

    await Dashboard.insertMany(items);

    console.log("Data imported.");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Dashboard.deleteMany();
    await Admin.deleteMany();

    console.log("Data destroyed.");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

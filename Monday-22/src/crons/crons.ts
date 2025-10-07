import cron from "node-cron";
import availabilityModel from "../models/availableModels";

export const task = cron.schedule("*/10 * * * *", async () => {
    console.log("running a task in every 10 minutes ")
  const now = new Date();
  try {
    const result = await availabilityModel.deleteMany({
      expiry: { $lte: now },
    });

    console.log(
      `CRON Deleted ${result.deletedCount} expired availability entries at ${now.toISOString()}`
    );
  } catch (err) {
    console.error("CRON Error cleaning up availabilities:", err);
  }
});


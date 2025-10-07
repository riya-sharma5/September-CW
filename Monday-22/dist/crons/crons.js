"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const availableModels_1 = __importDefault(require("../models/availableModels"));
exports.task = node_cron_1.default.schedule("*/10 * * * *", async () => {
    console.log("running a task in every 10 minutes ");
    const now = new Date();
    try {
        const result = await availableModels_1.default.deleteMany({
            expiry: { $lte: now },
        });
        console.log(`CRON Deleted ${result.deletedCount} expired availability entries at ${now.toISOString()}`);
    }
    catch (err) {
        console.error("CRON Error cleaning up availabilities:", err);
    }
});
//# sourceMappingURL=crons.js.map
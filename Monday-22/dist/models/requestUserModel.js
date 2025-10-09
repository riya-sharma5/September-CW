"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var statusType;
(function (statusType) {
    statusType["pending"] = "0";
    statusType["accepted"] = "1";
    statusType["rejected"] = "2";
})(statusType || (exports.statusType = statusType = {}));
const requestUserSchema = new mongoose_1.Schema({
    fromUserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: statusType,
        deafult: statusType.pending,
    },
    content: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false, },
    versionKey: false, });
exports.default = mongoose_1.default.model("RequestUser", requestUserSchema);
//# sourceMappingURL=requestUserModel.js.map
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
exports.responseType = exports.preferenceType = exports.statusType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var statusType;
(function (statusType) {
    statusType["pending"] = "0";
    statusType["accepted"] = "1";
    statusType["rejected"] = "2";
    statusType["closed"] = "3";
})(statusType || (exports.statusType = statusType = {}));
var preferenceType;
(function (preferenceType) {
    preferenceType["I can Drive"] = "0";
    preferenceType["I need a ride"] = "1";
})(preferenceType || (exports.preferenceType = preferenceType = {}));
var responseType;
(function (responseType) {
    responseType["Yes! Text Me"] = "0";
    responseType["Yes! Call Me"] = "1";
    responseType["I Can't Right"] = "2";
    responseType["Possibly Later"] = "3";
    responseType["Text Me"] = "4";
    responseType["Call Me"] = "5";
})(responseType || (exports.responseType = responseType = {}));
const requestUserSchema = new mongoose_1.Schema({
    fromUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: statusType,
        default: "0",
    },
    content: {
        type: String,
        enum: preferenceType,
        required: true,
    },
    additionalPassengers: {
        type: Number,
        required: false,
    }
}, {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
});
exports.default = mongoose_1.default.model("RequestUser", requestUserSchema);
//# sourceMappingURL=requestUserModel.js.map
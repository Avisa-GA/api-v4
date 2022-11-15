"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_merge_1 = __importDefault(require("lodash.merge"));
// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var stage = process.env.STAGE || "local";
var envConfig;
// dynamically require each config depending on the stage we're in
if (stage === "production") {
    envConfig = require("./prod")["default"];
}
else if (stage === "staging") {
    envConfig = require("./staging")["default"];
}
else {
    envConfig = require("./local")["default"];
}
var defaultConfig = {
    stage: stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    logging: false
};
exports["default"] = (0, lodash_merge_1["default"])(defaultConfig, envConfig);
//# sourceMappingURL=index.js.map
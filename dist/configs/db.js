"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConnectionString = process.env.NODE_ENV === 'production'
    ? process.env.DB_CONNECTION.replace('<password>', process.env.DB_PASSWORD)
        .replace('<username>', process.env.DB_USERNAME)
    : process.env.MONGO_URI;
// Establish a connection to MongoDB
mongoose_1.default.connect(dbConnectionString)
    .then(() => {
    console.log('Connected successfully to MongoDB');
})
    .catch((error) => {
    console.error('Connection error:', error.message);
});
const db = mongoose_1.default.connection;
// Additional error handling
db.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
});
exports.default = db;
//# sourceMappingURL=db.js.map
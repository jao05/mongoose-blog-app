"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/mongoose-blog-app";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-mongoose-blog-app";
exports.PORT = process.env.PORT || 8080;

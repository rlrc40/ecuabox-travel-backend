"use strict";

const {
  winston,
  formats: { prettyPrint, levelFilter },
} = require("@strapi/logger");

export default {
  transports: [
    new winston.transports.Console({
      level: "http",
      format: winston.format.combine(
        levelFilter("http"),
        prettyPrint({ timestamps: "YYYY-MM-DD hh:mm:ss.SSS" })
      ),
    }),
  ],
};

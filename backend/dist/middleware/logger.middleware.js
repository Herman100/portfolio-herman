import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;
// Custom timestamp format
const customTimestamp = format((info) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds())
        .padStart(3, "0")
        .slice(0, 2);
    info.timestamp = `{${formattedDate} --- ${hours}:${minutes}:${seconds}.${milliseconds}}`;
    return info;
});
// Custom format for console logging with colors
const consoleLogFormat = format.combine(format.colorize(), format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message} ${timestamp}`;
}));
// Create a Winston logger
const logger = createLogger({
    level: "info",
    format: combine(customTimestamp(), colorize(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({ filename: "app.log" }),
    ],
});
export default logger;
//# sourceMappingURL=logger.middleware.js.map
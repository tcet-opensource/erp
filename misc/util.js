import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "winston-daily-rotate-file";
import winston from "winston";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { logLevel } from "#constant";

const { combine, timestamp, align, printf, colorize, json } = winston.format;

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";

const encrypt = (IP) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(IP, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (IP) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(IP, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const generateToken = (data, IP) => {
  const encryptedIP = encrypt(IP);
  return jwt.sign({ data, ip: encryptedIP }, process.env.TOKEN_SECRET);
};

const sendOTP = async (to, otp) => {
  await transporter.sendMail({
    from: "erptcet@tcetmumbai.in",
    to,
    subject: "OTP verification for TCET ERP system",
    text: `OTP for ERP system is ${otp}.`,
  });
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return error.message;
  }
};

export const comparePasswords = async (userPassword, storedPassword) => {
  try {
    const matched = await bcrypt.compare(userPassword, storedPassword);
    return matched;
  } catch (error) {
    return error.message;
  }
};

/**
 *
 * @param {*} data any data that you want as return from the function after mentioned time
 * @param {number} time in ms
 * @returns Promise
 *
 * Call is either with chaining or async await
 *
 * ()=>{asyncPlaceholder("hello", 1000).then(res=>console.log(res))}
 *
 * async ()=>{let res = await asyncPlaceholder("hello", 1000); console.log(res)}
 */
const asyncPlaceholders = (data, time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });

/**
 * corn job
 * var cron = require('node-cron');
 * cron.schedule('* * * * *', () => {
 *      console.log('running a task every minute');
 * });
 */

const logFileTransport = new winston.transports.DailyRotateFile({
  level: logLevel[process.env.ENVIRONMENT] || "info",
  filename: `./logs/application-${process.env.ENVIRONMENT}-%DATE%.log`,
  handleExceptions: true,
  json: true,
  colorize: false,
  format: combine(
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }),
    json(),
  ),
  datePattern: "DD-MM-YYYY",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
});

export const logger = winston.createLogger({
  transports: [
    logFileTransport,
    new winston.transports.Console({
      level: logLevel[process.env.ENVIRONMENT] || "info",
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

export default {
  generateToken,
  encrypt,
  decrypt,
  sendOTP,
  asyncPlaceholders,
  logger,
  hashPassword,
  comparePasswords,
};

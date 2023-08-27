import jwt from "jsonwebtoken";
import util, { logger } from "#util";

export async function identifyUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === undefined) {
    req.user = "anonymous";
    next();
    return false;
  }
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const decryptedIP = util.decrypt(payload.ip);
    if (decryptedIP !== req.ip) {
      req.user = "unauthorized";
      next();
    }
    req.user = JSON.stringify(payload.data.uid);
    req.userData = payload.data;
    next();
    return true;
  } catch (error) {
    logger.error("Error while finding user ", error);
    req.user = "unauthorized";
    next();
    return false;
  }
}

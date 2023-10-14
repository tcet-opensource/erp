import jwt from "jsonwebtoken";
import util from "#util";

async function authenticateToken(req, res, next) {
  if (process.env.STATE === "Development") {
    return next();
  }
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // Inside header when we are going to provide the value for key authentication we have
  // to start it with 'Bearer acesstoken'
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const decryptedIP = util.decrypt(payload.ip);
      if (decryptedIP !== req.ip) {
        res.status(403);
        res.send({ err: "Unauthorized" });
      }

      req.user = payload.data;
      next();
      return true;
    } catch (error) {
      res.status(403);
      res.send({ err: "Unauthorized" });
      return false;
    }
  } else {
    res.json({
      msg: "Kindly login",
    });
  }
  return null;
}
export default authenticateToken;

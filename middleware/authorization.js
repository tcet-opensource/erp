function authorization(access = []) {
  return (req, res, next) => {
    // remove this in production
    if (process.env.ENVIRONMENT === "local") {
      return next();
    }
    if (!req.user) return res.json({ msg: "kindly login first" });
    if (!access.includes(req.user.type))
      return res.json({ msg: "Unauthorized request" });
    return next();
  };
}

export default authorization;

import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    console.log(req)
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token && req.cookies?.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    if (!["admin"].includes(decoded.role)) {
      return res.status(403).json({ success: false, error: "Forbidden: Insufficient role" });
    }

    next();
  } catch {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};


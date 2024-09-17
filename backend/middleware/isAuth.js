import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
   
    // Get the token from cookies
    const token = req.cookies.token;
   

    if (!token) {
     
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
   

    if (!decode) {
     
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user ID to request object
    req.id = decode.userId;
    

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuthenticated;

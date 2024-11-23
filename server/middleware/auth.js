import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    
    console.log('Received token:', token); // Debug log
    
    if (!token) {
      console.log('No token provided in request'); // Debug log
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required. Please login." 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log
    
    if (!decoded.id) {
      console.log('No user ID in token'); // Debug log
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token format" 
      });
    }

    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.log('Auth error:', error); // Debug log
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};
export default authUser;

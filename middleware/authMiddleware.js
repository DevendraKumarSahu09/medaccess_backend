// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     console.log("yeh raha struct",req.user);

//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// export default authMiddleware;



import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Enhanced error messages
  if (!token) return res.status(401).json({
    success: false,
    message: 'Authentication failed: No token provided'
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate token structure
    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token structure'
      });
    }

    // Standardize user object with userType from token
    req.user = {
      userId: decoded.userId,
      userType: decoded.userType || 'hospital' // Make sure to use userType from token
    };

    next();
  } catch (error) {
    // Detailed error responses
    const errorMessage = error.name === 'TokenExpiredError'
      ? 'Token expired'
      : 'Invalid token';

    res.status(401).json({
      success: false,
      message: `Authentication failed: ${errorMessage}`
    });
  }
};

export default authMiddleware;

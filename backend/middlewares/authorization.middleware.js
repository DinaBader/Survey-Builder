const authorizeMiddleware = (requiredRoles) => {
    return async (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).send('Unauthorized');
      }
  
      if (!Array.isArray(requiredRoles)) {
        requiredRoles = [requiredRoles];
      }
  
      const hasRequiredRole = requiredRoles.some((role) => user.Role === role);
  
      if (!hasRequiredRole) {
        return res.status(403).send('Forbidden');
      }
  
      next();
    };
  };
  
  module.exports = {
    authorizeMiddleware,
  };
  
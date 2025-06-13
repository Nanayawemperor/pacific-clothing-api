exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Not authenticated' });
};

exports.ensureAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Admin access required' });
};

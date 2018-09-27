const AdminChecker = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Protected Route',
    });
  }
};


export default AdminChecker;

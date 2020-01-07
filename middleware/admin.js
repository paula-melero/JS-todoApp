module.exports = function (req, res, next) {
    //403 forbidden
    if(!req.user.isAdmin) 
        return res.status(403).json('Access denied.');
    next();
}
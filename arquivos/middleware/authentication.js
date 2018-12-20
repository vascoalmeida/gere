function auth_session(req, res, next) {
    if(req.session && req.session.user) {
        return next();   
    }
    return res.sendStatus(401);
}

module.exports = {
    authenticate_session: auth_session,
}
function auth_session(req, res, next) {
    if(req.session && req.session.user) {
        return next();   
    }
    return res.sendStatus(401);
}

function auth_admin(req, res, next) {
    if(req.session && req.session.rank === 1) {
        return next();
    }

    else if(req.session) {
        req.session.destroy();
        res.sendStatus(401);
        return;
    }

    return res.end();
}

module.exports = {
    authenticate_session: auth_session,
    authenticate_admin: auth_admin,
}
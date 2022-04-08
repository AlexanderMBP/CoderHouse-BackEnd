const authMiddleware = (req,res,netx) => {
    if (!req.auth) {
        res.status(403)
        .send({
            Error: `-1`,
            description: `Route ${req.originalUrl} method ${req.method} not authorized`})
    } else {
        netx();
    }
};

module.exports = authMiddleware;
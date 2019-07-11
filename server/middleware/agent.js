
function agent(req, res, next) {
  if (!req.user.is_Agent) {
    res.status(403)
      .json({
        status: 403,
        error: 'ACCESS DENIED! Not an Agent',
      });
    return;
  }next();
}


export default agent;


function agent(req, res, next) {
  if (!req.user.is_Agent) {
    res.status(403)
      .json({
        status: 'error',
        data: 'ACCESS DENIED! Not an Agent',
      });
    return;
  }next();
}


export default agent;

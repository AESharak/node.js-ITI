export default function validateEmployee(req, res, next) {
  const {name, salary, email} = req.body;
  if (!name || !salary || !email) {
    return res.status(400).json({message: 'Name, salary, and email are required'});
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof salary !== 'number') {
    return res.status(400).json({message: 'Invalid input data types'});
  }

  if (salary < 1000 || salary > 10_000_000) {
    return res.status(400).json({message: 'Invalid salary salary range (1,000 - 10,000,000)'});
  }

  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({message: 'Invalid Name: Name length should be between (3 - 20)'});
  }

  const EMAILREGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  if (!EMAILREGEX.test(email)) {
    return res.status(400).json({message: 'Invalid Email address'});
  }

  next();
}

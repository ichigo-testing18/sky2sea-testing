import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';

  if (!password || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid admin password. Please try again.'
    });
  }

  const token = jwt.sign(
    { role: 'admin', loggedInAt: new Date() },
    process.env.JWT_SECRET || 'sky2sea_secure_jwt_secret_key_2026_x89a',
    { expiresIn: '24h' }
  );

  return res.json({
    success: true,
    message: 'Admin authentication successful.',
    token
  });
};

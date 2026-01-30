exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'fake-jwt-token' // Placeholder for token
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};

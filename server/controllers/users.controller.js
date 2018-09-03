function get(req, res) {
  // Determine if getting one or certain users
  if (req.params.id && typeof req.params.id === 'string') {
    res.json({ name: 'New User' });
    return;
  }
  res.json([{ name: 'User 1' }, { name: 'User 2' }]);
}

module.exports.get = get;

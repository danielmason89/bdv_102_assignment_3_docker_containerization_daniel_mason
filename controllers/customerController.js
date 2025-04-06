import SiteUser from '../models/siteUserModel.js';
// Optionally import bcrypt if you want to hash passwords
// import bcrypt from 'bcrypt';

// POST /api/customers → create new user
export const createCustomer = async (req, res) => {
  try {
    const { email_address, phone_number, password } = req.body;

    // Example: simple password hashing (if needed)
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await SiteUser.create({
      email_address,
      phone_number,
      password //: hashedPassword, // if using hashing
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/customers/:id → fetch user info
export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await SiteUser.findByPk(id, {
      attributes: ['id', 'email_address', 'phone_number'] // omit password
    });
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

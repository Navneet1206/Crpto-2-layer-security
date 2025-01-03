import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { Account } from './models/Account.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB    
connect('mongodb://localhost:27017/crypto?directConnection=true')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/accounts', async (req, res) => {
  try {
    const { publicKey, privateKey, superKeyHash } = req.body;
    console.log('Creating account:', { publicKey, superKeyHash });

    const existingAccount = await Account.findOne({
      $or: [{ publicKey }, { privateKey }],
    });

    if (existingAccount) {
      console.log('Account already exists');
      return res.status(400).json({ error: 'Account already exists' });
    }

    const account = new Account({
      publicKey,
      privateKey,
      superKeyHash,
    });

    const savedAccount = await account.save();
    console.log('Account created successfully:', savedAccount._id);
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/accounts/verify', async (req, res) => {
  try {
    const { privateKey, publicKey, superKeyHash } = req.body;
    console.log('Verifying account:', { publicKey });

    const account = await Account.findOne({ privateKey });

    if (!account || account.publicKey !== publicKey || account.superKeyHash !== superKeyHash) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Account verified successfully');
    res.json(account);
  } catch (error) {
    console.error('Verify account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
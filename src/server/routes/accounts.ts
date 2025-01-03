import { Router } from 'express';
import { Account } from '../models/Account';
import { validateSuperKey } from '../../utils/crypto';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { publicKey, privateKey, superKeyHash } = req.body;

    // Check for existing accounts
    const existingAccount = await Account.findOne({
      $or: [{ publicKey }, { privateKey }],
    });

    if (existingAccount) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    const account = new Account({
      publicKey,
      privateKey,
      superKeyHash,
    });

    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { privateKey, publicKey, superKeyHash } = req.body;

    const account = await Account.findOne({ privateKey });

    if (!account || account.publicKey !== publicKey || account.superKeyHash !== superKeyHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
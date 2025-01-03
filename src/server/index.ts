import express from 'express';
import { connect } from 'mongoose';
import accountRoutes from './routes/accounts';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connect(process.env.MONGODB_URI || 'mongodb+srv://Navneet:Navneet12@cluster0.gjlty.mongodb.net/crypto?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/accounts', accountRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
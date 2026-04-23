import express from 'express';
const app = express();
import cors from 'cors';
import connection from './config/db.js';

app.use(express.json());
app.use(cors());



import userRoutes from './routes/user.routes.js';
import medicineRoutes from './routes/medicine.routes.js';
app.use('/image', express.static('image'));
app.use('/api', userRoutes);
app.use('/api', medicineRoutes);


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
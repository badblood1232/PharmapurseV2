import express from 'express';
const app = express();
import cors from 'cors';
import connection from './config/db.js';

app.use(express.json());
app.use(cors());



import routes from './routes/user.routes.js';

app.use('/api', routes);


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
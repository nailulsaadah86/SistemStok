import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('ok'));
app.listen(9999, () => console.log('Test server on 9999'));

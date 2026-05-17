require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
connectToMongo();
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000


app.use(cors({
  origin: "https://notes-app-rrhj-ppvux5fv9-surathchakraborty05s-projects.vercel.app"
}));
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))
// app.get('/', (req, res) => {
//   res.send('Hello Surath!')
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

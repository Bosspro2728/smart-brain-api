const express = require('express');
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres://smart_brain_ld63_user:GCaBONieuvs6LmkqHxlK1zlfjp33wUB5@dpg-cjd5cjs5kgrc73ancn6g-a.frankfurt-postgres.render.com/smart_brain_ld63',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(BodyParser.json());
app.use(cors())




app.get('/', (req, res)=>{res.send('it is working!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, db)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})



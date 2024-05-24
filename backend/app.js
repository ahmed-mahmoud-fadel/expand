const express = require('express');
require('dotenv/config');

const authJwt= require('./utils/authJwt');

const errorHandler = require('./utils/error-handler');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

//middleware
app.use(express.json());
app.use(authJwt());
app.use(morgan('tiny'));
app.use(cors());
app.use(errorHandler);

//Routes
const userRoutes = require('./routes/User');
const solutionRoutes = require('./routes/Solution');
const blogRoutes = require('./routes/Blog');
const pricingPlansRoutes = require('./routes/PricingPlans');

const contactUSRoutes = require('./routes/ContactUs');
const invoiceRoutes = require('./routes/Invoice');
const paymentRoutes = require('./routes/Payment');
const subscriptionRoutes = require('./routes/Subscription');
const userContactAccessRoutes = require('./routes/UserContactAccess');
const analyticsRoutes = require('./routes/analytics');
const productRoutes = require('./routes/Product');

const engineRoutes = require('./routes/Engine')



const api = process.env.API_URL;

app.use(`${api}/user`, userRoutes);
app.use(`${api}/solution`, solutionRoutes);
app.use(`${api}/pricingPlans`, pricingPlansRoutes);
app.use(`${api}/subscription`, subscriptionRoutes);
app.use(`${api}/contact`, contactUSRoutes);
app.use(`${api}/blog`, blogRoutes);
app.use(`${api}/invoice`, invoiceRoutes);
app.use(`${api}/payment`, paymentRoutes);
app.use(`${api}/userContactAccess`, userContactAccessRoutes);
app.use(`${api}/analytics`, analyticsRoutes);
app.use(`${api}/product`, productRoutes);
app.use(`${api}/engine`, engineRoutes)




//Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})






// const keys=require('../config/keys');
// const stripe=require('stripe')(keys.stripeSecretKey);

// module.exports=app=>{
//     app.post('/api/stripe', async (req,res)=>{
//         const charge=await stripe.charges.create({
//             amount: 500,
//             currency: 'usd',
//             description: '$5 for 5 credits',
//             source: req.body.id
//         });
//         // req.user.credits+=5;
//         // const user=await req.user.save();

//         // res.send(user);
//         console.log(charge);
        
//     });
// };

// const keys = require('../config/keys');
// const stripe = require('stripe')(keys.stripeSecretKey);
// const requireLogin=require('./middleware/requireLogin');
// const YOUR_DOMAIN = 'http://localhost:3000';
// module.exports = app => {
//   app.post('/api/stripe', requireLogin,async (req, res) => {

//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: '$5 for 5 credits',
//               },
//               unit_amount: 500,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: {YOUR_DOMAIN}/success,
//         cancel_url: {YOUR_DOMAIN}/cancel,
//       });

//       // Updating user credits should be inside the try block to catch any errors
//       req.user.credits += 5;
//       const user = await req.user.save(); // Assure this operation is non-blocking or fast
//       res.send(user);
//     } catch (error) {
//       // Catch any errors that occur during the process
//       console.error("Stripe Checkout Error:", error.message);
//       res.status(500).send({ error: error.message });
//     }
//   });
// };


// const keys = require('../config/keys');
// const stripe = require('stripe')(keys.stripeSecretKey);
// const requireLogin = require('./middleware/requireLogin');
// const YOUR_DOMAIN = 'http://localhost:3000';

// module.exports = app => {
//   app.post('/api/stripe', requireLogin, async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: '$5 for 5 credits',
//               },
//               unit_amount: 500,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/success`, // Enclosed in backticks and ${} syntax
//         cancel_url: `${YOUR_DOMAIN}/cancel`,   // Enclosed in backticks and ${} syntax
//       });

//       // Updating user credits should be inside the try block to catch any errors
//       req.user.credits += 5;
//       const user = await req.user.save(); // Assure this operation is non-blocking or fast
//       res.send(user);
//     } catch (error) {
//       // Catch any errors that occur during the process
//       console.error("Stripe Checkout Error:", error.message);
//       res.status(500).send({ error: error.message });
//     }
//   });
// };

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin=require('../middlewares/requireLogin');
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: '$5 for 5 credits',
              },
              unit_amount: 500,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
      });

      // Updating user credits should be inside the try block to catch any errors
      req.user.credits += 5;
      const user = await req.user.save(); // Assure this operation is non-blocking or fast
      res.send(user);
    } catch (error) {
      // Catch any errors that occur during the process
      console.error("Stripe Checkout Error:", error.message);
      res.status(500).send({ error: error.message });
    }
  });
};


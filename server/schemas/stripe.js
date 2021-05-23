const config = require('../config/');
const stripe = require('stripe')('sk_test_51IscczDAcMgd87pEhWUTsYRg7FjgvbeU1CGuWALdk3OPQFWfJttRdbkx271QaMjGqngFoCiIqGLkXiQ1cckRGjDh00rKFJUDHo')
const request = require('request-promise-native');
const querystring = require('querystring');

const express = require('express');
const querystring = require('querystring');
const router = express.Router();


// Middleware that requires a logged-in shop owner

function shopRequired(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/pilots/login');
    }
    next();
}

/*
* Get /shopOwners/stripe/authorize
*
* Redirect to Stripe to set up payments
*/

router.get('/authorize', pilotRequired, (req, res) => {

    // Generate a random string as 'state' to protect it and include it in the session

    req.session.state = Math.random()
    .toString(36)
    .slice(2);

    // Define the mandatory

    let parameters = {
        client_id: config.stripe.clientId,
        state: req.sessions.state
    };

      // Optionally, the Express onboarding flow accepts `first_name`, `last_name`, `email`,
  // and `phone` in the query parameters: those form fields will be prefilled
//   parameters = Object.assign(parameters, {
//     redirect_uri: config.publicDomain + '/pilots/stripe/token',
//     'stripe_user[business_type]': req.user.type || 'individual',
//     'stripe_user[business_name]': req.user.businessName || undefined,
//     'stripe_user[first_name]': req.user.firstName || undefined,
//     'stripe_user[last_name]': req.user.lastName || undefined,
//     'stripe_user[email]': req.user.email || undefined,
//     'stripe_user[country]': req.user.country || undefined
//     // If we're suggesting this account have the `card_payments` capability,
//     // we can pass some additional fields to prefill:
//     // 'suggested_capabilities[]': 'card_payments',
//     // 'stripe_user[street_address]': req.user.address || undefined,
//     // 'stripe_user[city]': req.user.city || undefined,
//     // 'stripe_user[zip]': req.user.postalCode || undefined,
//     // 'stripe_user[state]': req.user.city || undefined,
//   });

    console.log('Starting Express flow:', parameters);
    // Redirect to Stripe to start the Express onboarding flow
    res.redirect(
        config.stripe.authorizeUri + '?' + querystring.stringify(parameters)
    );

})
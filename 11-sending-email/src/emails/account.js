const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'developer.brunv@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        // html: ''
    });
};

const sendCancelationEmail = (emal, name) => {
    sgMail.send({
        to: email,
        from: 'developer.brunv@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
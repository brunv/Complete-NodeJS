const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'developer.brunv@gmail.com',
    from: 'developer.brunv@gmail.com',
    subject: 'This is my test on SendGrid.',
    text: 'You can ignore this. Its just a test.'
});
const admin = require('firebase-admin');

const serviceAccount = require('./traveltribe-serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

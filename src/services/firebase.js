import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyCcgoQLCU6uLn5UYCrPJKOdTIUr5f2XPbQ',
  authDomain: 'not-defteri-bc76a.firebaseapp.com',
  databaseURL: 'https://not-defteri-bc76a.firebaseio.com',
  projectId: 'not-defteri-bc76a',
  storageBucket: 'not-defteri-bc76a.appspot.com',
  messagingSenderId: '677864771374',
  appId: '1:677864771374:web:099d47bc274ef51a1274bf',
  measurementId: 'G-PSRTWQXERC'
})
export const db = firebaseApp.database()

// apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
// authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
// databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
// projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
// appId: process.env.VUE_APP_FIREBASE_APPID,
// measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID

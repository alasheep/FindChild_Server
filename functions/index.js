const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-project-1028360976451.firebaseio.com"
});

const db = admin.firestore();
const cors = require('cors')({origin: true});

exports.reqInfo = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
       
        // res.status(200).json({
        //     message: 'It worked!',
        //   })

        // return res;

        // const docRef = db.collection('cur_location').doc('lLxQJ1cOQv5nU3HNNSSm');
        // const getDoc = docRef.get()
        // .then(doc => {
        //     if (!doc.exists) {
        //         console.log('No such document!');
        //     return res.send('Not Found')
        //     } 
        //     console.log(doc.data());
        //     return res.send(doc.data());

        // })
        // .catch(err => {
        //     console.log('Error getting document', err);
        // });


        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('cur_location').doc('lLxQJ1cOQv5nU3HNNSSm').update({ cur_time: '3333'/*req.body.text*/ });

        res.status(200).json({
            message: 'It worked!',
        })
    
    });
});

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

exports.saveToken = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var fcm_device_token = "dtoFOvFrsNE:APA91bGfjCrdAdiJf4dQRi5HarR7fehAmVSIN8d88cAe0K2GQoDuUPtl6EDVM5CDwSW1S_JrFd3AaEYMY3bjKGD2D60nt5Dpbm4zsOddgppYyj1NGlm6xwl4RBjTpycGMp5-2i-FXku5";

        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('push_token').doc('yAmpQQ271chZWM82LtI2').update({ token: fcm_device_token/*req.body.text*/ });

        res.status(200).json({
            message: 'It worked saveToken function!',
        })
   
    });
});


exports.sendFCM = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var fcm_device_token = "dtoFOvFrsNE:APA91bGfjCrdAdiJf4dQRi5HarR7fehAmVSIN8d88cAe0K2GQoDuUPtl6EDVM5CDwSW1S_JrFd3AaEYMY3bjKGD2D60nt5Dpbm4zsOddgppYyj1NGlm6xwl4RBjTpycGMp5-2i-FXku5";

        let payload = {
            notification: {
              title: 'Thanks for your Purchase!',
              body: 'Get 10% off your next purchase with "COMEBACK10".',
            },
          };
      
          // Send notifications to all tokens.
          return admin.messaging().sendToDevice(fcm_device_token, payload);
   
    });
});


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

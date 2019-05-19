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

// for http post
exports.saveToken = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var token = req.query.token;

        console.log("fcm_device_token : "+token);

        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('push_token').doc('yAmpQQ271chZWM82LtI2').update({ token: token/*req.body.text*/ });

        res.status(200).json({
            message: 'It worked saveTokenTest function!'+token
        })
   
    });
});

// for firebase functions
exports.updateToken = functions.https.onCall((data, context) => {
    // cors(req, res, () => {

        // var token = req.query.token;
        var fcm_device_token = data.token;

        console.log("fcm_device_token : "+fcm_device_token);

        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('push_token').doc('yAmpQQ271chZWM82LtI2').update({ token: fcm_device_token/*req.body.text*/ });
        // db.collection('push_token').doc('yAmpQQ271chZWM82LtI2').child('token').set(fcm_device_token);

        // res.status(200).json({
        //     message: 'It worked saveTokenTest function!'+token
        // })
        return {
            message : 'OK'
        }
   
    // });
});

exports.sendFCM = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // var fcm_device_token = "dtoFOvFrsNE:APA91bGfjCrdAdiJf4dQRi5HarR7fehAmVSIN8d88cAe0K2GQoDuUPtl6EDVM5CDwSW1S_JrFd3AaEYMY3bjKGD2D60nt5Dpbm4zsOddgppYyj1NGlm6xwl4RBjTpycGMp5-2i-FXku5";

        db.collection('push_token').doc('yAmpQQ271chZWM82LtI2').get().then(doc => {
            // 성공하면 문서안의 'text'필드 값을 응답해 줍니다.
            // return res.status(200).send({ reuslt : doc.data() });

            var fcm_device_token = doc.data();

            let payload = {
                notification: {
                  title: 'Thanks for your Purchase!',
                  body: 'Get 10% off your next purchase with "COMEBACK10".',
                },
            };
          
              // Send notifications to all tokens.
            admin.messaging().sendToDevice(fcm_device_token, payload)
            // .then(() => {res.send("OK")} )
            // .catch(() => { res.send("FAIL")});
                .then(function(response) {
                    return res.send("OK")
                })
                .catch(function(error) {
                    return res.send("FAIL")
                });

            return res.send("OK")

        }).catch(err => {
            console.log('Error', err);

            res.status(200).json({
                message: 'It worked storeLocation function!, but happened error' + err,
            })
        });       
   
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

exports.storeLocation = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var latitude = req.query.latitude;
        var longtitude = req.query.longtitude;

        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('cur_location').doc('lLxQJ1cOQv5nU3HNNSSm').update({ 
            cur_latitude: latitude,
            cur_longtitude: longtitude 
        });

        res.status(200).json({
            message: 'It worked storeLocation function!',
        })
   
    });
});

exports.getLocation = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        var latitude = req.query.latitude;
        var longtitude = req.query.longtitude;

        // 디비 'cur_location' 컬렉션 'lLxQJ1cOQv5nU3HNNSSm' 문서의 'cur_time' 필드의 값을 요청값 body의 cur_time 값으로 업데이트 해줍니다.
        db.collection('cur_location').doc('lLxQJ1cOQv5nU3HNNSSm').get().then(doc => {
            // 성공하면 문서안의 'text'필드 값을 응답해 줍니다.
            return res.status(200).send({ reuslt : doc.data() });
        }).catch(err => {
            console.log('Error', err);

            res.status(200).json({
                message: 'It worked storeLocation function!, but happened error' + err,
            })
        });

        // res.status(200).json({
        //     message: 'It worked storeLocation function!',
        // })
   
    });
});

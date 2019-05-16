# FindChild_Server
It is a service for our family.

FindChild_Service is server side of this service.



## How to build

1. Install firebase tools and login

   $ npm install -g firebase-tools 

   $ firebase login

   $ firebase init

   

2. Install firebase admin and cors for firebase functions

   $ npm install —save firebase-admin

   $ npm install —save cors

   

3. build local environment

   $ firebase serve

   

4. deploy to firebase functions

   $ firebase deploy —only functions

   

5. deploy to firebase hosting

   $ firebase deploy —only hosting
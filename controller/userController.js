const crypto = require('crypto');
const requestIP = require('request-ip')
const { exec } = require('child_process');
const Users = require('../model/Users.modal');
class UsersController {
   index(req, res, next) {
      const _id = crypto.randomUUID();
      //   Get data speed internet
      console.log(req)
      exec('speed-test --json', (err, stdout, stderr) => {
         if (err || stderr)
            return res.send('Error while testing internet speed.');
         const result = JSON.parse(stdout);
         const response = {
            internet: {
               ping: result.ping,
               douwn: result.download,
               up: result.upload,
            },
         };
      console.log(response);
      //  if have speed interet will update database
         if (response) {
            Users.updateOne({ _id: _id }, { $set: response })
               .exec()
               .then(() => {
                  Users.find({})
                     .then((user) => res.end(user))
                     .catch((error) => next(error));
               })
               .catch(() => {
                  res.status(500).json({
                     success: false,
                     message: 'Server error. Please try again.',
                  });
               });
         }
      });
         const user = new Users({
            _id,
            ip: requestIP.getClientIp(req),
            userAgent: req.headers['user-agent'],
         });
         return user
            .save()
            .then(() => {
               // return value user to client
               Users.find({})
                  .then((user) => res.send(user))
                  .catch((error) => next(error));
            })
            .catch((error) => {
               console.log(error);
               res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: error.message,
               });
            });
      //  });
   }
}

module.exports = new UsersController();

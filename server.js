const express = require("express");
const app = express();
// const cors = require("cors");
var db = require("./models");

// app.use(cors);

app.get("/api/deals", function (req, res) {

    db.Deal.findAll({include: [db.User]}).then(function (results) {
      console.log(results)

      let openDeals = [];
      let pendingDeals = [];
      let closedDeals = [];

      for (let i in results) {
        if (results[i].status == 'open') {
          openDeals.push(results[i])
        } else if (results[i].status == 'pending') {
          pendingDeals.push(results[i])
        } else if (results[i].status == 'closed') {
          closedDeals.push(results[i]);
        }
      }

      deals = { openDeals: openDeals, pendingDeals: pendingDeals, closedDeals: closedDeals }
      return res.json(deals);
      

    });
});

app.post("/api/deals", function(req, res) {
  console.log(req.body)
 db.Deal.create(req.body)
   .then(function(dbPost) {
       res.json(dbPost);
       console.log(dbPost);
     }).catch(error => {
       console.log(error)
     })
})

// app.post("/api/deals", function (req, res) {
//   console.log(req.body);
//   db.Deal.create(req.body).then(function (response) {
//     res.json(response);
//     // res.redirect('/');
//   });
// });

app.post("/api/users", function (req, res) {
  console.log(req.body);
  db.User.create(req.body).then(function (response) {
    // res.json(response);
    res.redirect('/');
  });
});

const port = 5000;

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    db.sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      app.listen(port, () => console.log(`server started on port ${port}`))
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
});


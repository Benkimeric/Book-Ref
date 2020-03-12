const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to db
const connect = async function() {
  mongoose.connect(
    "mongodb+srv://benkimeric:test123@cluster0-nla9d.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: "graphql-dbname"
    }
  );
};

connect()
  .then(() => {
    console.log("success connecting");
  })
  .catch(e => {
    console.log("error connecting: ", e.message);
  });

mongoose.connection.on("error", err => {
  console.log("the error is", err);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("listening to port 4000");
});

import "reflect-metadata"; // typeorm/graphql needs "reflect metadata" 2 work properly
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Account } from "./entities/Account";
import express from "express";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "./resolvers/account";
import { HelloResolver } from "./resolvers/hello";
import { TransactionResolver } from "./resolvers/transaction";
import { Transaction } from "./entities/Transaction";

// database connection
const main = async () => {
  const conn = await createConnection({
    type: "mysql",
    database: "spacedb",
    username: "doadmin",
    password: "lKubEUzCynADhh2w",
    host: "db-mysql-blr1-99883-do-user-8337741-0.b.db.ondigitalocean.com",
    port: 25060,
    synchronize: true,
    logging: !__prod__,
    debug: !__prod__,
    entities: [Account, Transaction],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  // run migrations
  await conn.runMigrations();

  // express/apollo-graphql server
  const app = express();
  app.use(cors());

  //   app.get("/", (_req, res) => { // this is a test endpoint
  //     res.send("Hello World");
  //   });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AccountResolver, TransactionResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: true,
  }); // apply apollo server middleware to create graph ql endpoint
  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

main();

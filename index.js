const express = require("express");
const Queue = require("bull");

const app = express();

const redisOptions = { host: "localhost", port: 6379 };

const { expirationQueue } = require("./expiration.queue");

// EXPRESS SETUP

app.post("/hello-world", async (_req, res) => {
  await expirationQueue.addExpirationQueue("expiration", "expiration");
  res.json({ queued: true });
});

const queues = {
  expirationQueue: new Queue("expiration", {
    connection: redisOptions,
  }),
};
// BULL-BOARD SETUP (DASHGOARD)

const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const serverAdapter = new ExpressAdapter();

const bullBoard = createBullBoard({
  queues: [new BullMQAdapter(queues.expirationQueue)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath("/bull-board");

app.use("/bull-board", serverAdapter.getRouter());

// STARTUP

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  //   console.log(`Bull arena is available at: http://localhost:${PORT}/arena`);
  console.log(
    `Bull-board is available at: http://localhost:${PORT}/bull-board`
  );
});

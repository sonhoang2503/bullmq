const { BaseQueue } = require("./base.queue");
const { expirationWorker } = require("./worker");

class ExpirationQueue extends BaseQueue {
  constructor() {
    super("expiration");
    // this.processJob("expiration", 5, expirationWorker.checkExpiration);
    this.differentProcessJob("expiration", 5, __dirname + '/processor.js');
  }

  async addExpirationQueue(name, data) {
    await this.addJob(name, data);
  }
}

exports.expirationQueue = new ExpirationQueue();

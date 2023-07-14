const Queue = require("bull");

class BaseQueue {
  constructor(queueName) {
    this.queue = new Queue(queueName, `6379`);

    this.queue.on("completed", (job) => {
      console.log("Job removed");
      //   job.remove();
    });

    this.queue.on("global:completed", (jobId) => {
      this.log.info(`Job ${jobId} completed`);
    });

    this.queue.on("global:stalled", (jobId) => {
      this.log.info(`Job ${jobId} is stalled`);
    });
  }

  async addJob(name, data) {
    await this.queue.add(name, data, {
      attempts: 3,
      //   delay: 10000,
      backoff: { type: "fixed", delay: 10000 },
    });
  }

  async processJob(name, concurrency, callback) {
    await this.queue.process(name, concurrency, callback);
  }

  async differentProcessJob(name,concurrency,path){
    await this.queue.process(name,concurrency,path)
  }
}

module.exports = { BaseQueue };

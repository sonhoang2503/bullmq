
class ExpirationWorker {
  async checkExpiration(job, done) {
    try {
      //   const { value } = job.data;
      console.log(job.data);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error);
    }
  }
}

exports.expirationWorker = new ExpirationWorker();

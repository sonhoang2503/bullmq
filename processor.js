module.exports =  (job) => {
  try {
    //   const { value } = job.data;
    console.log(job.data);
    job.progress(100);
    return Promise.resolve(job.data);
  } catch (error) {
    log.error(error);
  }
};

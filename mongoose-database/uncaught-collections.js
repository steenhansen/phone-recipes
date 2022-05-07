Uncaught_coll = global.GLOBAL_CONFIG.G_UNCAUGHT_COLLECTION;



async function recordException(new_exception) {
  try {
    const _id = new Date().getTime();
    const uncaught_error = new_exception.browser_error;
    const uncaught_record = { _id, uncaught:uncaught_error };
    console.log("uncaught errors", new_exception)
    const recorded_exception = await Uncaught_coll.create(uncaught_record);
    return recorded_exception;
  } catch (e) {
    // abandon all hope yea who enter here
  }
}

module.exports = {
  recordException
};





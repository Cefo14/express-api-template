/**
 *
 * @param {Number} elements
 * @param {Function} generator
 * create and fill an array by function generator
 */
const arrayAutoFillGenerator = (elements, generator) => (
  new Array(elements)
    .fill(null)
    .map(() => generator())
);

/**
 *
 * @param {Object} object
 * @returns {String}
 * format a pretty json in console
 */
// eslint-disable-next-line no-console
const prettyConsole = (object, type = 'info') => console[type](JSON.stringify(object, null, 2));

/**
 *
 * @param {Function} f
 * check if the function is a promise
 */
const isPromise = (f) => f instanceof Promise || f.constructor.name === 'AsyncFunction';

/**
 *
 * @param {Function} f
 * @param {...args} args
 * @returns {*} a callback result
 * evalue the execution time time of a function and returns your value
 */
const evalueFunctionExecutionTime = async (f, ...args) => {
  const cb = args.length > 0 ? f.bind({}, ...args) : f;
  const hrstart = process.hrtime();
  const result = isPromise(f) ? (await cb()) : await (async () => cb())();
  const hrend = process.hrtime(hrstart);
  // eslint-disable-next-line no-console
  console.info('f(%s) Execution time (hr): %ds %dms', f.name, hrend[0], hrend[1] / 1000000);
  return result;
};


/**
 *
 * @param {Schema} model
 * @param {Number} page
 * @param {Number} limit
 * @returns {Object}
 * paginate a model
 */
const paginate = async (model, page, limit, sort) => {
  const paginatedModel = model
    .find()
    .skip(page * limit)
    .limit(limit);

  if (sort) {
    paginatedModel.sort(sort);
  }

  const countModel = model.countDocuments();
  const [items, totalItems] = await Promise.all([paginatedModel, countModel]);
  return {
    items,
    total: totalItems,
    currentPage: page,
    pages: Math.ceil(totalItems / limit),
  };
};

module.exports = {
  arrayAutoFillGenerator,
  prettyConsole,
  isPromise,
  evalueFunctionExecutionTime,
  paginate,
};

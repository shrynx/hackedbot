const parse = require('date-fns/parse');
const isWithinRange = require('date-fns/is_within_range');
const startOfToday = require('date-fns/start_of_today');
const endOfToday = require('date-fns/end_of_today');
const subDays = require('date-fns/sub_days');
const { compose } = require('ramda');

// date fetched from Hacked.com is in format of dd/mm/yyyy
// for processing we need mm/dd/yyyy
const formatDate = orginalDate => {
  const [date, month, year] = orginalDate.split('.');
  return [month, date, year].join('.');
};

const todayStart = startOfToday();
const todayEnd = endOfToday();
const sevenDaysAgo = subDays(todayStart, 7);

// check if a given date is is within start of current week and end of today
const isWithinCurrentWeek = date => isWithinRange(date, sevenDaysAgo, todayEnd);
// composed function to format, parser and validate a given date
const isValidDate = compose(isWithinCurrentWeek, parse, formatDate);

module.exports = { isValidDate };

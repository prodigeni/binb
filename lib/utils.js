/**
 * Helper function used to build leaderboards.
 * Rearrange database results in an object.
 */

exports.buildLeaderboards = function(pointsresults, timesresults) {
  var obj = {
    pointsleaderboard: [],
    timesleaderboard: []
  };
  for (var i=0; i<pointsresults.length; i+=2) {
    obj.pointsleaderboard.push({
      username: pointsresults[i],
      totpoints: pointsresults[i+1]
    });
    obj.timesleaderboard.push({
      username: timesresults[i],
      bestguesstime: (timesresults[i+1] / 1000).toFixed(2)
    });
  }
  return obj;
};

/**
 * Return the string representation of a given date in the 'DD/MM/YYYY' format.
 */

exports.britishFormat = function(date) {
  var day = date.getDate()
    , month = date.getMonth() + 1
    , year = date.getFullYear();

  if (day < 10) {
    day = '0'+day;
  }
  if (month < 10) {
    month = '0'+month;
  }
  return day+'/'+month+'/'+year;
};

/**
 * Check whether a given string is a valid email address.
 */

exports.isEmail = function(str) {
  // Simple filter, but it covers most of the use cases.
  var filter = /^[+a-zA-Z0-9_.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,6}$/;
  return filter.test(str);
};

/**
 * Check whether the given argument is a function.
 */

exports.isFunction = function(arg) {
  return typeof arg === 'function';
};

/**
 * Check whether the given argument is a string.
 */

exports.isString = function(arg) {
  return typeof arg === 'string';
};

/**
 * Check whether a given string is a well formed username.
 */

exports.isUsername = function(str) {
  var filter = /^[a-zA-Z0-9\-_]{1,15}$/;
  return filter.test(str);
};

/**
 * Get a random slogan.
 */

exports.randomSlogan = function() {
  var slogans = [
    'guess the song.'
    , 'name that tune.'
    , 'i know this track.'
  ];
  return slogans[Math.floor(Math.random() * slogans.length)];
};

/**
 * Return the sorting parameters used to get users ordered by best guess time.
 */

exports.sortParams = function(offset) {
  var params = [
    'users'
    , 'by'
    , 'user:*->bestguesstime'
    , 'get'
    , '#'
    , 'get'
    , 'user:*->bestguesstime'
    , 'limit'
    , offset
    , '30'
  ];
  return params;
};

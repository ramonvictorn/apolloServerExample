/**
 * @file logger.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the logger
 * @module libs/logger
 * @function - Receive a message and makes a console log with the date, time, and message
 * @param {String} msgs - A strings to give console log
 */

exports.log = log;


function log(msgs){
    var date = new Date()
    var day = date.getDate();
    var month =  getNameMonth(date.getMonth());
    var hour = fixedNumber(date.getHours()); 
    var minutes = fixedNumber(date.getMinutes());
    var seconds = fixedNumber(date.getSeconds());
    var msgConcat = '';
    
    for (var i=0; i < arguments.length; i++) {
        if(typeof arguments[i] == "object"){
            msgConcat += '' + JSON.stringify(arguments[i], null,2);
        }else{
            msgConcat += '' + arguments[i];
        }
    }
    console.log(day + ' ' + month + ' ' + hour + ':' + minutes + ':' + seconds + ' - ' + msgConcat)
}

/**
 * @function - Return de name of the month
 * @param {number} number - A number from 0 to 11 representing a month (Jan = 0, Feb = 1)
 */
function getNameMonth(number){
    if(number > 11) return('invalid')

    var nameMonths = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

    return nameMonths[number];

}

/**
 * @function - Add a 0 to the left if the number is less than 10
 * @param {number} number - Number integer
 */
function fixedNumber(number){
    if(number < 10){
        return '0'+number
    }else{
        return number;
    }
}
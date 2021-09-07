var dateInput = document.querySelector("#bday-input");
var showButton = document.querySelector("#show-button");
var outputDiv = document.querySelector("#output");
var nextOutputDiv = document.querySelector("#next-palindrome-output");
var previousOutputDiv = document.querySelector("#previous-palindrome-output");

function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reversedStr = reverseStr(str);
    return str === reversedStr;
}

function convertDateToStr(date) {
    var dateToStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateToStr.day = '0' + date.day;
    } else {
        dateToStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateToStr.month = '0' + date.month;
    } else {
        dateToStr.month = date.month.toString();
    }

    dateToStr.year = date.year.toString();
    return dateToStr;
}

function getAllDateFormats(date) {
    var dateToStr = convertDateToStr(date);

    var ddmmyyyy = dateToStr.day + dateToStr.month + dateToStr.year;
    var mmddyyyy = dateToStr.month + dateToStr.day + dateToStr.year;
    var yyyymmdd = dateToStr.year + dateToStr.month + dateToStr.day;
    var ddmmyy = dateToStr.date + dateToStr.month + dateToStr.year.slice(-2);
    var mmddyy = dateToStr.month + dateToStr.day + dateToStr.year.slice(-2);
    var yymmdd = dateToStr.year.slice(-2) + dateToStr.month + dateToStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var allDateFormats = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < allDateFormats.length; i++) {
        if (isPalindrome(allDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else {
            if (month === 2) {
                if (isLeapYear(year)) {
                    day = 29;
                } else {
                    day = 28;
                }
            } else {
                day = daysInMonth[month - 1];
            }
        }

    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getPreviousPalindromeDate(date) {
    var counter = 0;
    var previousDate = getPreviousDate(date);
    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [counter, previousDate];
}

showButton.addEventListener("click", palindromeBirthday);

function palindromeBirthday(e){
    var bdayStr = dateInput.value;
    if(bdayStr !== ""){
        var listOfDates = bdayStr.split('-');
        var date = {
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0])
        }; 

        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            outputDiv.innerText = "Hurray!! your birthday is a palindrome ❤️";
            nextOutputDiv.style.display = "none";
            previousOutputDiv.style.display = "none";
        }
        else{
            outputDiv.innerText = "Sorry!! your birthday is not palindrome! 😔";
            var[ctr, nextDate] = getNextPalindromeDate(date);
            var[counter, previousDate] = getPreviousPalindromeDate(date);
            nextOutputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
            previousOutputDiv.innerText = `The previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${counter} days! 😔`;
        }
    }
}

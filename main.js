function reverseString(str) {
    var listOfChar = str.split('')
    var reverseChar = listOfChar.reverse()
    var reverseStr = reverseChar.join('')
    return reverseStr
}

function isPalindrome(str) {
    var reverseCheck = reverseString(str)
    return str === reverseCheck

}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr
}

function convertDateIntoAllFormats(date) {
    var dateStr = convertDateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy,
        mmddyyyy,
        yyyymmdd,
        ddmmyy,
        mmddyy,
        yymmdd,
    ]

}

function checkPalindromeForAllDateFormats(date){
    var listOfDates = convertDateIntoAllFormats(date)
    var flag = false
    for (i=0;i<listOfDates.length;i++){
        if (isPalindrome(listOfDates[i])){
        flag = true;
        break;
    }
}
    return flag;

}

function leapYear(year){
    if (year % 400 === 0){
        return true
    }
    if ( year % 100 === 0){
        return false
    }
    if ( year % 4 === 0 ){
        return true
    }
    return false
}

function getnextDate(date){
    var day = date.day + 1
    var month = date.month
    var year = date.year

    var datesList = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2 ){
        if(leapYear(year)){
            if(day>29){
                day = 1;
                month++
            }
        }
        else {
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > datesList[month-1])
        {
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date){
    counter = 0;
    var nextDate = getnextDate(date)
    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getnextDate(nextDate)
    }
    return [ counter , nextDate]
}



function clickHandler(e){
    var bdayStr = inputDate.value;
    if(bdayStr !== ''){
        listOfDateInput = bdayStr.split('-')
        
        var date = {
            day : Number(listOfDateInput[2]),
            month : Number(listOfDateInput[1]),
            year : Number(listOfDateInput[0])
            
            
        }

        
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){   
            outputDiv.innerText = "Yay! Your birthday is a palindrome"
        }
        else {
            var [counter, nextDate] = getNextPalindromeDate(date)
            
            outputDiv.innerText = `The next palindrome date in DD/MM/YYYY format is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days. `

            
        }
        
    }

}

const inputDate = document.querySelector(".input-date")
const checkBtn = document.querySelector(".btn-check")
const outputDiv = document.querySelector(".output")

checkBtn.addEventListener('click', clickHandler)


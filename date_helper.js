/* 
added two protoype methods on the Date object -
adjust_day: when swipes occur on weekends and during non business hours.
    takes # of days and adds them and sets the time 1 millisecond past midnight
adjust_from_GMT: adjust time from GMT to CST. 

check_swipe_post_date: a conditional evaluates first the day of the swipe, Friday(5) and after business hours,
    post_date will adjust 3 days forward - Monday(1).
    Saturday(6), adjust 2 days forward - Monday(1).
    Sunday(0), adjust 1 day forward - Monday(1).
    If swipe is made after the close of business 5 pm - CST (represented in Date() object as 17),
    adjust to 1 millisecond past midnight on the following day.
    If no conditionals are triggered, return the original date argument.
convert_date: when finding the difference using Date object, it returns milliseconds, this function converts 
    into days to calculate interest. Using Math.floor to make sure there is no change unusual interest calculations.
*/
Date.prototype.adjust_day = function(day) {
    this.setDate(this.getDate() + day);
    this.setHours(24,0,0,1);
    return this;
}
Date.prototype.adjust_from_GMT = function(time_diff){
    this.setHours(this.getHours()  + time_diff);
    return this;
}
module.exports= {
    check_swipe_post_date: function(swipe_date) {
        if(swipe_date.getDay() === 5 && swipe_date.getHours() >= 17){
            swipe_date.adjust_day(3);
            return swipe_date;
        }        
        else if(swipe_date.getDay() === 6){
            swipe_date.adjust_day(2);
            return swipe_date;
        }
        else if(swipe_date.getDay() === 0){
            swipe_date.adjust_day(1);
            return swipe_date;
        }
        else if(swipe_date.getHours() >= 17){
            swipe_date.adjust_day(0);
            return swipe_date;
        }
        else {
            return swipe_date;
        }              
    },
    convert_date: function(date) {
        return Math.floor(Math.floor(date)/1000/60/60/24);
    }
}

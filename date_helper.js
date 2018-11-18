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
    check_transaction_post_date: function(transaction_date) {
        if(transaction_date.getDay() === 5 && transaction_date.getHours() >= 17){
            transaction_date.adjust_day(3);
            return transaction_date;
        }        
        else if(transaction_date.getDay() === 6){
            transaction_date.adjust_day(2);
            return transaction_date;
        }
        else if(transaction_date.getDay() === 0){
            transaction_date.adjust_day(1);
            return transaction_date;
        }
        else if(transaction_date.getHours() >= 17){
            transaction_date.adjust_day(0);
            return transaction_date;
        }
        else {
            return transaction_date;
        }              
    },
    convert: function(date) {
        return Math.floor(Math.floor(date)/1000/60/60/24);
    }
}

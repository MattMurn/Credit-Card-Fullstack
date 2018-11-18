/* 
    Card: 
        Consturctor properties:
            apr - argument
            credit_limit - argument
            customer_id - to associate customers w/ cards
            open_date - used a default value of 'new Date()' here & throughout this class,
            so that, if a certain date isn't speficied returned is the current balance.
            balance - keep track of current balance.
            card_transactions - hold transaction data for current month.
            current_interest - keep track of interest based on length of time between transactions.
        Card Methods:
            calc_interest - takes arguements (amount, days) and returns a interest accrued over that time
            card_transaction - "swip" of card takes arguments (type, amount, date) declared swip_approved 
                to be used in 'type' conditional. 'type' conditional to handle updating balance. finally 
                    send an object with transaction date to card_transactions array to

*/
// let date_helper = require('./date_proto');  
module.exports = class Card {
    constructor(apr, credit_limit, open_date=new Date(), customer_id=null,){
        this.apr = apr;
        this.credit_limit= credit_limit;
        this.customer_id = customer_id;
        this.open_date = open_date;
        this.balance = 0;
        this.card_tranactions = [];
        this.current_interest = [];
    }
    calc_interest(amount, days) {
        return Math.round((((amount * (this.apr/ 365)) * days)) * 100)/100;
    }
    card_transaction(type, amount, date=new Date()) {
        let swip_approved;
        if(type === 'charge' && (amount + this.balance) < this.credit_limit){
            swip_approved = true;
            this.balance += amount;
        }
        else if(type === 'payment'){
            this.balance -= amount;
        }
        else{
            swip_approved = false;
        } // push each transaction 
        this.card_tranactions.push({
            swip_id: Math.random(),
            swip_type: type,
            swip_timestamp: date,
            post_date: null,
            swip_amount: amount,
            current_balance: this.balance,
            interest_adjusted: null,
            swip_approved: swip_approved
        });
    }
    get_current_balance(day=new Date()) {
        // iterate over transactions, 
        // don't need to iterate everytime, just need to add new information
        this.card_tranactions.map((transaction, i)=> {
            let previous_swip_timestamp;
            (i === this.card_tranactions.length-1) ? previous_swip_timestamp = new Date() : 
            previous_swip_timestamp = this.card_tranactions[i+1].swip_timestamp;
            let days = Math.floor(this.convert_date(previous_swip_timestamp - transaction.swip_timestamp));
            this.current_interest.push(this.calc_interest(transaction.current_balance, days))
        })
        let calc_days = Math.floor((day - this.open_date)/1000/60/60/24); 
        let interest = this.current_interest.reduce((total_interest, adding_interest)=> total_interest + adding_interest,0) //this.calc_interest(this.balance, calc_days);
        // change this
        if(calc_days >= 30 || (calc_days) % 30 === 0){
            this.balance = this.balance + interest;
            return this.balance;
        }
        else {
            return this.balance;
        }
    }
    // convert js Date object to days;
    convert_date(date) {
        // console.log(Math.floor(date)/1000/60/60/24)
        return Math.floor(date)/1000/60/60/24;
    }
    check_swip_day(date) {
        let post = new Date(date);
        switch(date.getDay()){
            case 6:
                // post.setDate(post.getDate() + 2);
                post.adjust_days(2);
                return post;
                break;
            case 0:
                post.setDate(post.getDate() + 1);
                return post.getDay();
                break;
            default:
                return date;
        }               
    }
    check_swip_time(date){
        let post = new Date(date);
        if(post.getHours() >= 17){
            post.setDate(post.getDate() + .5);   
            return post
        }
        else{
            return date;
        }
    }
    get_trans(){
        return this.card_tranactions;
    }
}

Date.prototype.adjust_days = function(days) {
    this.setDate(this.getDay() + days);
    return this;
}
Date.prototype.adjust_hours = function(hours){
    this.setDate(this.getHours() + hours)
}
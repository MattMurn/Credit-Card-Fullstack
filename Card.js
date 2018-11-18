let date_helper = require('./date_helper');
module.exports = class Card {
    constructor(apr, credit_limit, open_date=new Date(), customer_id=null,){
        this.apr = apr;
        this.credit_limit= credit_limit;
        this.customer_id = customer_id;
        this.open_date = open_date;
        this.balance = 0;
        this.swipe_history = [];
        this.current_interest = [];
    }
    calc_interest(amount, days) {
        return Math.round((((amount * (this.apr/ 365)) * days)) * 100)/100;
    }
    card_swipe(type, amount, date=new Date()) {
        let swipe_approved;
        if(type === 'charge' && (amount + this.balance) < this.credit_limit){
            swipe_approved = true;
            this.balance += amount;
        }
        else if(type === 'payment'){
            this.balance -= amount;
        }
        else{
            swipe_approved = false;
        }
        this.swipe_history.push({
            swipe_id: Math.random(),
            swipe_type: type,
            swipe_timestamp: date,
            post_date: date_helper.check_swipe_post_date(date),
            swipe_amount: amount,
            current_balance: this.balance,
            interest_adjusted: 0,
            swipe_approved: swipe_approved
        });
    }
    get_balance_as_of_date(as_of_date=new Date()) {
        let interest = this.swipe_history.reduce((accumulator, swipe, i)=> {
            let next_swipe_date;
            if(i === this.swipe_history.length-1){
                next_swipe_date = as_of_date;
            }
            else { 
                next_swipe_date = this.swipe_history[i+1].swipe_timestamp;
            }
            let days_between_swipes = date_helper.convert_date(next_swipe_date - swipe.swipe_timestamp);
            swipe.interest_adjusted = this.calc_interest(swipe.current_balance, days_between_swipes);

            return accumulator + swipe.interest_adjusted;
        },0);
        let calc_days = date_helper.convert_date((as_of_date - this.open_date)); 
        if((calc_days) % 30 === 0){
            return this.balance + interest;
        }
        else {
            return this.balance;
        }
    }
    get_swipe_history(){
        return this.swipe_history;
    }
}

// get reduce method working.
// figure out how to adjust pst 30 days.
// get server live w db.
// write simple front end.


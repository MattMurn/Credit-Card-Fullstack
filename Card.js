
module.exports = class Card {
    constructor(apr, limit, customer_id){
        this.apr = apr;
        this.limit= limit;
        this.customer_id = customer_id;
        this.date_created = new Date(2018, 9, 17, 0, 33, 30, 0);
        this.balance = 0;
        this.card_tranactions = [];
        this.current_interest_pending = [];
    }
    calc_interest(amount, days) {
        return Math.round((((amount * (this.apr/ 365)) * days))*100)/100;
    }
    // method that takes new transactions, creates object, pushes to card_transactions
    card_transaction(type, amount, date) {
        let trans_time =  date;//new Date();
        let is_approved;
        if(type === 'charge' && (amount + this.balance) < this.limit){
            is_approved = true;
            this.balance += amount;
            // console.log(this.balance)
        }
        else if(type === 'payment'){
            this.balance -= amount;
            // console.log(this.balance)
        }
        else{
            is_approved = false
            // set tranaction property to declined.
            // don't update 
        }
        // let interest_days = this.evaluate_time(trans_time);
        this.card_tranactions.push({
            trans_id: Math.random(),
            trans_type: type,
            trans_time: trans_time,
            trans_amount: amount,
            current_balance: this.balance,
            interest_adjusted: null,
            is_approved: is_approved

        });
        // if(this.card_tranactions.length){
        //     this.calc_interest(this.card_tranactions[this.card_tranactions.length-1])
        // }
        // this.date_last_transaction = trans_time;
        // add payment & charge functionality
    }
    get_current_balance() {
        // take in transaction history
        this.card_tranactions.map((transaction, i)=> {
            // console.log(transaction)
            let previous_trans_time;
            (i === this.card_tranactions.length-1) ? previous_trans_time = new Date() : 
            previous_trans_time = this.card_tranactions[i+1].trans_time;
            // need to get new dates that are formatted for math in js.
            let days = Math.ceil(this.convert_date(previous_trans_time - transaction.trans_time)) -1;
            console.log(days)
            this.current_interest_pending.push(this.calc_interest(transaction.current_balance, days))
        })
        console.log(this.current_interest_pending.reduce((a,c)=> a + c));
        // this.card_tranactions.reduce((prev, cur)=> {
        //     // get difference between transaction dates and calculate the interest
        //     if(prev === undefined){
        //         // console.log('conditional hit')
        //         this.current_interest_pending.push(this.convert_date(new Date() - this.date_created));    
        //     }
        //     else {
        //         console.log(prev.trans_time);
        //         this.current_interest_pending.push(this.convert_date(cur.trans_time - prev.trans_time));
        //     }
        // }, this.date_created)
        console.log(this.current_interest_pending);
        let calc_days = Math.floor((new Date() - this.date_created)/1000/60/60/24); 
        console.log(calc_days)
        let interest = this.calc_interest(this.balance, calc_days);
        if((calc_days)  % 30 === 0){
            this.balance = this.balance + interest;
            return this.balance;
        }
        else {
            return this.balance;
        }
    }
    // convert js Date object to days;
    convert_date(date) {
        return Math.floor(date)/1000/60/60/24;
    }
    get_trans(){
        return this.card_tranactions;
    }
}



module.exports = class Card {
    constructor(apr, limit){
        this.apr = apr;
        this.limit= limit;
        this.date_created = 'October 16, 2018 23:15:30';
        this.start_accrue = this.date_created + 1;
        // this.date_created.setDate(this.date_created.getDate() + 1);
        this.time_frame = (new Date() - this.start_date)/1000/60/60/24;
        this.date_last_transaction = null;
        this.balance = 0;
        this.card_tranactions = [];
        this.outstanding_interest = []
    }
    calc_interest(amount, days) {
        // console.log(new Date(), transaction.trans_amount);
        // let days = Math.floor(days);

        return Math.round((((amount * (this.apr/ 365)) * days))*100)/100;
    }
    // method that takes new transactions, creates object, pushes to card_transactions
    card_transaction(type, amount) {
        let trans_time = new Date();
        let is_approved;
        if(type === 'charge' && (amount + this.balance) < this.limit){
            is_approved = true;
            this.balance += amount;
        }
        else if(type === 'payment'){
            this.balance -= amount;
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
            interest_adjusted: null,
            is_approved: is_approved

        });
        if(this.card_tranactions.length){
            this.calc_interest(this.card_tranactions[this.card_tranactions.length-1])
        }
        this.date_last_transaction = trans_time;
        // add payment & charge functionality
    }
    get_current_balance() {
        let date = Math.floor(new Date() - this.start_accrue)/1000/60/60/24;
        // console.log(date)
        let interest = this.calc_interest(this.balance, 30)
        if((30)  % 30 === 0){
            this.balance = this.balance + interest;
            return this.balance;
        }
        else {
            return this.balance;
        }
        // return this.balance + interest;
    }
    get_trans(){
        return this.card_tranactions;
    }
    evaluate_time(x){
        let current_date;
        (!this.date_last_transaction) ? current_date = this.date_created :
        current_date = this.date_last_transaction
        
        // let test = ;
        return Math.floor((x - current_date)/1000/60/60/24);
    }
}


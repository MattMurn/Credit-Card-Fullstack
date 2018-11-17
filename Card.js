
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
    calc_interest(transaction){
        let days = Math.floor((new Date() - transaction.trans_time)/1000/60/60/24);
        transaction.interest_adjusted = Math.round((((this.balance * (this.apr/ 365)) * days))*100)/100;
    }
    // check_balance(amount){
    //     (this.balance + amount > this.limit) ? 
    //     this.valid_transaction = false : 
    //     this.valid_transaction = true;
    // }
    card_transaction(type, amount, date){
        let trans_time = date;

        if(type === 'charge'){
            this.balance += amount;
        }
        else if(type === 'payment'){
            this.balance -= amount;
        }
        // let interest_days = this.evaluate_time(trans_time);
        this.card_tranactions.push({
            trans_id: Math.random(),
            trans_type: type,
            trans_time: trans_time,
            trans_amount: amount,
            interest_adjusted: null
        });
        if(this.card_tranactions.length){
            this.calc_interest(this.card_tranactions[this.card_tranactions.length-1])
        }
        this.date_last_transaction = trans_time;
        // add payment & charge functionality
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


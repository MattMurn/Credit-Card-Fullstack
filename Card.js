let date_helper = require('./date_helper');
let mock_db = require('./mock_db');

module.exports = class Card {
    constructor(apr, credit_limit, open_date=new Date(), customer_id=null,){
        this.apr = apr;
        this.credit_limit= credit_limit;
        this.customer_id = customer_id;
        this.open_date = open_date;
        this.transaction_batch = 0;
        this.balance = 0;
        this.transaction_history = [];
    }
    calc_interest(amount, days) {
        return Math.round((((amount * (this.apr/ 365)) * days)) * 100)/100;
    }
    card_transaction(type, amount, date=new Date()) {
        let transaction_approved;
        if(type === 'charge' && (amount + this.balance) < this.credit_limit){
            transaction_approved = true;
            this.balance += amount;
        }
        else if(type === 'payment' && (this.balance - amount) >= 0){
            transaction_approved = true;
            this.balance -= amount;
        }
        else{
            transaction_approved = false;
        }
        this.transaction_history.push({
            transaction_id: Math.random(),
            transaction_type: type,
            transaction_timestamp: date,
            post_date: date_helper.check_transaction_post_date(date),
            transaction_amount: amount,
            current_balance: this.balance,
            interest_accrued: 0,
            transaction_approved: transaction_approved
        });
        console.log(this.transaction_history);
    }
    get_balance_as_of_date(as_of_date=new Date()) {
        // get transaction range - asking date - the first element in array.
        // console.log(this.transaction_history[0])
        let transaction_range = date_helper.convert((as_of_date - this.transaction_history[0].transaction_timestamp)); 
        // range is divisble / greater than 30, call reducer, archive transactions, return balance.
        // if((transaction_range) % 30 === 0 || transaction_range > 30){
            if(transaction_range >= 30 || (transaction_range) % 30 === 0){
            this.balance += this.interest_reducer(as_of_date);
            this.archive_transactions(as_of_date);
            // console.log(this.balance);
            return this.balance;
        }
        else { // or return balance.
            // console.log(this.balance);
            return this.balance;
        }
    }
    interest_reducer(as_of_date=new Date()){
        let interest = this.transaction_history.reduce((accumulator, transaction, i)=> {
            let next_transaction_date;
            if(i === this.transaction_history.length-1){
                next_transaction_date = as_of_date;
            }
            else { 
                next_transaction_date = this.transaction_history[i+1].transaction_timestamp;
            }
            let time_between_transactions = date_helper.convert(next_transaction_date - transaction.transaction_timestamp);
            transaction.interest_accrued = this.calc_interest(transaction.current_balance, time_between_transactions);
            return accumulator + transaction.interest_accrued;
        },0);

        return interest;
    }
    archive_transactions(as_of_date= new Date()){
        this.transaction_history.map((element, i) => {
            mock_db.mock_cards[`${this.transaction_batch}.${i}`] = element;
        })
        this.transaction_history = [{ 
            transaction_id: Math.random(),
            transaction_type: 'archive',
            transaction_timestamp: as_of_date,
            post_date: as_of_date,
            current_balance: this.balance,
            interest_accrued: 0,
            transaction_approved: null
        }] 
        this.month ++;
    }
}
// transaction_id: Math.random(),
// transaction_type: type,
// transaction_timestamp: date,
// post_date: date_helper.check_transaction_post_date(date),
// transaction_amount: amount,
// current_balance: this.balance,
// interest_accrued: 0,
// transaction_approved: transaction_approved
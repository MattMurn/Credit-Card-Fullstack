import { deflateSync } from "zlib";

export const num_convert = num =>{

    let num_arr;
    if(num === null || num === undefined){ return }
    else if( num !== typeof(String)){
        num_arr = num.toString().split('');
    }
    else {
        num_arr = num.split('');
    } 
    let dot = num_arr.indexOf('.');
    let slicer = num_arr.slice(dot);

    switch(true){
        case null:
            return;
        case dot === -1:
            return num_arr.join('').toString() + ".00";
        case slicer.length > 4:
            return Math.round(num_arr.join('')*100)/100;
        case slicer.length === 1:
            return num_arr.join('').toString() + '0';
        default:
            return num_arr.join('');
    }
};

export const date_convert = date => {
    let formatted_date = new Date(date);
    // console.log(date, 'check for conversion comparison')
    return formatted_date.toLocaleString();
};

// write a transaction validation function that can replace 
// conditionals in the send_current_action method.


// let dollar_pattern = /^\$?[0-9]+(\.[0-9][0-9])?$/;
// export const is_valid_amount = input => {
export const transaction_validation = (action, card) => {
    // console.log(parseFloat(action.transaction_timestamp), "///////", parseFloat(card.createdAt));
    let timestamp = new Date(action.transaction_timestamp);
    let createdAt = new Date(card.createdAt);

    // console.log(action.transaction_timestamp > createdAt.getDate());
    console.log(`trans time ${action.transaction_timestamp.getTime()} createdAt ${createdAt.getTime()}`);
    let dollar_pattern = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    let isNumber = dollar_pattern.test(action.transaction_amount);
      if(!isNumber){
        alert('please enter a valid number');
        return false
      }
    if((parseFloat(action.transaction_amount) + parseFloat(card.current_balance)) > parseFloat(card.credit_limit)
    && action.transaction_type === 'charge'){
        alert('this transaction exceeds current balance')
    return false;  
    };
    if(action.transaction_amount > card.current_balance && action.transaction_type === 'payment'){
        alert('this payment is more than your current balance.')
        return false;
    }
    if(action.transaction_timestamp < createdAt){
        alert(`please make a transaction after this crad was created: ${card.createdAt}`);
        return false;
    }   
    else{
        return true;
    }
}

// const date_to_milliseconds = date => {
//     let new_date = new Date(date);
//     return new_date.getMilliseconds();
// }

// console(date_to_milliseconds('2018-12-28T18:57:44.561Z'));
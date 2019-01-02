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
    return formatted_date.toLocaleString();
};
// let dollar_pattern = /^\$?[0-9]+(\.[0-9][0-9])?$/;
// export const is_valid_amount = input => {

    
// }
// export const transaction_error_handler = (current_action, current_card) => {

    
// }

// console.log(dollar_pattern.test('$40.40'))
// console.log(is_valid_amount('$i5.00'));
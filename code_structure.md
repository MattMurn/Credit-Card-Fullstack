    Card: 
         Properties:
            apr - requirement
            credit_limit - requirement
            customer_id - to associate customers w/ cards
            open_date - used a default value of 'new Date()' here & throughout this class to mimic real time,and 
            so that, if a certain date isn't speficied, returned is the current balance.
            transaction_batch - identifier for each transaction_history array sent to mock_db.
            balance - current card balance.
            transaction_history - staging array for recent activity
        Methods:
            calc_interest - takes arguements (amount, days) and returns a interest accrued over that time
            card_transaction - transactions of card takes arguments (type, amount, date) declared transaction_approved 
                to be used in 'type' conditional. 'type' conditional to handle updating balance and if transaction is approved. finally 
                send an object with transaction data to transaction_history to be iterated over to get cumulative interest & update balance.
            get_balance_as_of_date - takes argument (as_of_date),
            set local variable transaction_range equal to the difference of as_of_date & the first transaction date in transaction_history.
            use transaction_range in conditional to determine if range is a multiple of 30, or if more than 30 days has lapsed since the last transaction.
            if either is true - call interest_reducer method.
                interest_reducer - takes argument (as_of_date)
                uses conditional to get time_between_transactions
                use time_between_transactions, and the current balance at the time of transaction as arguments to call the calc_interest method, update the transaction data object, call archive_transactions takes argument (as_of_date) and maps transaction_history array to mock_db. and enters new transaction object with current balance, time, and id, and finally
                return the balance plus the reduced sum of each previous transaction_interest_accrued.
            else return balance
Customer:
    properties:
        id: randomly generated,
        name: ...
        credit_score: ...
        current_cards: object of current card_ids
        closed_cards: array of closed_card objects.
    methods:
        add_new_card: create key value pair new card.
        close_card: pushed closed cards to array.


date_helper:
    added two protoype methods on the Date object -
    adjust_day: when transactions occur on weekends and during non business hours.
        takes # of days and adds them and sets the time 1 millisecond past midnight
    adjust_from_GMT: adjust time from GMT to CST.

    check_transaction_post_date: a conditional to determine when a transaction will be posted
    evaluates the day of the transaction, Friday(5) and after business hours,
        post_date will adjust 3 days forward - Monday(1).
        Saturday(6), adjust 2 days forward - Monday(1).
        Sunday(0), adjust 1 day forward - Monday(1).
        If transaction is made after the close of business 5 pm - CST (represented in Date() object as 17),
        adjust to 1 millisecond past midnight on the following day.
        If no conditionals are triggered, return the original date argument.
    convert_date: when finding the difference using Date object, it returns milliseconds, this function converts 
        into days to calculate interest. Using Math.floor to make sure there is no change unusual interest calculations.
        Math.floor to round down instead of adding 1 to date_created to account for interest starting the day after created.

index.js:
    hacking around with Card / Customer assocations...

mock_db.js
    destination of archive_transactions

other_test_suites.js
    preliminary testing for functionality
    
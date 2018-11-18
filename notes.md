  Strategy was as follows:
lay out all of the requirements
highlight ambiguities & look for problems that could potentially lead to unintended consequences
    - try to make functions / classes as pure / loosely coupled  as possible.
makes as few assumptions about time as possible.
Keep in mind a real world version of this, and try to mimic it w/o bringing contrived test examples.
Decide how to account for interest- 
    At first, I immediately wondered how is the application going to know when to accrue interest daily, and after 30 days.
    keeping a trigger / or set run time seemed like a bad idea, and after more thought, the 30 days isn't entirely relevant because
    ultimately interest is calculated at an annual rate, So deciding it would be more efficient to only calculate interest, when
    either: a transaction occurs(balance changes), or if the time between transactions is equal to or longer than 30 days.
keeping track of transactions / transactions -
    need to hold a few crucial pieces of data. 
    1. transaction_type - to adjust the current balance
    2. transaction_timestamp - to calculate lapse in days between transactions. 
    3. post_date: to adjust if transaction is made on weekend or non business hours( used 5 pm).
    4. current_balance: to mark & use for calculating interest
    5. interest_accrued: used in reducer method to sum interest.

write out basic structure - class descriptions w/ properties and methods.
write tests for methods, that will ultimately be used when testing for providing total outstanding balance. 
Get Test Scenario 1 working passing in number, 
Get Test Scenario 2 working passing in number,
incorporate Date() object for more dynamic testing.
DON'T FORGET ABOUT WHEN INTEREST STARTS ACCRUING.
Optimize.


Banking End of Day processing -
If you visit Bank XYZ after 5:00 p.m. Monday through Friday, your transaction will go through processing on the next business day. If you visit Bank XYZ after 5:00 p.m. Friday or anytime Saturday or Sunday, your transaction will go through Monday night's processing (as Monday is the next business day)



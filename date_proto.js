
module.exports = 
        Date.prototype.adjust_days = function(days) {
        this.setDate(this.getDay() + 1);
        return this
    }

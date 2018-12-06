module.exports = class Customer {
    constructor(name, credit_score=null) {
        this.id = Math.random();
        this.name = name;
        this.credit_score = credit_score;
        this.current_cards = {};
        this.closed_cards = [];
    }
    add_new_card(card) {
        this.current_cards[card.id] = card;
    }
    close_card(card) {
        this.close_card.push(card);
    }
}


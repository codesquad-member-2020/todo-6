import Foundation

struct CardViewModel {
    private let card: Card

    private var authorName: String {
        "author by \(card.author.name)"
    }

    init(card: Card) {
        self.card = card
    }
}

extension CardViewModel {
    func configure(_ view: CardCell) {
        view.titleLabel.text = card.title
        view.bodyLabel.text = card.body
        view.authorLabel.text = authorName
    }
}

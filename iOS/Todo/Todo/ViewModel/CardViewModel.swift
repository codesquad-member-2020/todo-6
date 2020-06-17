import UIKit

struct CardViewModel {
    private let card: Card

    private var authorName: String {
        "author by \(card.author.name)"
    }

    init(card: Card) {
        self.card = card
    }
}

extension CardViewModel: ViewModel {
    func configure(_ view: UIView) {
        guard let cell = view as? CardCell else {
            debugPrint("\(CardCell.self)로 형변환 실패: \(view)", #function)
            return
        }

        cell.titleLabel.text = card.title
        cell.bodyLabel.text = card.body
        cell.authorLabel.text = authorName
    }
}

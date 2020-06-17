import Foundation

struct Card {
    var title: String
    var body: String
    var author: User
}

struct User {
    let name: String
    let identifier: Int = 99
}

struct Column {
    var title: String
    var cards: [Card] = .init()

    var cardsCount: Int {
        cards.count
    }
}

struct Board {
    var columns: KeyValuePairs<Int, Column>
}

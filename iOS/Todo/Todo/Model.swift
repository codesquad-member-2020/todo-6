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
    var items: [Card] = .init()
    var title: String
}

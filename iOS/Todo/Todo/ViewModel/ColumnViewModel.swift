import UIKit

struct ColumnViewModel {
    private var column: Column

    private var badgeText: String {
        String(column.cardsCount)
    }

    init(column: Column) {
        self.column = column
    }
}

extension ColumnViewModel: ViewModel {
    func configure(_ view: UIView) {
        guard let view = view as? ColumnView else {
            debugPrint("\(ColumnView.self)로 형변환 실패", #function)
            return
        }

        view.titleLabel.text = column.title
        view.badgeLabel.text = badgeText
    }
}

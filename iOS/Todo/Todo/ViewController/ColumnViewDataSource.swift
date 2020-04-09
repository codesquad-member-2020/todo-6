import UIKit

class ColumnViewDataSource: NSObject, UITableViewDataSource {
    private var column: Column

    init(column: Column) {
        self.column = column
        super.init()
    }

    // MARK: TableView DataSource

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.column.cardsCount
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CardCell", for: indexPath)

        let card = column.cards[indexPath.row]
        let viewModel = CardViewModel(card: card)
        viewModel.configure(cell)

        return cell
    }

}

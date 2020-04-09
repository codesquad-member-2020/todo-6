import UIKit

class ColumnViewController: UIViewController {

    // MARK: Properties

    var id: Int?

    @IBOutlet weak var tableView: UITableView!
    var tableViewDataSource: UITableViewDataSource?

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        let user = User(name: "iOS")
        let todoCard = Card(title: "Hello Todo", body: "Let's Swift", author: user)
        let inProgressCard = Card(title: "Hello Doing", body: "Let's Swift", author: user)
        let doneCard = Card(title: "Hello Done", body: "Let's Swift", author: user)

        let cards = [todoCard, inProgressCard, doneCard]
        let column = Column(cards: cards, title: "Todo")

        self.tableViewDataSource = ColumnViewDataSource(column: column)
        self.tableView.dataSource = tableViewDataSource
    }

}


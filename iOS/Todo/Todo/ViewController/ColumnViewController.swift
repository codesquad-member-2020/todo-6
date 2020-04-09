import UIKit

class ColumnViewController: UIViewController {

    // MARK: Properties

    var id: Int?

    @IBOutlet weak var tableView: UITableView!
    var tableViewDataSource: UITableViewDataSource?

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        self.tableViewDataSource = ColumnViewDataSource()
        self.tableView.dataSource = tableViewDataSource
    }

}


import UIKit

class ColumnViewController: UIViewController {

    // MARK: Properties

    @IBOutlet var columnView: ColumnView!
    var column: Column?

    @IBOutlet weak var tableView: UITableView!
    var tableViewDataSource: UITableViewDataSource?

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        if let column = column {
            self.tableViewDataSource = ColumnViewDataSource(column: column)
            self.tableView.dataSource = tableViewDataSource

            let columnViewModel = ColumnViewModel(column: column)
            columnViewModel.configure(columnView)
        }
    }

}


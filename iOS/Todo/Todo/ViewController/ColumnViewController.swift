//

import UIKit

class ColumnViewController: UIViewController {

    // MARK: Properties

    var id: Int?

    @IBOutlet weak var tableView: UITableView!

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        self.tableView.dataSource = self
    }

    // MARK: IBAction

    @IBAction func buttonTouched(_ sender: UIButton) {
        debugPrint(sender)
    }

}

// MARK: TableViewDataSource

extension ColumnViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = self.tableView.dequeueReusableCell(withIdentifier: "CardCell", for: indexPath) as! CardCell

        // MARK: 모델 생성해서 cell 뷰에 전달
        let user = User(name: "iOS")
        let todoCard = Card(title: "Hello Todo", body: "Let's Swift", author: user)
        let inProgressCard = Card(title: "Hello Doing", body: "Let's Swift", author: user)
        let doneCard = Card(title: "Hello Done", body: "Let's Swift", author: user)

        cell.updateLabels(title: todoCard.title, body: todoCard.body, authorName: todoCard.author.name)

        return cell
    }

}

import UIKit

class MainViewController: UIViewController {

    // MARK: Properties

    private let mainStoryboardName = "Main"
    private let columnVCIdentifier = "ColumnViewController"

    @IBOutlet weak var stackView: UIStackView!

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        let board = makeBoard()
        board.columns.forEach { self.addColumnViewController(with: $1) }
    }

    // MARK: Custom Methods

    private func addColumnViewController(with column: Column) {
        let storyboard = UIStoryboard(name: mainStoryboardName, bundle: nil)
        guard let newViewController = storyboard.instantiateViewController(withIdentifier: columnVCIdentifier) as? ColumnViewController else { return }

        // TODO: 데이터 전달
        newViewController.column = column

        self.addChild(newViewController)
        self.stackView.addArrangedSubview(newViewController.view)

        newViewController.didMove(toParent: self)
    }

    // MARK: 테스트 데이터
    private func makeBoard() -> Board {
        let user = User(name: "iOS")

        let todoCard = Card(title: "Hello Todo", body: "Let's Swift", author: user)
        let todoCard2 = Card(title: "Hello Todo", body: "Let's Swift", author: user)
        let inProgressCard = Card(title: "Hello Doing", body: "Let's Swift", author: user)
        let doneCard = Card(title: "Hello Done", body: "Let's Swift", author: user)

        let todoColumn = Column(title: "Todo", cards: [todoCard, todoCard2])
        let inProgressColumn = Column(title: "InProgress", cards: [inProgressCard])
        let doneColumn = Column(title: "Done", cards: [doneCard])

        let board = Board(columns: [1: todoColumn, 2: inProgressColumn, 3: doneColumn])

        return board
    }

}

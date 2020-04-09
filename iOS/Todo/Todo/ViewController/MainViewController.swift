//

import UIKit

class MainViewController: UIViewController {

    // MARK: Properties

    private let mainStoryboardName = "Main"
    private let columnVCIdentifier = "ColumnViewController"

    @IBOutlet weak var stackView: UIStackView!

    // MARK: ViewLifeCycle

    override func viewDidLoad() {
        super.viewDidLoad()

        for index in (1...3) { self.addColumnViewController(with: index) }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        debugPrint(segue)
    }

    // MARK: IBAction

    @IBAction func barRightButtonClicked(_ sender: UIBarButtonItem) {
        debugPrint(sender)
    }

    // MARK: Custom Methods

    private func addColumnViewController(with index: Int) {
        let storyboard = UIStoryboard(name: mainStoryboardName, bundle: nil)
        guard let newViewController = storyboard.instantiateViewController(withIdentifier: columnVCIdentifier) as? ColumnViewController else { return }

        // 데이터 전달
        newViewController.id = index

        self.addChild(newViewController)
        self.stackView.addArrangedSubview(newViewController.view)

        newViewController.didMove(toParent: self)
    }

}

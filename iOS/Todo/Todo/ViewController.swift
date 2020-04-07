//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func buttonTouched(_ sender: UIButton) {
        debugPrint(sender)
    }

    @IBAction func topButtonClicked(_ sender: UIBarButtonItem) {
        debugPrint(sender)
    }


}


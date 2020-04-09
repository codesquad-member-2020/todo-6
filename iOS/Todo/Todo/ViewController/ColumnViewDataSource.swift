import UIKit

class ColumnViewDataSource: NSObject, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CardCell", for: indexPath) as! CardCell

        // MARK: 모델 생성해서 cell 뷰에 전달
        let user = User(name: "iOS")
        let todoCard = Card(title: "Hello Todo", body: "Let's Swift", author: user)
        //        let inProgressCard = Card(title: "Hello Doing", body: "Let's Swift", author: user)
        //        let doneCard = Card(title: "Hello Done", body: "Let's Swift", author: user)

        let viewModel = CardViewModel(card: todoCard)
        viewModel.configure(cell)

        return cell
    }

}

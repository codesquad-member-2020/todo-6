import UIKit

class CardCell: UITableViewCell {
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var bodyLabel: UILabel!
    @IBOutlet weak var authorLabel: UILabel!

    // MARK: 기본 생성된 매서드

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    // MARK: 데이터 업데이트
    func updateLabels(title: String, body: String, authorName: String) {
        self.titleLabel.text = title
        self.bodyLabel.text = body
        self.authorLabel.text = authorName
    }

}

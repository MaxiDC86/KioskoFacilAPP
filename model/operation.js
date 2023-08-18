export class Operation {
  constructor(title, price, barCode, imageUri, qty, operationNumber, id) {
    this.title = title;
    this.price = price;
    this.barCode = barCode;
    this.imageUri = imageUri;
    this.qty = qty;
    this.operationNumber = operationNumber;
    this.id = id;
  }
}

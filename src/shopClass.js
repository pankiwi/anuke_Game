class shopClass {
  items = [];
  itemsInShop = [];
  constructor(idContainerItems, idcloseBtn, amountItems, events = { setShop: function(shop) {}, failBuy: function(item_) {}, sell: function(item_) {}, closeShop: function() {} }) {
    this.idContainerItems = idContainerItems;
    this.amountItems = amountItems;
    this.events = events;
    document.getElementById(idcloseBtn).addEventListener('click', (event) => {
      this.clearShop();
      this.events.closeShop();
    })
  };
  addItem(key, Item = { name: "a", description: "a", imgPath: null, price: 100, buy: function() {} }) {
    let object = {id: Item.name, isBuy: false };
    Object.assign(object, Item);
    while(object.id.search(" ") != -1){
    object.id = object.id.replace(" ", "_");
    };
   
    this.items.push(object);
    
  };
  setBuyBtn(id_, item) {
    document.getElementById(id_).addEventListener('click', (event) => {
      if (item.price === 0 && !event.target.classList.contains('shop-item-button-sell')) {
        item.buy();
        item.isBuy = true;
        event.target.classList.add('shop-item-button-sell');
        this.events.sell(item);
      } else if (global.coinsAnuke - item.price >= 0 && !item.isBuy && !event.target.classList.contains('shop-item-button-sell')) {
        global.coinsAnuke = global.coinsAnuke - item.price;
        item.buy();
        item.isBuy = true;
        event.target.classList.add('shop-item-button-sell');
        this.events.sell(item);
      } else if (!event.target.classList.contains('shop-item-button-sell')) {
        this.events.failBuy(item);
      }

    })
  };
  createItem(item, index) {
    const ct = document.getElementById(this.idContainerItems);
    const item_ = document.createElement('div');
    item_.classList.add('shop-item');
    item_.innerHTML = `
    <h3 class="shop-item-title"> ${item.name} </h3>
    ${item.imgPath != null && item.imgPath ? `<img class="shop-item-img" src="${item.imgPath}" alt=""/>`: `` }
    <p>${item.description}</p>
    <div class="shop-item-buyPrice">
      <img src="./assets/sprites/coin.png" alt="" /> <span>${item.price === 0 ? "free" : item.price}</span>
      <button class="shop-item-button" id="${"buyBtn-" + index}">buy</button> </div>
    </div>
    `
    ct.appendChild(item_);


  };
  updateListItems(){
    for(let i in this.items){
      for(let g in this.itemsInShop){
        if(this.items[i].id === this.itemsInShop[g].id) this.items[i].id = this.itemsInShop[g].id;
      }
    }
  };
  clearShop() {
    const ct = document.getElementById(this.idContainerItems);

    while (ct.firstChild) {
      ct.removeChild(ct.firstChild)
    }
  };
  clearItems() {
    this.items = this.items.filter(object => !object.isBuy);
    this.itemsInShop = this.itemsInShop.filter(object => !object.isBuy);
  };
  updateShop() {
    let amount = this.items.length < this.amountItems ? this.items.length : this.amountItems;
    let amountItemsInShop = this.itemsInShop.length;
    let lastItem = null;

    if (amount - amountItemsInShop != 0) {
      for (var g = 0; g < amount; g++) {
        if (this.itemsInShop.length >= this.amountItems) break;

        let item = this.items[Math.floor(Math.random() * this.items.length)];

        for (var i = 0; i < amountItemsInShop; i++) {
          while (item === this.itemsInShop[i]) {
            item = this.items[Math.floor(Math.random() * this.items.length)];
          }
        }

        while (item === lastItem) {
          item = this.items[Math.floor(Math.random() * this.items.length)];
        };
        lastItem = item;
        this.itemsInShop.push(item);
      }
    }
  }
  setUpItems() {
    this.events.setShop(this);
    this.clearItems();
    this.clearShop();
    if ((this.itemsInShop.length >= 0 && this.itemsInShop.length <= this.amountItems) && (this.items.length > 0)) this.updateShop();
    for (var i in this.itemsInShop) {
      
      this.createItem(this.itemsInShop[i], i);
      this.setBuyBtn("buyBtn-" + i, this.itemsInShop[i]);
    }
    if(this.items.length === 0){
      const ct = document.getElementById(this.idContainerItems);
      const h = document.createElement('h3');
      h.innerHTML = "emty"
      ct.appendChild(h)
    }
  } 
}
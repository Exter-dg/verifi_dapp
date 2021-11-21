pragma solidity ^0.5.0;

contract Verifi {
    
    // will store manufacturer's address (owner of the smart contract)
    address manufacturerAddr;
    
    // A common struct for all middlemen in the supply chain
    struct retailer {
        string name;
    }
    
    // To store product details
    struct product {
        uint id;
        bool toBeTransfered;
    }
    
    struct transferProduct {
        address buyerAddr;
        address sellerAddr;
    }
    
    // maps product key with owner's address
    mapping(uint => address) productOwner;
    mapping(address => retailer) retailers;
    mapping(uint => product) products;
    mapping(uint => transferProduct) transferProducts;
    
    constructor() public {
        manufacturerAddr = msg.sender;
    }
    
    function addNewRetailer(address _retailerAddr, string memory _name) public {
        if(msg.sender != manufacturerAddr) return;
        
        // TODO Check if retailer already exists
        retailer memory newRetailer;
        newRetailer.name = _name;
        retailers[_retailerAddr] = newRetailer;
    }
    
    function createProduct(uint  _id) public {
        if(msg.sender != manufacturerAddr) return;
        
        product memory newProduct;
        newProduct.id = _id;
        newProduct.toBeTransfered = false;
        products[_id] = newProduct;
        productOwner[_id] = manufacturerAddr;
            
    }
    
    function transferOwnership(uint _productId, address _buyerAddr ) public {
        // TODO Check if product, seller, buyer exists
        
        // Verify if owner is _sellerAddr
        // msg.sender is sellerAddr
        if(msg.sender != productOwner[_productId]) return;
        
        // check if product is not sold already
        if(products[_productId].toBeTransfered != false) return;
        
        products[_productId].toBeTransfered = true;
        
        transferProduct memory newTransferProduct;
        newTransferProduct.sellerAddr = msg.sender;
        newTransferProduct.buyerAddr = _buyerAddr;
        transferProducts[_productId] = newTransferProduct;
        delete productOwner[_productId];
    }
    
    function acceptOwnership(uint _productId) public {
        // TODO product is ready for transfer
        
        // Verify that msg.sender is buyer
        if(msg.sender != transferProducts[_productId].buyerAddr) return;
        
        productOwner[_productId] = msg.sender;
        products[_productId].toBeTransfered = false;
        delete transferProducts[_productId];
    }
    
    
    // Check https://stackoverflow.com/questions/65500489/warning-function-state-mutability-can-be-restricted-to-pure-function
    function findOwner(uint _productId) public returns(address) {
        return productOwner[_productId];
    }
}

/*
TODO 
- Make functions Payable 
- Learn Events and add where necessary
- Use Require and assert

Links
- https://stackoverflow.com/questions/53460851/typeerror-data-location-must-be-memory-for-parameter-in-function-but-none-wa
- https://www.tutorialspoint.com/solidity/solidity_events.htm
- https://medium.com/coinmonks/build-a-smart-contract-to-sell-goods-6cf73609d25
- https://docs.soliditylang.org/en/develop/types.html#delete

*/

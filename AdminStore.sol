pragma solidity 0.8.0;


contract AdminStore{
    uint private qtyStores;
    
    constructor(){
        qtyStores = 1;
    }
    
    struct Store{
        uint id;
        address owner;
        string name;
        uint promotionsQty;
    }
    
    struct Promotion{
        uint id;
        uint idStore;
        string name;
    }
    
    mapping(uint => Store) stores;
    mapping(uint => mapping(uint => Promotion)) promotions;
    mapping(address => mapping(uint => Store)) storesByOwner;
    
    function CreateStore(string memory _name) public {
        Store memory localStore =  Store(qtyStores, msg.sender, _name, 0);
        stores[qtyStores] = localStore;
        storesByOwner[msg.sender][qtyStores] = localStore;
        qtyStores++;
    }

    function GetInfoStore(uint _id) public view returns(Store memory store){
        return stores[_id];
    }
    
    function GetStoreByOwner(address _owner, uint256 _idStore) internal view returns(Store memory store){
        return storesByOwner[_owner][_idStore];
    }
        
    
}

pragma solidity 0.5.12;

contract BuyHouse {
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function sendCoin(address payable receiver, uint amount) public payable returns(bool sufficient) {
        receiver.transfer(amount);
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }
}

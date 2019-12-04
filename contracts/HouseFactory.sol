pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

contract HouseFactory {
    struct User {
        string name;
        address publicAddress;
        bool flag;
    }

    struct House {
        uint id;
        uint price;
        string country;
        string disponibility;
        string postalAddress;
        uint nbRoom;
        uint nbPiece;
        uint size;
        User owner;
    }

    struct RawHouse {
        uint price;
        string country;
        string disponibility;
        string postalAddress;
        uint nbRoom;
        uint nbPiece;
        uint size;
    }

    event NewHouse(House house);
    event NewUser(User user);
    event ChangeOwner(House house);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    User[] Users;
    House[] Houses;
    uint public houseLength = 0;
    mapping(address => User) public userIdToUser;
    mapping(address => House[]) userIdToHouse;


    function createHouse(RawHouse memory rawHouse) public payable {
        House memory newHouse = House(houseLength,
            rawHouse.price,
            rawHouse.country,
            rawHouse.disponibility,
            rawHouse.postalAddress,
            rawHouse.nbRoom,
            rawHouse.nbPiece,
            rawHouse.size,
            userIdToUser[msg.sender]);
        houseLength = Houses.push(newHouse);
        userIdToHouse[msg.sender].push(newHouse);
        emit NewHouse(newHouse);
    }

    function createUser(string memory name) payable public {
        User memory user = User(name, msg.sender, true);
        uint id = Users.push(user) - 1;
        userIdToUser[msg.sender] = Users[id];
        emit NewUser(user);
    }

    function getAllUser() public view returns (User[] memory) {
        return Users;
    }

    function getUserByAddress(address userAddress) public view returns (User memory) {
        User memory user = userIdToUser[userAddress];
        return user;
    }

    function getHousesByUser() public view returns (House[] memory) {
        return userIdToHouse[msg.sender];
    }

    function getHouse(uint houseId) public view returns (House memory) {
        House memory _house;
        for(uint i = 0; i < Houses.length; i++) {
            if (Houses[i].id == houseId) {
                return _house = Houses[i];
            }
        }
        return _house;
    }

    function getAllHouses() public view returns (House[] memory) {
        return Houses;
    }

    function setHouseOwner(uint _houseId, address payable receiver) payable public {
        uint houseId = getHouseId(_houseId);

        Houses[houseId].owner = userIdToUser[msg.sender];
        emit ChangeOwner(Houses[houseId]);

        receiver.transfer(msg.value);
        emit Transfer(msg.sender, receiver, msg.value);
    }
}

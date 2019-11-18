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
        string postalAddress;
        uint size;
        User owner;
    }

    event NewHouse(uint houseId, uint price, string postalAddress, uint size);
    event NewUser(User user);
    event ChangeOwner(House house);

    User[] Users;
    House[] Houses;
    mapping(address => User) public userIdToUser;
    mapping(address => House[]) userIdToHouse;


    function createHouse(uint price, string memory postalAddress, uint size) public payable {
        uint id = uint(keccak256(abi.encodePacked(msg.sender)));
        House memory newHouse = House(id, price, postalAddress, size, userIdToUser[msg.sender]);
        Houses.push(newHouse);
        userIdToHouse[msg.sender].push(newHouse);
        emit NewHouse(id, price, postalAddress, size);
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

    function setHouseOwner(uint _houseId) public {
        uint houseId = getHouseId(_houseId);
        User memory user = userIdToUser[msg.sender];
        House memory house = Houses[houseId];
        house.owner = user;
        Houses[houseId] = house;
        emit ChangeOwner(house);
    }

    function getHouseId(uint houseId) public view returns (uint) {
        uint id;
        for(uint i = 0; i < Houses.length; i++) {
            if (Houses[i].id == houseId) {
                return id = i;
            }
        }
        return id;
    }
}

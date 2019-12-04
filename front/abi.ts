const abi: any = [
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "publicAddress",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "flag",
								"type": "bool"
							}
						],
						"internalType": "struct HouseFactory.User",
						"name": "owner",
						"type": "tuple"
					}
				],
				"indexed": false,
				"internalType": "struct HouseFactory.House",
				"name": "house",
				"type": "tuple"
			}
		],
		"name": "ChangeOwner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "publicAddress",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "flag",
								"type": "bool"
							}
						],
						"internalType": "struct HouseFactory.User",
						"name": "owner",
						"type": "tuple"
					}
				],
				"indexed": false,
				"internalType": "struct HouseFactory.House",
				"name": "house",
				"type": "tuple"
			}
		],
		"name": "NewHouse",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publicAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "flag",
						"type": "bool"
					}
				],
				"indexed": false,
				"internalType": "struct HouseFactory.User",
				"name": "user",
				"type": "tuple"
			}
		],
		"name": "NewUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "houseLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userIdToUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "publicAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "flag",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					}
				],
				"internalType": "struct HouseFactory.RawHouse",
				"name": "rawHouse",
				"type": "tuple"
			}
		],
		"name": "createHouse",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publicAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "flag",
						"type": "bool"
					}
				],
				"internalType": "struct HouseFactory.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publicAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "flag",
						"type": "bool"
					}
				],
				"internalType": "struct HouseFactory.User",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHousesByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "publicAddress",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "flag",
								"type": "bool"
							}
						],
						"internalType": "struct HouseFactory.User",
						"name": "owner",
						"type": "tuple"
					}
				],
				"internalType": "struct HouseFactory.House[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			}
		],
		"name": "getHouse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "publicAddress",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "flag",
								"type": "bool"
							}
						],
						"internalType": "struct HouseFactory.User",
						"name": "owner",
						"type": "tuple"
					}
				],
				"internalType": "struct HouseFactory.House",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllHouses",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "disponibility",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nbRoom",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "nbPiece",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "size",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "publicAddress",
								"type": "address"
							},
							{
								"internalType": "bool",
								"name": "flag",
								"type": "bool"
							}
						],
						"internalType": "struct HouseFactory.User",
						"name": "owner",
						"type": "tuple"
					}
				],
				"internalType": "struct HouseFactory.House[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "setHouseOwner",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "houseId",
				"type": "uint256"
			}
		],
		"name": "getHouseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default abi

const HouseFactory = artifacts.require("HouseFactory")
const truffleAssert = require("truffle-assertions")

contract("BuyHouse", () => {
	let houseFactoryInstance, houseId, createHouse, user

	before(async () => {
		houseFactoryInstance = await HouseFactory.deployed()
		await houseFactoryInstance.createUser("Ruben")
		createHouse = await houseFactoryInstance.createHouse({nbPiece: 2, nbRoom: 3, country: "France", disponibility: "28/09/2019", price: 55, postalAddress: "14 avenue Louis Pasteur", size: 62})

		truffleAssert.eventEmitted(createHouse, "NewHouse", async (ev) => {
			console.log('ev0', ev)
			console.log('ev1', ev[0])
			console.log('ev2', ev[0].id)
			if (ev[0].id < 0) return false
			user = ev[0].owner.publicAddress
			houseId = ev[0].id
			return true
		})
	})

	it("Should create one house and emit an 'NewHouse' event", async () => {
		const createHouse = await houseFactoryInstance.createHouse({nbPiece: 2, nbRoom: 3, country: "France", disponibility: "28/09/2019", price: 55, postalAddress: "18 Rue Montparnasse", size: 62})

		truffleAssert.eventEmitted(createHouse, "NewHouse", (ev) => {
			console.log('ev', ev)
			return ev[0].postalAddress === "18 Rue Montparnasse"
		})
	})

	it("Should return one house created by user", async () => {
		const houses = await houseFactoryInstance.getHousesByUser.call()
		assert.equal(
			houses.length,
			2,
			"House is not found"
		)
	})


	it("Should return a house by ID", async () => {
			const house = await houseFactoryInstance.getHouse.call(houseId)
			assert.equal(
				house.id,
				houseId,
				"houseIds dont match"
			)
		}
	)

	it("Should update an owner house", async () => {
			const house = await houseFactoryInstance.setHouseOwner(houseId, user)
			let originalName, updatedName, updatedAdress
			const username = 'Bartooooooh'

			truffleAssert.eventEmitted(house, "ChangeOwner", (ev) => {
				originalName = ev[0].owner.name
				return true
			})

			const newUser = await houseFactoryInstance.createUser(username)

			truffleAssert.eventEmitted(newUser, "NewUser", (ev) => {
				if (ev.user.name === username && ev.user.flag === true) {
					updatedAdress = ev.user.publicAddress
					return true
				}
			})

			const house2 = await houseFactoryInstance.setHouseOwner(houseId, updatedAdress)

			truffleAssert.eventEmitted(house2, "ChangeOwner", (ev) => {
				updatedName = ev[0].owner.name
				return true
			})

			assert.notEqual(
				originalName,
				updatedName,
				'names should not be the same'
			)
		}
	)
})

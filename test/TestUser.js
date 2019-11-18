const HouseFactory = artifacts.require("HouseFactory")
const truffleAssert = require("truffle-assertions")

contract("Test Users", (account) => {

	console.log('account', account)
	contract("Create User", () => {
		it('Should create a user and emit', async () => {
			const houseFactoryInstance = await HouseFactory.deployed()
			const createUser = await houseFactoryInstance.createUser("Ruben")

			truffleAssert.eventEmitted(createUser, "NewUser", (ev) => {
				return ev.user.name === "Ruben" && ev.user.flag === true
			})
		})
	})

	contract("Get User", () => {
		const USERNAME = 'Toto'
		let userAddress

		before(async () => {
			const houseFactoryInstance = await HouseFactory.deployed()
			const createUser = await houseFactoryInstance.createUser(USERNAME)

			truffleAssert.eventEmitted(createUser, "NewUser", (ev) => {
				if (ev.user.name === USERNAME && ev.user.flag === true) {
					userAddress = ev.user.publicAddress
					return true
				}
			})
		})

		it('Should retrieve on user By Address', async () => {
			const houseFactoryInstance = await HouseFactory.deployed()
			const user = await houseFactoryInstance.getUserByAddress(userAddress)

			console.log('user', user)
			assert.equal(user.name, USERNAME)
		})
	})

})

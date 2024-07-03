const express = require("express");

const {
	handleGetAllUsers,
	handleGetUserById,
	handleUpdateGetUserById,
	handleDeleteUserById,
	handleCreateUser,
} = require("../controllers/user");

const router = express.Router();




// Routes -> if middleware is not there to send the request next then it will not go to the route
// router.get("/users", async (req, res) => {
// 	// const html = `
// 	// <ul>
// 	//     ${users
// 	// 		.map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
// 	// 		.join("")}
// 	// </ul>
// 	// `;

// 	const allDbUsers = await User.find({});
// 	const html = `
//     <ul>
//         ${allDbUsers
// 			.map((User) => `<li>${User.first_name} - ${User.email}</li>`)
// 			.join("")}
//     </ul>
//     `;

// 	res.send(html);
// });

router.route("/")
	.get(handleGetAllUsers)
	.post(handleCreateUser);

router.route("/:id")
	.get(handleGetUserById)
	.patch(handleUpdateGetUserById)
	.delete(handleDeleteUserById);





module.exports = router;
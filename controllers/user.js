const User = require("../models/User");

async function handleGetAllUsers(req, res) {
    
	const allDbUsers = await User.find({});

	//res.setHeader("X-myName", req.myname); //custom headers
	// Always add X to custum header
	return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
	// const id = Number(req.params.id);
	// const user = users.find((user) => user.id == id);
	const user = await User.findById(req.params.id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	return res.json(user);
}


async function handleUpdateGetUserById(req, res) {
	// const id = Number(req.params.id);
	// const user = users.find((user) => user.id === id);

	// if (!user) {
	// 	return res.status(404).json({ message: "User not found" });
	// }

	// const updatedUser = { ...user, ...req.body };
	// const index = users.indexOf(user);
	// users[index] = updatedUser;

	// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
	// 	if (err) {
	// 		return res
	// 			.status(500)
	// 			.json({ status: "error", message: "Failed to write file" });
	// 	}

	// 	return res.json({ status: "success", user: updatedUser });
	// });

	await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
	return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
	// const id = Number(req.params.id);
	// const user = users.find((user) => user.id === id);

	// if (!user) {
	// 	return res.status(404).json({ message: "User not found" });
	// }

	// const index = users.indexOf(user);
	// users.splice(index, 1);

	// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
	// 	if (err) {
	// 		return res
	// 			.status(500)
	// 			.json({ status: "error", message: "Failed to write file" });
	// 	}

	// 	return res.json({ status: "success" });
	// });
	await User.findByIdAndDelete(req.params.id);
	return res.status(200).json({ status: "success" });
}


async function handleCreateUser(req, res) {
	// todo: create new user
	const body = req.body;
	if (
		!body ||
		!body.first_name ||
		!body.last_name ||
		!body.email ||
		!body.gender ||
		!body.job_title
	) {
		return res.status(400).json({ message: "All fields required" });
	}
	// console.log("Body", body);
	// users.push({ ...body, id: users.length + 1 });
	// fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
	// 	return res.status(201).json({ status: "success" });
	// });
	// return res.json(body);
	//return res.json({ status: "pending" });

	const result = await User.create({
		first_name: body.first_name,
		last_name: body.last_name,
		email: body.email,
		gender: body.gender,
		job_title: body.job_title,
	});
	console.log("result", result);
	return res.status(201).json({ msg: "success" , id: result._id });
}





module.exports = {
	handleGetAllUsers,
	handleGetUserById,
	handleUpdateGetUserById,
	handleDeleteUserById,
	handleCreateUser,
};
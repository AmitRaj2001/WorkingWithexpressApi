const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const app = express();
const port = 3000;


//middleware - Plugin
app.use(express.urlencoded({ extended: false }));


app.get("/users", (req, res) => {
	const html = `
    <ul>
        ${users
			.map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
			.join("")}
    </ul>
    `;

	res.send(html);
});

app.get('/api/users', (req, res) => { 
    return res.json(users) ;
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
	
});


app.post("/api/users", (req, res) => {
    // todo: create new user
    const body = req.body;
    console.log("Body",body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => { 
        return res.json({ status: "success" });
    })
    // return res.json(body);
    //return res.json({ status: "pending" });
});


app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = { ...user, ...req.body };
    const index = users.indexOf(user);
    users[index] = updatedUser;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Failed to write file" });
        }

        return res.json({ status: "success", user: updatedUser });
    });
});


app.delete("/api/users/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((user) => user.id === id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const index = users.indexOf(user);
	users.splice(index, 1);

	fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
		if (err) {
			return res
				.status(500)
				.json({ status: "error", message: "Failed to write file" });
		}

		return res.json({ status: "success" });
	});
});



//we can do like this also if we have same route because if we want to change the route we dont neet to change it multiple places
// app
//     .route("/api/users/:id")
//     .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id == id);
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }
//         return res.json(user);
//     })
//     .patch((req, res) => { 
//         // edit user with id
//         return request.json({status: "pending"});
//      })
//     .delete((req, res) => { 
//         // delete user with id
//         return request.json({status: "pending"});
//     });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
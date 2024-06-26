const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();
const port = 3000;


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
    return res.json({ status: "pending" });
});


app.patch("/api/users/:id", (req, res) => {
	// todo: edit the users with id
	return res.json({ status: "pending" });
});

app.delete("/api/users/:id", (req, res) => {
	// todo: edit the users with id
	return res.json({ status: "pending" });
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
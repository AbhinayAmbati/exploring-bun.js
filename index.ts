import figlet from "figlet";
import index from './index.html'
import {SQL} from "bun"

const mysql = new SQL("mysql://root:abhinay@28aa@localhost:3306/student");
const mysqlResults = await mysql`
  SELECT * FROM student;
`;

const server = Bun.serve({
	port: 3000,
	routes: {
		"/": index,
        "/figlet" : () => {
            const body = figlet.textSync('Bun!');
            return new Response(body);
        },
        "/user": () => {
            const user = { name: "Abhinay" };
            return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
            });
        },
        "/userdata": () => {
            return new Response(JSON.stringify(mysqlResults),{
                headers: {"Content-Type": "application/json"},
            });
        }
	}
});

console.log(`Listening on ${server.url}`);
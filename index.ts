import figlet from "figlet";
import index from './index.html'

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
        }
	}
});

console.log(`Listening on ${server.url}`);
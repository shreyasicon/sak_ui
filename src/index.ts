import { serve } from "bun";
import index from "./index.html";
import hero3d from "./hero-3d.html";

const ASSETS = ["balaji.png", "sai_shreyas.png", "tejas.png", "final_logo.png", "final_logo_full_name.png"];

const server = serve({
  routes: {
    "/hero-3d": hero3d,

    // Static assets
    ...Object.fromEntries(ASSETS.map(f => [`/${f}`, new Response(Bun.file(`dev-asset/${f}`))])),

    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

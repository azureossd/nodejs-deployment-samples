
import express, { Request, Response } from "express";
import next from "next";

const app = next({ });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
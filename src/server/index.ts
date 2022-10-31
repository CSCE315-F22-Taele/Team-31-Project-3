import express, {Request, Response} from "express";

const app = express();
app.use(express.json())

const add = (p:addParam) => {
    const {a,b} = p;
    return a+b;
}
app.get("/", (req: Request, resp: Response) => {
	resp.send("Hello world");
});

interface addParam {
    a : number,
    b: number
}

app.post('/', (req: Request, resp: Response) => {

    const param  = req.body as addParam;
    resp.send(`the solution of ${param.a} + ${param.b} is ${add(param)}`);
});

app.listen(3000, () => {
	console.log("http://localhost:3000/");
});

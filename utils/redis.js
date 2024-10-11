import { createClient } from "redis";

class clientredis{
    constructor(){
        this.client = createClient();
        this.client.connect();
        this.client.on('connect',msg =>{
            console.log(msg);
        })
        this.client.on('error', err =>{
            console.log(err);
        })
    }
}
const redisclt = new clientredis();

export default redisclt;
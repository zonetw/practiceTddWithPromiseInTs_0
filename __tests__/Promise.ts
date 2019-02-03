import {Promise} from "../src/Promise";
import {PromiseStatus} from "../src/PromiseStatus";

describe("1. Basic Test", ()=>{
    it("Promise receive a function, which receives two parameters: resolve and reject function, as parameter. and have a status of pending at the beginning", ()=>{
        let promise = new Promise((resolve, reject)=>{
        });
        expect(promise.status).toEqual(PromiseStatus.PENDING);
    });

    it("Promise is an object or function with a then method whose behavior conforms to this specification", ()=>{
        let promise = new Promise((resolve, reject)=>{});
        expect(typeof promise.then).toEqual("function");
    });

    it("Promise will call resolve function when fulfilled", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve();
                done();
            });
        });
    });

    it("Promise will call reject function when failed", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                reject();
                done();
            });
        });
    });
    
});
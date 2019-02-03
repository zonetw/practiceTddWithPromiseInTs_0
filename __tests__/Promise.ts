import {Promise} from "../src/Promise";

describe("1. Basic Test", ()=>{
    it("Promise receive a function, which receives two parameters: resolve and reject function, as parameter", ()=>{
        let promise = new Promise((resolve, reject)=>{});
    });

    it("Promise is an object or function with a then method whose behavior conforms to this specification", ()=>{
        let promise = new Promise((resolve, reject)=>{});
        expect(typeof promise.then).toEqual("function");
    });
});
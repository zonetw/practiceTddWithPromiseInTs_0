import {Promise} from "../src/Promise";

describe("1. Basic Test", ()=>{
    it("1.1. promise is an object or function with a then method whose behavior conforms to this specification", ()=>{
        let promise = new Promise();
        expect(typeof promise.then).toEqual("function");
    });
});
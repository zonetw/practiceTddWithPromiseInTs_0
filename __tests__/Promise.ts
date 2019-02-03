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

    it("Promise will call resolve function when fulfilled, and change status to resolved", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve();
                expect(promise.status).toEqual(PromiseStatus.RESOLVED);
                done();
            });
        });
        expect(promise.status).toEqual(PromiseStatus.PENDING);
    });

    it("Promise will call reject function when failed, and change status to rejected", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                reject();
                expect(promise.status).toEqual(PromiseStatus.REJECTED);
                done();
            });
        });
        expect(promise.status).toEqual(PromiseStatus.PENDING);
    });

    it("Promise will not change status after complete(reject)", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                reject();
                resolve();
                expect(promise.status).toEqual(PromiseStatus.REJECTED);
                done();
            });
        });
    });

    it("Promise will not change status after complete(resolve)", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve();
                reject();
                expect(promise.status).toEqual(PromiseStatus.RESOLVED);
                done();
            });
        });
    });
});

describe("2. Thenable Test", ()=>{
    it("Promise can be chained and pass result to next then method", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve(promise.id);
            })
        });

        promise.then((result)=>{
            expect(result).toEqual(1);
            let promiseInThen1 = new Promise((resolve, reject)=>{
                process.nextTick(()=>{
                    resolve(promiseInThen1.id);
                });
            });
        }).then((result)=>{
            expect(result).toEqual(2);
            done();
        });
    });
});

import {Promise} from "../src/Promise";
import {PromiseStatus} from "../src/PromiseStatus";

describe("1. Basic Test", ()=>{
    it("Promise receive a function, which receives two parameters: resolve and reject function, as parameter. and have a status of pending at the beginning", ()=>{
        let promise = new Promise((resolve, reject)=>{
        });
        expect(promise.status).toEqual(PromiseStatus.PENDING);
    });

    it("Catch the error occur when executing the executor function ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            throw new Error("Error on purpose");
        }).catch((reason)=>{
            expect(reason.toString()).toEqual("Error: Error on purpose");
        });
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
    it("the previous result will pass to next then method when instant complete ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            resolve(1);
        }).then((result)=>{
            expect(result).toEqual(1);
            return 2;
        }).then((result)=>{
            expect(result).toEqual(2);
        });
    });

    it("catch error in then method", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve(1);
            });
        }).then((reason)=>{
            expect(reason).toEqual(1);
            throw new Error();
        }).catch((reason)=>{
            done();
        })
    });

    it("the previous reason will pass to next catch method when instant complete ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            reject(1);
        }).catch((reason)=>{
            expect(reason).toEqual(1);
            return 2
        }).catch((reason)=>{
            expect(reason).toEqual(2);
        });
    });

    it("the previous result will pass to next then method ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve(1);
            });
        }).then((result)=>{
            expect(result).toEqual(1);
            return 2;
        }).then((result)=>{
            expect(result).toEqual(2);
        });
    });

    it("test then and catch mix situation: resolve ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            resolve(1);
        }).catch((reason)=>{
            return 2;
        }).then((result)=>{
            expect(result).toEqual(1);
        });
    });

    it("test then and catch mix situation: reject ( sync )", ()=>{
        let promise = new Promise((resolve, reject)=>{
            reject(1);
        }).then((result)=>{
            return 2;
        }).catch((reason)=>{
            expect(reason).toEqual(1);
        });
    });

    it("the previous result will pass to next then method ( async )", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve(1);
            });
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                process.nextTick(()=>{
                    expect(result).toEqual(1);
                    resolve(2);
                });
            });
        }).then((result)=> {
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    expect(result).toEqual(2);
                    resolve(3);
                });
            });
        }).then((result)=>{
            expect(result).toEqual(3);
            done();
        });
    });

    it("mix then and catch, resolve ( async )", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                resolve(1);
            });
        }).catch((reason)=>{
            return new Promise((resolve, reject)=>{
                process.nextTick(()=>{
                    resolve(2);
                });
            });
        }).then((result)=> {
            expect(result).toEqual(1);

            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    resolve(3);
                });
            });
        }).then((result)=>{
            expect(result).toEqual(3);
            done();
        });
    });

    it("mix then and catch, reject ( async )", (done)=>{
        let promise = new Promise((resolve, reject)=>{
            process.nextTick(()=>{
                reject(1);
            });
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                process.nextTick(()=>{
                    reject(2);
                });
            });
        }).catch((reason)=> {
            expect(reason).toEqual(1);

            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    reject(3);
                });
            });
        }).catch((reason)=>{
            expect(reason).toEqual(3);
            done();
        });
    });
});


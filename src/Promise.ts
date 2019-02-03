import {PromiseStatus} from "./PromiseStatus";

export class Promise{
    private status_: PromiseStatus;
    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        this.status_ = PromiseStatus.PENDING;

        executor(()=>{this.resolve();}, ()=>{this.reject();});
    }
    private resolve(): void{
        if(this.status_=== PromiseStatus.PENDING){
            this.status_ = PromiseStatus.RESOLVED;
        }
    }
    private reject(): void{
        if(this.status_ === PromiseStatus.PENDING){
            this.status_ = PromiseStatus.REJECTED;
        }
    }
    then(){
    }

    public get status():PromiseStatus{
        return this.status_;
    }
}
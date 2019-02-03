import {PromiseStatus} from "./PromiseStatus";

export class Promise{
    private status_: PromiseStatus;
    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        this.status_ = PromiseStatus.PENDING;
        executor(this.resolve, this.reject);
    }
    private resolve(){
    }
    private reject(){
    }
    then(){
    }

    public get status():PromiseStatus{
        return this.status_;
    }
}
import {PromiseStatus} from "./PromiseStatus";

export class Promise{
    private _status: PromiseStatus;

    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        this._status = PromiseStatus.PENDING;

        executor(()=>{this.resolve();}, ()=>{this.reject();});
    }
    private resolve(): void{
        if(this.status_=== PromiseStatus.PENDING){
            this.status_ = PromiseStatus.RESOLVED;
        }
    }
    private reject(): void{
        if(this._status === PromiseStatus.PENDING){
            this._status = PromiseStatus.REJECTED;
        }
    }
    then(){
    }

    public get status():PromiseStatus{
        return this._status;
    }
}
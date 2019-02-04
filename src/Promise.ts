import {PromiseStatus} from "./PromiseStatus";

export class Promise{
    private _status: PromiseStatus;
    private _value: any;

    private _onFulfillActions: Function[];

    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        this._status = PromiseStatus.PENDING;
        this._onFulfillActions = [];

        executor((result)=>{this.resolve(result);}, (reason)=>{this.reject(reason);});
    }
    private resolve(result?: any): void{
        if(this._status=== PromiseStatus.PENDING){
            this._status = PromiseStatus.RESOLVED;
            this._value = result;

            let tmpAction: Function;
            while(tmpAction = <Function>this._onFulfillActions.shift()){
                this._value = tmpAction(this._value);
                if(this._value instanceof Promise){
                    this._onFulfillActions.forEach((actions)=>{
                        this._value.then(actions);
                    });
                  break;
                }
            }
        }
    }
    private reject(reason?: any): void{
        if(this._status === PromiseStatus.PENDING){
            this._status = PromiseStatus.REJECTED;
        }
    }
    then(onFulfillAction: (result: any)=>any): Promise{
        this._onFulfillActions.push(onFulfillAction);
        return this;
    }

    public get status():PromiseStatus{
        return this._status;
    }
}
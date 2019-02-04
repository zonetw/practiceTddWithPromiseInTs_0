import {PromiseStatus} from "./PromiseStatus";

export class Promise{
    private _status: PromiseStatus;
    private _value: any;

    private _onFulfillActions: Function[];
    private _onFailedActions: Function[];

    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        this._status = PromiseStatus.PENDING;
        this._onFulfillActions = [];
        this._onFailedActions = [];

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
            this._value = reason;

            let tmpAction: Function;
            while(tmpAction = <Function>this._onFailedActions.shift()){
                this._value = tmpAction(this._value);
                if(this._value instanceof Promise){
                    this._onFailedActions.forEach((actions)=>{
                        this._value.catch(actions);
                    });
                    break;
                }
            }
        }
    }
    then(onFulfillAction: (result: any)=>any): Promise{
        let returnedPromise: Promise = this;
        let resultOfFulfillAction: any;

        switch(this._status){
            case PromiseStatus.PENDING:
                this._onFulfillActions.push(onFulfillAction);
                break;
            case PromiseStatus.RESOLVED:
                resultOfFulfillAction = onFulfillAction(this._value);
                if(resultOfFulfillAction instanceof Promise){
                    returnedPromise = resultOfFulfillAction;
                }else{
                    this._value = resultOfFulfillAction;
                }
                break;
            case PromiseStatus.REJECTED:
                // do nothing
                break;
        }
        return returnedPromise;
    }
    catch(onFailedAction: (reason: any)=>any): Promise{
        let returnedPromise: Promise = this;
        let resultOfFailedAction: any;

        switch(this._status){
            case PromiseStatus.PENDING:
                this._onFailedActions.push(onFailedAction);
                break;
            case PromiseStatus.REJECTED:
                resultOfFailedAction = onFailedAction(this._value);
                if(resultOfFailedAction instanceof Promise){
                    returnedPromise = resultOfFailedAction;
                }else{
                    this._value = resultOfFailedAction;
                }
                break;
            case PromiseStatus.RESOLVED:
                // do nothing
                break;
        }
        return returnedPromise;
    }

    public get status():PromiseStatus{
        return this._status;
    }
}
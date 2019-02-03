
export class Promise{
    constructor(executor: (callbackWhenResolve: (result?: any)=>void, callbackWhenReject: (reject?: any)=>void)=>void){
        executor(this.resolve, this.reject);
    }
    private resolve(){
    }
    private reject(){
    }
    then(){
    }
}
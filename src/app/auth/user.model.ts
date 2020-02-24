export class User{
    //When User object will create 
    // Following data will be necessory
    constructor (
        public email:string,
        public id:string,
        private _token:string,//Token is private because we want to putt a logic on access of token
        private _tokenExpirationDate:Date 
    ){}
     //Access token
     get (){
       
    }
}
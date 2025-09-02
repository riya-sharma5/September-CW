// type User = {
//     name: string,
//     email: string,
// }

// type Admin = User & {
//     getDetails(user:string): void
// } 

// /////////////////////////////CLASSES AND OBJECTS

// class Device {
//     name = "lg";
//     price = 12000;
//      category = "digital";
// }

// let d1 = new Device();
// let d2 = new Device();


// //  CONSTRUCTORS

// class BottleMaker{
// constructor(public name: string, public price: number){

// }
// }
//  let b1 = new BottleMaker("Milton", 1200);

// class HumanMaker{
//   age = 0;
//   constructor(public name: string, public isbeautiful: boolean){

//   }
// }

// new HumanMaker("riya" , true);

// class Music{
//     constructor(public name: string, public artist: string, public thumbnail: string = "somethumbnail.jpg", public length: number, public free: boolean){

//     }
// }
// let m1 = new Music("chal aa ja", "riya", "", 1200, false)


// class Music{
//     constructor(public name: string, public artist: string, public thumbnail: string = "somethumbnail.jpg", public length: number, public free: boolean){
// if(!thumbnail){
// this.thumbnail = "somethumbnail.jpg";
// }
//     }
// }
// let m1 = new Music("chal aa ja", "riya", , 1200, false);

// ///////// this keyword..

// class Abcd{
//     name = "riya";

//     changeName(){
//         this.name
//     }
// }

//  class BottleMaker{
//     constructor(public name: string){
        // this.name = name;   // no need of using this here
//     }
//  }
//  new BottleMaker("milton");


// class BottleMaker{
//     public name;
//     constructor(name: string){
//         this.name = name;
//     }
// }

// let b1 = new BottleMaker("milton");



// class BottleMaker{
//     constructor(private name: string){}

// }
// let b1 = new BottleMaker("milton");
// // b1.name = "mil";  it will compile but this is wrong
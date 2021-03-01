'use strict';
let itemArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
//getElementbyID for the image section - and left image - right image- and center image for rendering in the correcr place
//const imgSec = document.getElementById ("imageSection");
const imageSection = document.getElementById ( 'imageSection' );
const lefSec = document.getElementById ( 'leftImage' );
const rigSec = document.getElementById ( 'rightImage' );
const cenSec = document.getElementById ( 'centerImage' );

let leftItemIndex = 0 ;
let rightItemIndex = 0;
let centerItemIndex = 0;
const clickCounter = 25;//max num of clicks
// const image
//build a constructor
function Item( name ){
  this.name = name ;
  this.img = `./img/${name}`;
  this.clicks = 0;
  this.shown = 0;
  Item.all.push( this );
}
Item.all = []; //build array for all objects created  by the contructor
Item.counter = 0 ;
//this is for loop to create new object for all items by this loop only (withoutname) from the contructor Item and give it a name
//from that array like itemArray[1]='banana' --->> so new Item (banana)----> this will build an object from the contructor
// it so we will have object (name/img/pushed to itemall) lets check this by console
for ( let i = 0 ; i < itemArray.length ;i++ ){
  new Item ( itemArray[i] );
}
console.log ( Item.all );
// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
//render function to render left/right/center images in the image section
function render (){
  let leftIndex = randomNumber ( 0,Item.all.length - 1 );//to render random object from the item.all array generate random number within item.all array lenght and give it to leftindex
  lefSec.src = Item.all[leftIndex].img ;//(call item.all[randomNum]) and render its image
  lefSec.alt = Item.all[leftIndex].name;//if the image is broken print its name alternative
  leftItemIndex = leftIndex; // still dont know why we use it
  let rightIndex ;
  do {
    rightIndex = randomNumber ( 0,Item.all.length - 1 );
  } //geterte random num within item.all array lenght
  while ( rightIndex === leftIndex );//to be sure that they are unique images and doesnt repeat
  rigSec.src = Item.all[rightIndex].img;//render the image for this random num in the array
  rigSec.alt = Item.all[rightIndex].name;//render the image name if its broken alternative
  rightItemIndex = rightIndex;// still dont know why
  let centerIndex;
  do{
    centerIndex = randomNumber ( 0,Item.all.length - 1 );//generate random number within item.all array to generate random image
  }
  while ( centerIndex === leftIndex || centerIndex === rightIndex );//to be sure that they are unique images and doesnt repeat
  cenSec.src = Item.all[centerIndex].img;//render the image
  cenSec.alt = Item.all[centerIndex].name;
  centerItemIndex = centerIndex;

  Item.all[leftIndex].shown++;//counter for images when it has shown (when calling its object)
  Item.all[rightIndex].shown++;//counter for images when it has shown (when calling its object)
  Item.all[centerIndex].shown++;//counter for images when it has shown (when calling its object)

  //this part for rendering the results only ( view results button)
  const parentElement = document.getElementById ( 'result' );
  const articleElement = document.createElement ( 'article' );
  const h1Element = document.createElement ( 'h1' );
  parentElement.appendChild ( articleElement );
  parentElement.appendChild( h1Element );
  const pElement = document.createElement ( 'p' );
  articleElement.appendChild( pElement );
  for ( let i = 0 ; i <= clickCounter ; i++ ){
    const pElement = document.createElement ( 'p' );
    articleElement.appendChild( pElement );
    pElement.textContent = `${Item.all[i].name} had ${Item.all[i].clicks} votes, and was seen ${Item.all[i].shown} times`;
  }
}
function handelClick( event ) {
  if( Item.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage' ){
      if( clickedElement.id === 'leftImage' ) {
        Item.all[leftItemIndex].clicks++;
      }
      if( clickedElement.id === 'rightImage' ) {
        Item.all[rightItemIndex].clicks++;
      }
      if( clickedElement.id === 'centerImage' ) {
        Item.all[centerItemIndex].clicks++;
      }
      Item.counter++;
      render();
      console.log ( Item.counter );
      console.log( Item.all );
    }
  }
}
imageSection.addEventListener( 'click', handelClick );
console.log ( Item.all ) ;
render ();


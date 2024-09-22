

const typing = document.querySelector(".typing-text");
const input = document.querySelector(".input-field ");
const time = document.querySelector(" .time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function LoadParagraph() {
  const paragraph = [
    "The cat jumped gracefully onto the windowsill.",
    "A gentle rain began to fall as the sun set.",
    " She read her favorite book under the old oak tree.",
    "The aroma of fresh bread filled the cozy kitchen.",
    " Stars twinkled brightly in the clear night sky.",
    " He swiftly completed the puzzle in record time.",
    "The ocean waves crashed against the rocky shore.",
    "Birds sang a sweet melody at dawn's first light.",
  ];
  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typing.innerHTML = "";
  for (const char of paragraph[randomIndex]) {
    console.log(char);
    typing.innerHTML += `<span>${char}</span>`;
  
  }
  typing.querySelectorAll('span')[0].classList.add('active');
  document.addEventListener("keydown",()=>input.focus())
  typing.addEventListener("click",()=>{input.focus()})
}
//handle user input

function initTyping() {
  const char = typing.querySelectorAll('span');
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < char.length && timeLeft > 0){
    if(!isTyping){
      timer= setInterval(initTime,1000);
isTyping=true;
    }
    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add('correct');
      console.log("correct");
    } else {
      mistake++;
      char[charIndex].classList.add('incorrect');
      console.log("incorrect");
    }
    charIndex++;

    char[charIndex].classList.add('active');
    mistakes.innerText=mistake;
    cpm.innerText=charIndex-mistake
  } else {
  clearInterval(timer);
    input.value=''
  }
}
function initTime(){
 if(timeLeft>0){
  timeLeft--;
  time.innerHTML=timeLeft
  let wpmVal =Math.round(((charIndex-mistake)/5 )/(maxTime-timeLeft)*60);
  wpm.innerText=wpmVal;
 }else{
 clearInterval(timer);
 }
}
function reset(){
  LoadParagraph();
  clearInterval(timer);
  timeLeft=maxTime; 
  time.innerText=timeLeft;
  input.value='';
  charIndex = 0;
 mistake = 0;
 isTyping = false;
 wpm.innerText=0;
 cpm.innerText=0;
 mistakes.innerText=0
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset)
LoadParagraph();

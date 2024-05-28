let numTrys = 6 ;
let numHint = 2;
let current = 0;
let numLetters = 6;
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
let wordRandom = words[Math.floor(Math.random() * words.length)].toLowerCase();
const messageArea = document.querySelector(".message")
const inputs = document.querySelector(".inputs")

 

const btnCheck = document.querySelector(".check");

// Hints
const hintBtn = document.querySelector(".hint")
const hintSpan = document.querySelector(".hint span");
hintSpan.innerText = numHint;

const generateInputs= ()=>{
    for(let i =1; i <= numTrys; i++){

        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add(`try-${i}`)
        span.innerText = `Try ${i}`;
        if(i !== 1){
            div.classList.add("disabled")
        }
        div.appendChild(span);
    for(let j = 0; j < numLetters ; j++){
       
        let input = document.createElement("input");
        input.setAttribute("type" , "text");
        input.className = "text"; 
        
        div.appendChild(input); 
    }
    inputs.appendChild(div)
    
    }
}
generateInputs()

    
  const AllInputsText = ()=> {
    let inputsText = inputs.children[current].querySelectorAll(".text");
return inputsText;
  }
   
    console.log(wordRandom)
function displayGame(){
   
 //  let inputsText = inputs.children[current].querySelectorAll(".text")
  const inputsText = AllInputsText()
   inputsText[0].focus()

   for(let i = 0; i < inputsText.length; i++){
        inputsText[i].addEventListener("input", (e)=>{
         if(e.target.value){
            
             e.target.blur();
     
             i++ ;
             if(inputsText[i]){
                 inputsText[i].focus()
     
             }
             
         }
        })
         
     }
     

    }
   displayGame()


   

    btnCheck.addEventListener("click" , ()=>{

    
    let allTries = document.querySelectorAll(".inputs > div");
   let successWord = true;
   // let inputsText = inputs.children[current].querySelectorAll(".text")
   const inputsText = AllInputsText()

    inputsText.forEach((input, idx)=>{
        const Letter = input.value.toLowerCase()
        if(Letter == wordRandom[idx]){
         
        input.classList.add("yes-in-place")
        }
        else if(input.value && wordRandom.includes(Letter) && wordRandom.indexOf(Letter) != idx) {
         input.classList.add("not-in-place")
         successWord = false
        }else{
   input.classList.add("no")
   successWord = false
        }
      });
      inputs.children[current].classList.add("disabled")
      
     if(current +1 <= inputs.children.length-1){
      inputs.children[current+1].classList.remove("disabled");
     }
     
      current++ ;
     
     
      if(current >= numTrys || successWord == true){
allTries.forEach(divTry=>{
    divTry.classList.add("disabled")
})
        
     
       showMsg(successWord)
       }else{
        displayGame();
       }
    
     
    })

     

     function showMsg(successWord){
        btnCheck.classList.add("disabled")
        hintBtn.classList.add("disabled")
if(successWord){
    messageArea.innerHTML = `You Win The Word Is <span>${wordRandom}</span>`;
    if(numHint === 2){
        messageArea.innerHTML += `<p>Congratz You Didn't Use Hints</p>`;
      
    }
}else{
    messageArea.innerHTML = `You Lose The Word Is <span>${wordRandom}</span>` 

}
        
     }

    
     

    hintBtn.addEventListener("click" , ()=>{

 //let inputsText = inputs.children[current].querySelectorAll(".text")
 const inputsText = AllInputsText()
let inputsTextFiltered = Array.from(inputsText).filter((input) => input.value === "");
const randomIndex = Math.floor(Math.random() * inputsTextFiltered.length);
const randomInput = inputsTextFiltered[randomIndex];
const indexToFix = Array.from(inputsText).indexOf(randomInput);
if(indexToFix !== -1){
inputsText[indexToFix].value = wordRandom[indexToFix]
}
numHint-- ;
hintSpan.innerText = numHint;

  
    if(hintSpan.innerText == 0){
    hintBtn.classList.add("disabled")
        
    }
    

})


const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const digitalTime = document.querySelector(".time");

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegree = Math.round(((seconds / 60) * 360) + 90);
    secondHand.style.transform = `rotate(${secondsDegree}deg)`;
    console.log(seconds);
    console.log(secondsDegree);
    //if (secondsDegree >= 440 || secondsDegree < 20){
        //secondHand.style.transition = "0.0s";
    //}// else {
        //secondHand.style.transition = "0.3s";
    //}
    const mins = now.getMinutes();
    const minsDegree = ((mins / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minsDegree}deg)`;
    
    const hours = now.getHours();
    const hoursDegree = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegree}deg)`;


    let time = `${hours}:${mins}`;
    console.log(digitalTime);

    digitalTime.innerHTML  = time;
}
    
setInterval(setDate, 1000);



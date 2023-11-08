// Start of Code for the clock feature
const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const digitalTime = document.querySelector(".time");

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegree = Math.round(((seconds / 60) * 360) + 90);
    secondHand.style.transform = `rotate(${secondsDegree}deg)`;

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

    digitalTime.innerHTML  = time;
}
    
setInterval(setDate, 1000);

// End of Code for the clock feature

// Start of Code for the Timer feature
const flexBox = document.querySelector(".flexbox");
const newTimer = document.querySelector("#new-timer");
newTimer.addEventListener("click", createTimer);

function createTimer(){
    //Create you date object
    const now = new Date();
    const seconds = now.getSeconds()
    const mins = now.getMinutes();
    const hours = now.getHours();

    let time = `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}`;

    //create dialog-box
    const dialogBox = document.createElement("div");
    dialogBox.classList.add("dialog-box");

    //create the timer div
    const timerDiv = document.createElement("div");
    timerDiv.classList.add("timer");

    //create the timer message
    const message = document.createElement("p");
    message.innerText = "Enter number of  minutes.";
    timerDiv.appendChild(message);
    
    //create set-timer-container div
    const setTimerContainer = document.createElement("div");
    setTimerContainer.classList.add("set-timer-container");

    //create the hour input lable
    const inputLabel1 = document.createElement("span");
    inputLabel1.innerText = "Hours";

    //create the hour input
    const timerHour = document.createElement("input");
    timerHour.classList.add("hours");
    timerHour.value = "00"

    //create the column span
    const column = document.createElement("span");
    column.classList.add("column");

    //create the minutes input
    const timerMinute= document.createElement("input");
    timerMinute.classList.add("minutes");
    timerMinute.value = "00"

    //create the minutes input lable
    const inputLabel2 = document.createElement("span");
    inputLabel2.innerText = "Minutes";

    //append all the elements to set-timer-container
    setTimerContainer.append(inputLabel1, timerHour, column, timerMinute, inputLabel2);

    //Append set-timer-container to timerDiv
    timerDiv.appendChild(setTimerContainer);

    //create button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    //create cancle button
    const btnCancel = document.createElement("button");
    btnCancel.classList.add("short", "red", "cancel");
    btnCancel.innerText = "Cancel";
    btnCancel.addEventListener("click", ()=>{
        timerDiv.remove();
    })

    //create start button
    const btnStart = document.createElement("button");
    btnCancel.classList.add("short");
    btnStart.innerText = "Start";
    btnStart.style.width = "50%";
    btnStart.addEventListener("click", startCountDown);

    function startCountDown() {

        //Get the value of the hour and minute
        const setHour = parseInt(timerHour.value);
        const setMinutes = parseInt(timerMinute.value);

        //Calculate the total minutes
        const totalMinutes = ((setHour * 60) + setMinutes) * 60;

        //check if the input is empty
        if (!isNaN(totalMinutes) && totalMinutes > 0) {
            createCountDown(totalMinutes);
        }else{
            alert("Enter number of minutes");
        }

        //Function to Create the countdown component
        function createCountDown(totalMinutes){
            const present = Date.now();
            const then = present + (totalMinutes * 1000); //the duration of the timer

            //Create the countdown container Div
            const countDownDiv = document.createElement("div");
            countDownDiv.classList.add("countdown-container");

            //Create the countdown title
            const cntDownTitle = document.createElement("p");
            cntDownTitle.innerHTML = `${setHour}hr : ${setMinutes}min Timer`;

            //create the countdown
            const cntDown = document.createElement("h1");
            cntDown.classList.add("countdown");
            const liveCountDown = setInterval(()=>{
                const secondsLeft = Math.round((then - Date.now())/1000);
                displayTimeLeft(secondsLeft)
                if (secondsLeft <= 0 ) {
                    clearInterval(liveCountDown);
                }
            },1000)

            function displayTimeLeft(secondsLeft){
                const remainderSeconds = secondsLeft % 60
                const minutes = Math.floor((secondsLeft/60) % 60);
                const hours = Math.floor(Math.floor((secondsLeft/60))/60); 
                
                cntDown.innerText = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
            }
        
            //create the start time
            const startTime = document.createElement("h4");
            startTime.classList.add("start");
            startTime.innerText = "Start Time:";
            const startTimeSpan = document.createElement("span");
            startTimeSpan.innerText = ` ${time}`;
            startTime.appendChild(startTimeSpan);

            //create the End time
            const endTime = document.createElement("h4");
            endTime.classList.add("end");
            endTime.innerText = "End Time: ";
            const endTimeSpan = document.createElement("span");

            const end = new Date(then);
            const endHours = end.getHours();
            const endMinute = end.getMinutes();

            endTimeSpan.innerText = ` ${endHours < 10 ? '0' : ''}${endHours}:${endMinute < 10 ? '0' : ''}${endMinute}`;
            endTime.appendChild(endTimeSpan);

            //Create the btn container
            const btnCont = document.createElement("div");
            btnCont.classList.add("btn-container");
            btnCont.style.gap = "10px";

            //Create the delete Buttons
            const stopBtn = document.createElement("button");
            stopBtn.classList.add("short", "red");
            stopBtn.innerText = "Delete";
            btnCont.appendChild(stopBtn);

            stopBtn.addEventListener("click", ()=>{
                //create delete Div
                const deleteDiv = document.createElement("div");
                deleteDiv.classList.add("delete-div");

                //create delete message
                const deleteMessage = document.createElement("p");
                deleteMessage.innerText = "Are you sure you want to delete timer?";

                //Create icon
                const deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fa-solid", "fa-times");

                //Create the btn container
                const delBtnCont = document.createElement("div");
                delBtnCont.classList.add("btn-container");

                //Create the No Buttons
                const noBtn = document.createElement("button");
                noBtn.classList.add("short");
                noBtn.innerText = "No";
                delBtnCont.appendChild(noBtn);

                noBtn.addEventListener("click", ()=>{
                    deleteDiv.remove()
                    countDownDiv.style.display = "flex";
                })

                //Create the yes Buttons
                const yesBtn = document.createElement("button");
                yesBtn.classList.add("short", "red");
                yesBtn.innerText = "Yes";
                delBtnCont.appendChild(yesBtn);

                yesBtn.addEventListener("click", ()=>{
                    clearInterval(liveCountDown)
                    dialogBox.remove();
                })
                
                //Append delete elements
                deleteDiv.append(deleteMessage, deleteIcon, delBtnCont);

                //Hide the countdown container Div
                countDownDiv.style.display = "none";

                //append delete div to dialog box
                dialogBox.appendChild(deleteDiv);
            })
            
            //Create the reset Button
            const resetBtn = document.createElement("button");
            resetBtn.classList.add("short");
            resetBtn.innerText = "Reset";
            btnCont.appendChild(resetBtn);

            resetBtn.addEventListener("click", ()=>{
                clearInterval(liveCountDown);
                countDownDiv.remove()
                dialogBox.append(timerDiv);
            })

            //Append the elements to the countdown container Div
            countDownDiv.append(cntDownTitle, cntDown, startTime, endTime, btnCont);

            //Remove the timer div
            timerDiv.remove();

            //Append countdown container Div
            dialogBox.append(countDownDiv);


        }
    }

    //append buttons to botton container
    btnContainer.append(btnCancel, btnStart);

    //append button container to timerDiv
    timerDiv.append(btnContainer);

    //append timerDiv to dialog-box
    dialogBox.appendChild(timerDiv);
    
    //append dialog-box to flexboxs
    flexBox.appendChild(dialogBox);    

}

// End of Code for the Timer feature

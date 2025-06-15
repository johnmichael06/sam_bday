let bodEl = document.querySelector("body");


bodEl.addEventListener("mousemove", (event)=>{

    let xPosition = event.offsetX;
    let yPosition = event.offsetY;


    let spanEl = document.createElement("span");
    spanEl.style.left = xPosition + "px";
    spanEl.style.top = yPosition + "px";

    let size = Math.random() * 100;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";

    bodEl.appendChild(spanEl);


    setTimeout(()=>{


        spanEl.remove()


    }, 3000)


})
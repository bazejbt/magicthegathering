

const getName = () => {
    const myName = document.querySelector("#nameInput").value;
    localStorage.setItem("username", myName);
}

const submitBtn = document.querySelector("#subBtn");
submitBtn.addEventListener("click", function(e){
   // e.preventDefault();
    getName();
});




let myName = "";

const getName = () => {
    myName = document.querySelector("#nameInput").value;
    document.querySelector("#header-brand").innerText = `Hello, Plainswalker ${myName}`
}

const submitBtn = document.querySelector("#subBtn");
submitBtn.addEventListener("click", function(e){
   // e.preventDefault();
    getName();
});




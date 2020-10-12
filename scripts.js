const nameInput = document.querySelector("#nameInput")
const submitBtn = document.querySelector("#subBtn");


const getName = () => {
    const myName = nameInput.value;
    localStorage.setItem("username", myName);
}

submitBtn.addEventListener("click", function(e){
    getName();
    window.location.href = './home.html';
});

nameInput.addEventListener("keyup", function(e){
    const input = e.target.value;
    let firstCharCapped = input.substring(0, 1).toUpperCase();
    let firstChar = input.substring(0, 1);
    if (input.length >= 3) {
        if (firstCharCapped === firstChar){
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    } else {
        submitBtn.disabled = true;
    }
})

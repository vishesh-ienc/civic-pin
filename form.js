let submit_succesfull = document.getElementById("submit_succesfull")
let form = document.getElementById("myform");

function handleformsubmit(event){

    event.preventDefault()
    submit_succesfull.classList.remove("hidden");
    form.reset();
    setTimeout(() => submit_succesfull.classList.add("hidden"), 3500);
}

form.addEventListener('submit', handleformsubmit)
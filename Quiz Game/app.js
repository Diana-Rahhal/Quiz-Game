

let levels = document.querySelectorAll(".choices div");

console.log(levels);

levels.forEach(level => {

    level.addEventListener('click' , ()=>
        {
            if(level.innerHTML=='Easy'){
                startEasyLevel();
            }
            else if(level.innerHTML=='Meduim'){
                startMeduimLevel();
            }
            else if(level.innerHTML=='Hard'){
                startHardLevel();
            }

        } 
    );
    
});



function startEasyLevel(){
    console.log("Easy Level");
    sessionStorage.setItem("level", "Easy");
    setTimeout(() => {
        window.location.href = "quiz.html";
    }, 300); 
    
}
function startMeduimLevel(){
    console.log("Meduim Level");
    sessionStorage.setItem("level", "Meduim");
    setTimeout(() => {
    window.location.href = "quiz.html";
    }, 300); 
}
function startHardLevel(){
    console.log("Hard Level");
    sessionStorage.setItem("level", "Hard");
    setTimeout(() => {
    window.location.href = "quiz.html";
    }, 300); 
}
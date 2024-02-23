function clickButton(){
    let userInput = document.getElementById("password").value;
    if(b64_md5(userInput) === "xYc+aGjHjpXmiM8Q8F/1+w"){
        document.cookie = "correctAns=" + userInput+";path=/;";
        window.location.href='./home/'
    }
    else {
        alert("再试试")
    }
}
const loginBtn = document.getElementById('login-btn');
const username = document.getElementById('username');
const password = document.getElementById('password');


loginBtn.addEventListener('click',function(){
    const userValue = username.value;
    const passValue = password.value;

    if(userValue == 'admin' && passValue == 'admin123'){
        window.location.href = "./home.html";
    }
    else{
        alert('Wrong Credential :(')
    }
    username.value = '';
    password.value = '';
})
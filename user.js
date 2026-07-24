const userArea = document.getElementById("userArea");


auth.onAuthStateChanged((user)=>{

    if(user){

        userArea.innerHTML = `
            <span>${user.email}</span>
            <button onclick="logout()">
                로그아웃
            </button>
        `;

    }else{

        userArea.innerHTML = `
            <button onclick="location.href='login.html'">
                로그인
            </button>
        `;

    }

});



function logout(){

    auth.signOut()
    .then(()=>{

        location.reload();

    });

}

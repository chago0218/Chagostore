// 회원가입

function signup(){


    const email = document.querySelector("#email").value;

    const password = document.querySelector("#password").value;



    auth.createUserWithEmailAndPassword(
        email,
        password
    )

    .then(()=>{

        alert("회원가입 완료");

        location.href="index.html";

    })


    .catch((error)=>{

        alert(error.message);

    });


}





// 로그인

function login(){


    const email = document.querySelector("#email").value;

    const password = document.querySelector("#password").value;



    auth.signInWithEmailAndPassword(
        email,
        password
    )


    .then(()=>{


        alert("로그인 성공");


        location.href="index.html";


    })


    .catch((error)=>{


        alert(error.message);


    });


}

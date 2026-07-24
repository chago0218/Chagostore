// 관리자 이메일
const adminEmail = "관리자이메일@gmail.com";


// 관리자 인증 확인

auth.onAuthStateChanged((user)=>{


    if(!user){

        alert("로그인이 필요합니다");

        location.href = "login.html";

        return;

    }



    if(user.email !== adminEmail){

        alert("관리자 권한이 없습니다");

        location.href = "index.html";

        return;

    }



});





// 상품 추가

function addProduct(){


    const name =
    document.querySelector("#name").value;


    const price =
    document.querySelector("#price").value;


    const image =
    document.querySelector("#image").value;


    const description =
    document.querySelector("#description").value;


    const size =
    document.querySelector("#size").value;


    const link =
    document.querySelector("#link").value;



    db.collection("products")
    .add({


        name:name,

        price:Number(price),

        image:image,

        description:description,

        size:size,

        link:link,

        createdAt:
        new Date()


    })

    .then(()=>{


        alert("상품 등록 완료");


        location.reload();


    })

    .catch((error)=>{


        console.log(error);


        alert("등록 실패");


    });



}






// 상품 삭제

function deleteProduct(id){


    db.collection("products")
    .doc(id)
    .delete()

    .then(()=>{


        alert("삭제 완료");


        location.reload();


    });



}






// 관리자 상품 목록 출력

function loadProducts(){


    const list =
    document.querySelector("#adminProducts");



    if(!list) return;



    list.innerHTML = "";



    db.collection("products")
    .get()

    .then((snapshot)=>{


        snapshot.forEach((doc)=>{


            let data = doc.data();



            list.innerHTML += `


            <div class="admin-card">


            <img src="${data.image}">


            <h3>

            ${data.name}

            </h3>


            <p>

            ${data.price}원

            </p>



            <button onclick="deleteProduct('${doc.id}')">

            삭제

            </button>


            </div>


            `;



        });



    });



}





loadProducts();

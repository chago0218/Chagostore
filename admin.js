const adminEmail = "kwonjeonghyunkjh0218@gmail.com";




// 관리자 확인

auth.onAuthStateChanged((user)=>{


    if(!user){


        alert("로그인이 필요합니다");

        location.href="login.html";

        return;


    }



    if(user.email !== adminEmail){


        alert("관리자 권한이 없습니다");

        location.href="index.html";

        return;


    }



    loadProducts();

    loadOrders();



});









// 상품 등록

function addProduct(){



    const product = {


        name:
        document.querySelector("#name").value,


        price:
        Number(document.querySelector("#price").value),


        image:
        document.querySelector("#image").value,


        brand:
        document.querySelector("#brand").value,


        category:
        document.querySelector("#category").value,


        size:
        document.querySelector("#size").value,


        description:
        document.querySelector("#description").value,


        link:
        document.querySelector("#link").value,


        createdAt:new Date()


    };





    db.collection("products")

    .add(product)

    .then(()=>{


        alert("상품 등록 완료");


        location.reload();


    });



}









// 상품 불러오기

function loadProducts(){


    const list =
    document.querySelector("#adminProducts");



    if(!list) return;




    db.collection("products")

    .get()

    .then((snapshot)=>{



        list.innerHTML="";




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









// 상품 삭제

function deleteProduct(id){



    db.collection("products")

    .doc(id)

    .delete()

    .then(()=>{


        alert("삭제 완료");


        loadProducts();


    });


}









// 주문 불러오기

function loadOrders(){



    const orders =
    document.querySelector("#orders");



    if(!orders) return;





    db.collection("orders")

    .orderBy("createdAt","desc")

    .get()

    .then((snapshot)=>{


        orders.innerHTML="";




        snapshot.forEach((doc)=>{


            let data = doc.data();




            orders.innerHTML += `



            <div class="order-card">



            <h3>

            ${data.name}

            </h3>



            <p>

            구매자:
            ${data.user}

            </p>




            <p>

            가격:
            ${data.price}원

            </p>




            <p>

            사이즈:
            ${data.size}

            </p>





            <p>

            상태:
            ${data.status}

            </p>





            <button onclick="changeStatus('${doc.id}')">

            배송완료 처리

            </button>





            <button onclick="deleteOrder('${doc.id}')">

            주문 삭제

            </button>




            </div>



            `;



        });



    });



}









// 주문 상태 변경

function changeStatus(id){



    db.collection("orders")

    .doc(id)

    .update({


        status:"배송완료"


    })

    .then(()=>{


        alert("상태 변경 완료");


        loadOrders();


    });



}









// 주문 삭제

function deleteOrder(id){


    db.collection("orders")

    .doc(id)

    .delete()

    .then(()=>{


        alert("주문 삭제 완료");


        loadOrders();


    });


}

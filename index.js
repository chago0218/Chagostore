const products = document.querySelector(".products");
const pagination = document.querySelector(".pagination");

let allProducts = [];
let currentPage = 1;

const productsPerPage = 12;


// 상품 불러오기

db.collection("products")
.get()
.then((snapshot)=>{

    allProducts = [];

    snapshot.forEach((doc)=>{

        allProducts.push({
            id: doc.id,
            ...doc.data()
        });

    });


    showProducts();
    createPagination();


})
.catch((error)=>{

    console.log(error);

});




// 상품 출력

function showProducts(){

    products.innerHTML = "";


    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;


    const pageProducts = allProducts.slice(start,end);



    pageProducts.forEach((data)=>{


        products.innerHTML += `


        <div class="card">


            <img src="${data.image || 'https://via.placeholder.com/300'}">


            <div class="info">


                <h3>
                ${data.name || "상품명 없음"}
                </h3>


                <div class="price">
                ${data.price || 0}원
                </div>


                <p>
                ${data.description || ""}
                </p>


                <p>
                브랜드: ${data.brand || ""}
                </p>


                <p>
                사이즈: ${data.size || ""}
                </p>



                <button class="buy"
                onclick="buyProduct('${data.link || ""}')">

                구매하기

                </button>


            </div>


        </div>


        `;


    });


}





// 구매 이동

function buyProduct(link){


    if(link){

        location.href = link;

    }else{

        alert("구매 링크가 없습니다.");

    }


}





// 페이지 생성

function createPagination(){


    pagination.innerHTML = "";


    const pageCount = Math.ceil(allProducts.length / productsPerPage);



    for(let i = 1; i <= pageCount; i++){


        pagination.innerHTML += `


        <button onclick="movePage(${i})">

        ${i}

        </button>


        `;


    }


}





// 페이지 이동

function movePage(page){


    currentPage = page;

    showProducts();


}

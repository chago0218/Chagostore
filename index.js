const products = document.querySelector(".products");
const pagination = document.querySelector(".pagination");


let allProducts = [];

let currentPage = 1;

const productsPerPage = 12;



// 상품 불러오기

db.collection("products")
.get()

.then((snapshot)=>{


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








// 상품 표시

function showProducts(){


    products.innerHTML = "";



    let start = 
    (currentPage - 1) * productsPerPage;



    let end =
    start + productsPerPage;



    let pageProducts =
    allProducts.slice(start,end);





    pageProducts.forEach((data)=>{



        products.innerHTML += `



        <div class="card" 
        onclick="openDetail('${data.id}')">



            <img src="${
            data.image || 
            'https://via.placeholder.com/300'
            }">



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

                사이즈:
                ${data.size || ""}

                </p>



            </div>


        </div>


        `;



    });



}









// 페이지 버튼 생성

function createPagination(){


    pagination.innerHTML = "";



    let pageCount = 
    Math.ceil(
    allProducts.length / productsPerPage
    );



    for(let i=1; i<=pageCount; i++){



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









// 상세페이지 이동

function openDetail(id){


    location.href =
    "detail.html?id=" + id;


}

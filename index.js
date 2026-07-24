const products = document.querySelector(".products");
const pagination = document.querySelector(".pagination");

const searchInput = document.querySelector(".search input");
const categoryButtons = document.querySelectorAll(".category button");


let allProducts = [];

let filteredProducts = [];

let currentPage = 1;

const productsPerPage = 12;

let currentCategory = "전체";





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



    filteredProducts = allProducts;


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
    filteredProducts.slice(start,end);





    pageProducts.forEach((data)=>{


        products.innerHTML += `


        <div class="card"
        onclick="openDetail('${data.id}')">



            <img src="${data.image || 
            'https://via.placeholder.com/300'}">



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



            </div>



        </div>


        `;


    });



}









// 페이지 생성

function createPagination(){


    pagination.innerHTML="";


    let pageCount = Math.ceil(
        filteredProducts.length / productsPerPage
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








// 검색 기능

searchInput.addEventListener("input",()=>{


    let keyword =
    searchInput.value.toLowerCase();



    filteredProducts =
    allProducts.filter((item)=>{


        return item.name
        .toLowerCase()
        .includes(keyword);



    });



    currentPage = 1;


    showProducts();

    createPagination();



});









// 카테고리 기능

categoryButtons.forEach((button)=>{


    button.addEventListener("click",()=>{


        currentCategory =
        button.innerText;



        if(currentCategory === "전체"){


            filteredProducts =
            allProducts;


        }

        else{


            filteredProducts =
            allProducts.filter((item)=>{


                return item.category === currentCategory;


            });



        }



        currentPage = 1;


        showProducts();

        createPagination();



    });



});

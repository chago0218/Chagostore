const products = document.querySelector(".products");
const pagination = document.querySelector(".pagination");
const searchInput = document.querySelector("#searchInput");


let allProducts = [];
let displayProducts = [];

let currentPage = 1;

const productsPerPage = 12;

let selectedBrand = "전체";



// Firebase 상품 가져오기

db.collection("products")
.get()
.then((snapshot)=>{


    allProducts = [];


    snapshot.forEach((doc)=>{


        allProducts.push({

            id:doc.id,

            ...doc.data()

        });


    });


    displayProducts = allProducts;


    showProducts();

    createPagination();


});





// 상품 출력

function showProducts(){


    products.innerHTML="";


    let start = (currentPage-1)*productsPerPage;

    let end = start + productsPerPage;


    let pageItems = displayProducts.slice(start,end);



    pageItems.forEach((data)=>{


        products.innerHTML += `


        <div class="card">


            <img 
            src="${data.image || 'https://via.placeholder.com/300'}"
            onclick="openDetail('${data.id}')">


            <div class="info">


                <h3>
                ${data.name || "상품명 없음"}
                </h3>


                <p>
                ${data.brand || ""}
                </p>


                <div class="price">
                ${data.price || 0}원
                </div>


                <button 
                class="buy"
                onclick="addCart('${data.id}')">

                장바구니

                </button>


                <button
                class="buy"
                onclick="buyProduct('${data.link || ""}')">

                구매하기

                </button>


            </div>


        </div>


        `;


    });


}






// 검색

searchInput.addEventListener("input",()=>{


    let value = searchInput.value;


    displayProducts = allProducts.filter((item)=>{


        return item.name
        .toLowerCase()
        .includes(value.toLowerCase());


    });



    currentPage=1;

    showProducts();

    createPagination();


});







// 브랜드 필터

function filterBrand(brand){


    selectedBrand = brand;


    if(brand==="전체"){


        displayProducts = allProducts;


    }

    else if(brand==="기타"){


        displayProducts = allProducts.filter(
            item=> !item.brand
        );


    }

    else{


        displayProducts = allProducts.filter(
            item=>item.brand===brand
        );


    }


    currentPage=1;


    showProducts();

    createPagination();


}







// 장바구니

function addCart(id){


    let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];


    let product =
    allProducts.find(
        item=>item.id===id
    );


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert("장바구니 추가 완료");


}







// 구매

function buyProduct(link){


    if(link){


        location.href=link;


    }

    else{


        alert("구매 링크 없음");


    }


}







// 상세페이지

function openDetail(id){


    location.href=
    "detail.html?id="+id;


}







// 페이지 버튼

function createPagination(){


    pagination.innerHTML="";


    let count =
    Math.ceil(
        displayProducts.length/productsPerPage
    );



    for(let i=1;i<=count;i++){


        pagination.innerHTML += `

        <button onclick="movePage(${i})">

        ${i}

        </button>

        `;


    }


}







function movePage(page){


    currentPage=page;


    showProducts();


}

const products = document.querySelector(".products");
const pagination = document.querySelector(".pagination");

let allProducts = [];
let currentPage = 1;

const productsPerPage = 12;


// 상품 가져오기
db.collection("products").get()
.then((snapshot)=>{

    snapshot.forEach((doc)=>{

        allProducts.push(doc.data());

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


    let start = (currentPage - 1) * productsPerPage;
    let end = start + productsPerPage;


    let pageProducts = allProducts.slice(start, end);


    pageProducts.forEach((data)=>{

        products.innerHTML += `

        <div class="card">

            <img src="${data.image || 'https://via.placeholder.com/300'}">

            <div class="info">

                <h3>${data.name}</h3>

                <div class="price">
                    ${data.price}원
                </div>

                <p>
                    ${data.description || ""}
                </p>

                <p>
                    사이즈: ${data.size || ""}
                </p>

                <button class="buy">
                    구매하기
                </button>

            </div>

        </div>

        `;

    });

}


// 페이지 버튼 생성
function createPagination(){

    pagination.innerHTML = "";


    let pageCount = Math.ceil(allProducts.length / productsPerPage);


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

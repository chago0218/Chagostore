const detail = document.querySelector("#detail");


// URL에서 상품 ID 가져오기

const params = new URLSearchParams(location.search);

const id = params.get("id");



let productData = null;

let selectedSize = "";




// 상품 불러오기

db.collection("products")
.doc(id)
.get()

.then((doc)=>{


    if(!doc.exists){

        detail.innerHTML = "상품을 찾을 수 없습니다.";

        return;

    }



    productData = doc.data();



    let sizes = productData.size 
    ? productData.size.split(",")
    : [];



    detail.innerHTML = `


    <div class="detail">


        <img 
        class="product-image"
        src="${productData.image || 'https://via.placeholder.com/500'}">


        <div class="info">


            <div class="brand">

            ${productData.brand || ""}

            </div>



            <div class="name">

            ${productData.name}

            </div>



            <div class="price">

            ${productData.price}원

            </div>




            <div class="size-title">

            사이즈 선택

            </div>


            <div class="sizes">


            ${
            sizes.map(size=>`

            <button 
            class="size-btn"
            onclick="selectSize('${size}')">

            ${size}

            </button>

            `).join("")
            }


            </div>





            <div class="description">

            ${productData.description || ""}

            </div>



        </div>



    </div>



    <div class="bottom">


        <button 
        class="cart-btn"
        onclick="addCart()">

        장바구니

        </button>



        <button 
        class="buy-btn"
        onclick="buyProduct()">

        구매하기

        </button>


    </div>


    `;


});







// 사이즈 선택

function selectSize(size){


    selectedSize = size;


    alert(size+" 선택");


}








// 장바구니

function addCart(){


    let cart = 
    JSON.parse(localStorage.getItem("cart"))
    || [];



    let item = {


        ...productData,


        selectedSize:selectedSize


    };



    cart.push(item);



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    alert("장바구니 추가 완료");


}







// 구매

function buyProduct(){


    if(!selectedSize && productData.size){


        alert("사이즈를 선택해주세요");

        return;

    }



    if(productData.link){


        location.href =
        productData.link;


    }

    else{


        alert("구매 링크가 없습니다");


    }


}

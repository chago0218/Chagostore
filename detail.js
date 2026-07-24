const detail = document.querySelector("#detail");


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



    productData = {

        id: doc.id,

        ...doc.data()

    };





    let sizes = productData.size
    ? productData.size.split(",")
    : [];






    detail.innerHTML = `


    <div class="detail">


        <img 
        class="product-image"
        src="${productData.image || 
        'https://via.placeholder.com/500'}">





        <div class="info">



            <div class="brand">

            ${productData.brand || ""}

            </div>





            <h1 class="name">

            ${productData.name}

            </h1>





            <div class="price">

            ${productData.price}원

            </div>






            <div class="size-title">

            사이즈 선택

            </div>





            <div class="sizes">


            ${
            sizes.map((size)=>`

            <button 
            class="size-btn"
            onclick="selectSize('${size}',this)">

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

function selectSize(size,button){


    selectedSize = size;



    document.querySelectorAll(".size-btn")

    .forEach((btn)=>{


        btn.style.background="white";

        btn.style.color="black";


    });




    button.style.background="black";

    button.style.color="white";


}











// 장바구니 추가

function addCart(){


    let cart =

    JSON.parse(localStorage.getItem("cart"))

    || [];





    let exist = cart.find((item)=>{


        return item.id === productData.id

        &&

        item.selectedSize === selectedSize;


    });





    if(exist){


        exist.count =
        (exist.count || 1)+1;


    }

    else{


        cart.push({


            ...productData,


            selectedSize:selectedSize,


            count:1



        });


    }






    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );




    alert("장바구니에 추가되었습니다");


}











// 구매

function buyProduct(){



    if(productData.size && !selectedSize){


        alert("사이즈를 선택해주세요");


        return;


    }




    if(!productData.link){


        alert("구매 링크가 없습니다");


        return;


    }





    createOrder({


        ...productData,


        selectedSize:selectedSize


    });



}

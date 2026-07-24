const cartProducts = document.querySelector("#cartProducts");
const total = document.querySelector("#total");


let cart = JSON.parse(localStorage.getItem("cart")) || [];





function showCart(){


    cartProducts.innerHTML = "";


    let sum = 0;



    cart.forEach((item,index)=>{


        let price = Number(item.price);


        let count = item.count || 1;


        sum += price * count;



        cartProducts.innerHTML += `


        <div class="card">


            <img src="${item.image || 
            'https://via.placeholder.com/300'}">



            <div class="info">


                <h3>

                ${item.name}

                </h3>



                <div class="price">

                ${price * count}원

                </div>



                <p>

                사이즈:
                ${item.selectedSize || ""}

                </p>




                <button onclick="changeCount(${index},-1)">
                -
                </button>


                <span>

                ${count}

                </span>


                <button onclick="changeCount(${index},1)">
                +
                </button>




                <button class="buy"
                onclick="removeCart(${index})">

                삭제

                </button>



            </div>


        </div>


        `;


    });



    total.innerHTML = sum;



}





// 수량 변경

function changeCount(index,value){


    cart[index].count =
    (cart[index].count || 1) + value;



    if(cart[index].count <= 0){

        cart[index].count = 1;

    }



    saveCart();

}





// 삭제

function removeCart(index){


    cart.splice(index,1);


    saveCart();


}




// 저장

function saveCart(){


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    showCart();


}





// 구매

function buyAll(){


    if(cart.length === 0){

        alert("장바구니가 비어있습니다");

        return;

    }


    alert("구매 페이지로 이동합니다");


}





showCart();

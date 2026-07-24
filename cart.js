const cartProducts = document.querySelector("#cartProducts");
const total = document.querySelector("#total");


let cart = JSON.parse(localStorage.getItem("cart")) || [];





function showCart(){


    cartProducts.innerHTML = "";


    let sum = 0;



    if(cart.length === 0){


        cartProducts.innerHTML = `

        <p>
        장바구니가 비어있습니다.
        </p>

        `;


        total.innerHTML = 0;


        return;


    }






    cart.forEach((item,index)=>{


        let count = item.count || 1;


        let price = Number(item.price);


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









function changeCount(index,value){


    cart[index].count =

    (cart[index].count || 1)+value;



    if(cart[index].count < 1){


        cart[index].count = 1;


    }



    saveCart();


}









function removeCart(index){


    cart.splice(index,1);


    saveCart();


}









function saveCart(){


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    showCart();


}









function buyAll(){



    if(cart.length === 0){


        alert("장바구니가 비어있습니다");


        return;


    }





    let link = cart[0].link;



    if(!link){


        alert("구매 링크가 없습니다");


        return;


    }






    let result = confirm(

    "구매 페이지로 이동하시겠습니까?"

    );




    if(result){


        location.href = link;


    }



}








showCart();

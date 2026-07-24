const cartList = document.getElementById("cartList");


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



if(cart.length === 0){

    cartList.innerHTML = `
    <p>
    장바구니가 비어있습니다.
    </p>
    `;

}else{


cart.forEach(id=>{


db.collection("products")
.doc(id)
.get()
.then(doc=>{


let p = doc.data();



cartList.innerHTML += `

<div class="product">


<img src="${p.image || 'https://via.placeholder.com/300'}">


<div class="product-info">

<h3>
${p.name}
</h3>


<p>
${p.price}원
</p>


</div>


</div>


`;


});


});


}



document
.getElementById("orderBtn")
.onclick=()=>{


alert("주문 기능 연결 예정");


};

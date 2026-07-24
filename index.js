const productsArea = document.getElementById("products");


let products = [];



db.collection("products")
.get()
.then(snapshot=>{


    snapshot.forEach(doc=>{

        products.push({
            id:doc.id,
            ...doc.data()
        });


    });


    renderProducts(products);


});





function renderProducts(list){


productsArea.innerHTML="";


list.forEach(product=>{


productsArea.innerHTML += `

<div class="product">


<img src="${product.image || 'https://via.placeholder.com/300'}">


<div class="product-info">


<h3>
${product.name}
</h3>


<div class="price">
${product.price}원
</div>



<button onclick="addCart('${product.id}')">
장바구니 담기
</button>


<button onclick="location.href='detail.html?id=${product.id}'">
상세보기
</button>


</div>


</div>

`;


});


}




function addCart(id){


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



cart.push(id);



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("장바구니에 담았습니다");


}

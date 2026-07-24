const adminProducts = document.querySelector("#adminProducts");


// 상품 추가

function addProduct(){


const product = {

image: document.querySelector("#image").value,

name: document.querySelector("#name").value,

price: document.querySelector("#price").value,

brand: document.querySelector("#brand").value,

description: document.querySelector("#description").value,

size: document.querySelector("#size").value,

link: document.querySelector("#link").value


};



db.collection("products")
.add(product)
.then(()=>{

alert("상품 등록 완료");

location.reload();

});


}




// 상품 목록

db.collection("products")
.get()
.then((snapshot)=>{


snapshot.forEach((doc)=>{


const data = doc.data();


adminProducts.innerHTML += `


<div class="adminCard">


<img src="${data.image}">


<h3>${data.name}</h3>


<p>${data.price}원</p>


<button onclick="deleteProduct('${doc.id}')">
삭제
</button>


</div>


`;


});


});




// 삭제

function deleteProduct(id){


db.collection("products")
.doc(id)
.delete()
.then(()=>{


alert("삭제 완료");

location.reload();


});


}

const adminProducts = document.querySelector("#adminProducts");

let editId = null;



// 상품 추가 / 수정

function addProduct(){


const data = {


image:
document.querySelector("#image").value,


name:
document.querySelector("#name").value,


price:
document.querySelector("#price").value,


brand:
document.querySelector("#brand").value,


description:
document.querySelector("#description").value,


size:
document.querySelector("#size").value,


link:
document.querySelector("#link").value



};





if(editId){


db.collection("products")
.doc(editId)
.update(data)
.then(()=>{


alert("수정 완료");


editId=null;


location.reload();


});


}

else{


db.collection("products")
.add(data)
.then(()=>{


alert("등록 완료");


location.reload();


});


}



}







// 상품 불러오기


db.collection("products")
.get()
.then((snapshot)=>{


adminProducts.innerHTML="";



snapshot.forEach((doc)=>{


let data=doc.data();



adminProducts.innerHTML += `



<div class="adminCard">


<img src="${data.image}">


<h3>${data.name}</h3>


<p>${data.price}원</p>


<p>${data.brand || ""}</p>



<button onclick="editProduct('${doc.id}')">

수정

</button>



<button onclick="deleteProduct('${doc.id}')">

삭제

</button>



</div>


`;



});



});







// 수정 불러오기


function editProduct(id){


db.collection("products")
.doc(id)
.get()
.then((doc)=>{


let data=doc.data();



document.querySelector("#image").value=data.image || "";

document.querySelector("#name").value=data.name || "";

document.querySelector("#price").value=data.price || "";

document.querySelector("#brand").value=data.brand || "";

document.querySelector("#description").value=data.description || "";

document.querySelector("#size").value=data.size || "";

document.querySelector("#link").value=data.link || "";



editId=id;



window.scrollTo(0,0);



});


}








// 삭제


function deleteProduct(id){


if(confirm("삭제할까요?")){


db.collection("products")
.doc(id)
.delete()
.then(()=>{


alert("삭제 완료");


location.reload();



});


}



}

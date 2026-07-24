const cartProducts =
document.querySelector("#cartProducts");


const total =
document.querySelector("#total");



let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];




let sum = 0;




function showCart(){


cartProducts.innerHTML="";


sum=0;



cart.forEach((item,index)=>{


sum += Number(item.price);



cartProducts.innerHTML += `


<div class="card">


<img src="${item.image || 
'https://via.placeholder.com/300'}">



<div class="info">


<h3>
${item.name}
</h3>



<div class="price">

${item.price}원

</div>



<button class="buy"
onclick="removeCart(${index})">

삭제

</button>



</div>


</div>


`;


});



total.innerHTML=sum;


}




function removeCart(index){


cart.splice(index,1);



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



showCart();


}





function buyAll(){


if(cart.length===0){

alert("장바구니가 비어있습니다");

return;

}



alert("구매 페이지로 이동합니다");


// 스마트스토어 링크 연결 예정


}






showCart();

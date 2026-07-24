const button = document.querySelector("button");

button.addEventListener("click", function(){

    const name = document.querySelectorAll("input")[1].value;
    const price = Number(document.querySelectorAll("input")[2].value);
    const description = document.querySelector("textarea").value;
    const size = document.querySelectorAll("input")[3].value;

    db.collection("products").add({
        name: name,
        price: price,
        description: description,
        size: size
    })
    .then(()=>{
        alert("상품 등록 완료");
    })
    .catch((error)=>{
        alert("오류: " + error);
    });

});

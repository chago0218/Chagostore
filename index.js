const products = document.querySelector(".products");

db.collection("products").get().then((snapshot)=>{

    snapshot.forEach((doc)=>{

        const data = doc.data();

        products.innerHTML += `
        <div class="card">

            <img src="${data.image || 'https://via.placeholder.com/300'}">

            <div class="info">

                <h3>${data.name}</h3>

                <div class="price">
                    ${data.price}원
                </div>

                <p>
                    ${data.description}
                </p>

                <p>
                    사이즈: ${data.size}
                </p>

                <button class="buy">
                    구매하기
                </button>

            </div>

        </div>
        `;

    });

});

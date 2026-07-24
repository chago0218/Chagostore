function createOrder(product){


    auth.onAuthStateChanged((user)=>{


        if(!user){


            alert("로그인이 필요합니다");

            location.href="login.html";

            return;


        }




        db.collection("orders")
        .add({


            user:user.email,


            productId:product.id,


            name:product.name,


            price:product.price,


            size:product.selectedSize || "",


            image:product.image || "",


            link:product.link || "",


            status:"주문접수",


            createdAt:new Date()



        })

        .then(()=>{


            alert("주문이 접수되었습니다");


            if(product.link){

                location.href=product.link;

            }


        });



    });


}

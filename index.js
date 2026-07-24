db.collection("products").onSnapshot((snapshot)=>{

    snapshot.forEach((doc)=>{

        const product = doc.data();

        console.log(product);

    });

});

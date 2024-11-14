

const getproducts =async ()=>{
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
   return data;
}

const displayproducts =async ()=>{

    const data = await getproducts();

    const result = data.products.map( (product)=>{
        return `
         <div class = " product ">
        <img src="${product.thumbnail}" alt="${product.description}" />
        <h3>${product.title}</h3>
        <span>${product.price}</span>
        
        </div>
        `
    }).join(' ');

    document.querySelector(".categoryDetails .row ").innerHTML += result;

}

displayproducts();

const getcategories = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);

    return data;



}

const displaycategories = async () => {

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {

        const categories = await getcategories();

        const result = categories.map((category) => {
            return `<div class = 'category'>
            
            <a href='categoryDetails.html?category=${category}'>${category}</a>
            
            </div>`


        }).join(' ');


        document.querySelector(".categories .row").innerHTML += result;

    } catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p> error loading categories</p>";
    }

    finally {
        loader.classList.remove("active");

    }



};


const getproducts = async (page) => {

    const skip = (page - 1) * 30;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return data;
}

const displayproducts = async (page = 1) => {

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {

        const data = await getproducts(page);
        const numberOfPages = Math.ceil(data.total / 30);

        const result = data.products.map((product) => {
            return `
         <div class = ' product '>

         <img src='${product.thumbnail}' alt='${product.description}' class = "img"/>
        <h3>${product.title}</h3>
        
        </div>
        `
        }).join(' ');

        document.querySelector(".products .row ").innerHTML = result;

        let paginationLink = ``
        if (page == 1) {
            paginationLink += `<li class="page-item"><button class="page-link" disabled >&laquo;</button></li>`;

        } else {
            paginationLink += `<li class="page-item"><button onclick = displayproducts('${page - 1}') class="page-link" >&laquo;</button></li>`;
        }



        for (let i = 1; i <= numberOfPages; i++) {

            paginationLink += `<li class="page-item ${i == page ? 'active' : ''} "> <button onclick = displayproducts('${i}') class="page-link">${i}</button></li>`;

        }

        if (page == numberOfPages) {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
        } else {
            paginationLink += `<li class="page-item"><button onclick = displayproducts('${parseInt(page) + 1}') class="page-link" >&raquo;</button></li>`;
        }



        document.querySelector(".pagination").innerHTML = paginationLink;


    } catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p> error loading products </p>";
    }

    finally {
        loader.classList.remove("active");

    }

    modal();

};




displayproducts();
displaycategories();

window.onscroll = function () {
    const nav = document.querySelector(".header");
    const part = document.querySelector(".products")


    if (window.scrollY > part.offsetTop) {
        nav.classList.add("scrollnav");
    }

    else {
        nav.classList.remove("scrollnav");

    }
}

const countDown = () => {
    const countDownDate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / 86400000);
    const houres = Math.floor((distance % 86400000) / 3600000);// خون جبنا كم الباقي بعد ما طلعنا الايام (بالميلي سكند)
    const minites = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.querySelector("#days").innerHTML = days;
    document.querySelector("#houres").innerHTML = houres;
    document.querySelector("#minites").innerHTML = minites;
    document.querySelector("#seconds").innerHTML = seconds;

}

setInterval(() => {
    countDown();
}, 1000)

function modal() {
    const modal = document.querySelector(".modal");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const closeBtn = document.querySelector(".close-btn");
    const images = Array.from(document.querySelectorAll(".img"));
    let currentindex = 0;

    images.forEach(function (img) {//نفس الماب ونفس الفلتر ونفس الفايند بوخد منا فنكشن

        img.addEventListener("click", function (e) {
            modal.classList.remove('d-none');// this modal class is in html page
            modal.querySelector("img").setAttribute("src", e.target.src);

            const currentimage = e.target;
            currentindex = images.indexOf(currentimage);
            console.log(currentindex);

        })

    })

    // close button

    closeBtn.addEventListener("click", function () {

        modal.classList.add('d-none');

    });

    // right button 

    rightBtn.addEventListener("click", function () {

        currentindex++;
        if(currentindex >= images.length){
            currentindex = 0;
        }
        const nextSrc = images[currentindex].src;
        modal.querySelector("img").setAttribute("src",nextSrc);



    })

    //left button

    leftBtn.addEventListener("click",function(){
        currentindex--;
        if(currentindex < 0){
            currentindex = images.length;
        }

        const preSrc = images[currentindex].src;
        modal.querySelector('img').setAttribute("src",preSrc);

    })

    document.addEventListener("keydown",function(e){

        if(e.code == 'ArrowRight'){

                currentindex++;
                if(currentindex >= images.length){
                    currentindex = 0;
                }
                const nextSrc = images[currentindex].src;
                modal.querySelector("img").setAttribute("src",nextSrc);
        }
        else if(e.code == 'ArrowLeft'){

            currentindex--;
            if(currentindex < 0){
                currentindex = images.length;
            }
    
            const preSrc = images[currentindex].src;
            modal.querySelector('img').setAttribute("src",preSrc);

        }

        else if(e.code == 'Escape'){
            modal.classList.add('d-none');
        }

    })

    



}


var counter = 0; 
function butononclikc(el){
    counter++;
    el.innerHTML = "Дабавлен в корзину:" + counter; + "шт";

    el.style.background ="red";
    el.style.color ="white";

    setTimeout(() =>{
        el.style.background = "";
        el.style.color ="";
        el.innerHTML = "В корзину"
    }, 2000)
}


var cart = []; // Массив для хранения товаров

document.querySelectorAll(".money").forEach((button) => {
    button.addEventListener("click", function () {
        var product = this.closest(".product");
        var title = product.querySelector("h3").innerText;
        var price = parseInt(product.querySelector(".price").innerText.replace(" ₽", ""));
        
        // Проверяем, есть ли товар уже в корзине
        var item = cart.find(item => item.title === title);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        updateCart();
        this.innerText = "Добавлено!";
        setTimeout(() => { this.innerText = "В корзину"; }, 1500);
    });
});

// Функция обновления корзины
function updateCart() {
    var cartList = document.getElementById("cart-items");
    var cartCount = document.getElementById("cart-count");
    var cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = ""; // Очищаем список
    var total = 0;
    
    cart.forEach(item => {
        var li = document.createElement("li");
        li.innerHTML = `${item.title} x${item.quantity} - ${item.price * item.quantity} ₽
                        <button onclick="removeFromCart('${item.title}')">❌</button>`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerText = `Общая сумма: ${total} ₽`;
}

// Функция удаления товара из корзины
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCart();
}

// Очистка корзины
document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];
    updateCart();
});

// Открытие и закрытие корзины
document.getElementById("cart-button").addEventListener("click", function (event) {
    event.stopPropagation(); // Останавливаем всплытие, чтобы не закрывать корзину сразу
    document.getElementById("cart").classList.toggle("show");
});

// Закрытие корзины при клике вне её области
document.addEventListener("click", function (event) {
    var cart = document.getElementById("cart");
    var cartButton = document.getElementById("cart-button");

    // Если клик был вне корзины и не на кнопке, закрываем её
    if (!cart.contains(event.target) && event.target !== cartButton) {
        cart.classList.remove("show");
    }
});





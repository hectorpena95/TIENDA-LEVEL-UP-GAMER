// --- Lógica del Carrito de Compras ---
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en el almacenamiento local del navegador
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para agregar un producto al carrito
const agregarProductoAlCarrito = (productoId) => {
    const productoEnCarrito = carrito.find(item => item.id === productoId);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(p => p.id === productoId);
        if (producto) {
            carrito.push({ ...producto, cantidad: 1 });
        }
    }
    guardarCarritoEnLocalStorage();
};

// Función para eliminar un producto del carrito
const eliminarProductoDelCarrito = (productoId) => {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarritoEnLocalStorage();
};

// Función para calcular el total del carrito
const calcularTotalCarrito = () => {
    return carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
};

// --- Lógica para la página del Carrito (carrito.html) ---

// Función para renderizar los productos en la página del carrito
const renderizarCarrito = () => {
    const contenedorCarrito = document.getElementById('items-carrito');
    const totalElemento = document.getElementById('total-carrito');
    if (!contenedorCarrito || !totalElemento) return;

    contenedorCarrito.innerHTML = ''; // Limpiar el contenedor

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        totalElemento.textContent = '$0 CLP';
        return;
    }

    carrito.forEach(item => {
        const elementoCarrito = document.createElement('div');
        elementoCarrito.classList.add('item-carrito');
        elementoCarrito.innerHTML = `
            <img src="../src/assets/img/products/${item.image}" alt="${item.name}">
            <div class="info-item">
                <h4>${item.name}</h4>
                <p class="precio-item">${formatPrice(item.price)}</p>
                <div class="controles-item">
                    <button class="boton-cantidad boton-disminuir" data-id="${item.id}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="boton-cantidad boton-aumentar" data-id="${item.id}">+</button>
                </div>
            </div>
            <p class="subtotal-item">${formatPrice(item.price * item.cantidad)}</p>
            <button class="boton-eliminar-item" data-id="${item.id}">X</button>
        `;
        contenedorCarrito.appendChild(elementoCarrito);
    });

    totalElemento.textContent = formatPrice(calcularTotalCarrito());
};

// Eventos para la página del carrito
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('pagina-carrito')) {
        renderizarCarrito();

        // Manejar clics para aumentar/disminuir cantidad o eliminar
        document.getElementById('items-carrito').addEventListener('click', (e) => {
            const target = e.target;
            const productoId = target.dataset.id;

            if (target.classList.contains('boton-aumentar')) {
                agregarProductoAlCarrito(productoId);
                renderizarCarrito(); // Volver a renderizar para actualizar
            }

            if (target.classList.contains('boton-disminuir')) {
                const producto = carrito.find(item => item.id === productoId);
                if (producto && producto.cantidad > 1) {
                    producto.cantidad--;
                    guardarCarritoEnLocalStorage();
                    renderizarCarrito();
                } else {
                    eliminarProductoDelCarrito(productoId);
                    renderizarCarrito();
                }
            }
            
            if (target.classList.contains('boton-eliminar-item')) {
                eliminarProductoDelCarrito(productoId);
                renderizarCarrito();
            }
        });
    }
});
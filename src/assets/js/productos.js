// Base de datos de productos
const productos = [
    {
        id: 'JM001',
        name: 'Catan',
        category: 'juegos-de-mesa',
        price: 29990,
        image: 'catan.jpg',
        description: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.'
    },
    {
        id: 'JM002',
        name: 'Carcassonne',
        category: 'juegos-de-mesa',
        price: 24990,
        image: 'carcassonne.jpg',
        description: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.'
    },
    {
        id: 'AC001',
        name: 'Controlador Inalámbrico Xbox Series X',
        category: 'accesorios',
        price: 59990,
        image: 'xbox-controller.jpg',
        description: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.'
    },
    {
        id: 'AC002',
        name: 'Auriculares Gamer HyperX Cloud II',
        category: 'accesorios',
        price: 79990,
        image: 'hyperx-cloud.jpg',
        description: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.'
    },
    {
        id: 'CO001',
        name: 'PlayStation 5',
        category: 'consolas',
        price: 549990,
        image: 'ps5.jpg',
        description: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.'
    },
    {
        id: 'CG001',
        name: 'PC Gamer ASUS ROG Strix',
        category: 'computadores-gamers',
        price: 1299990,
        image: 'asus-rog.jpg',
        description: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.'
    },
    {
        id: 'SG001',
        name: 'Silla Gamer Secretlab Titan',
        category: 'sillas-gamers',
        price: 349990,
        image: 'secretlab-titan.webp',
        description: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.'
    },
    {
        id: 'MS001',
        name: 'Mouse Gamer Logitech G502 HERO',
        category: 'mouse',
        price: 49990,
        image: 'logitech-g502.jpg',
        description: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.'
    },
    {
        id: 'MP001',
        name: 'Mousepad Razer Goliathus Extended Chroma',
        category: 'mousepad',
        price: 29990,
        image: 'razer-mousepad.jpg',
        description: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.'
    },
    {
        id: 'PP001',
        name: 'Polera Gamer Personalizada "Level-Up"',
        category: 'poleras-personalizadas',
        price: 14990,
        image: 'polera-levelup.jpg',
        description: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.'
    }
];

// Función para formatear el precio a CLP
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

// --- Lógica de Filtros y Renderización del Catálogo ---
const aplicarFiltros = () => {
    const rangoPrecio = document.getElementById('rango-precio');
    const categoriaActiva = document.querySelector('#lista-categorias li a.activo');
    const categoriaSeleccionada = categoriaActiva ? categoriaActiva.dataset.categoria : 'all';
    const precioMaximo = parseInt(rangoPrecio.value);

    let productosFiltrados = productos.filter(producto => {
        const coincideCategoria = categoriaSeleccionada === 'all' || producto.category === categoriaSeleccionada;
        const coincidePrecio = producto.price <= precioMaximo;
        return coincideCategoria && coincidePrecio;
    });
    renderizarProductosEnCatalogo(productosFiltrados);
};

const renderizarProductosEnCatalogo = (productosAMostrar) => {
    const cuadriculaProductos = document.getElementById('cuadricula-productos');
    if (!cuadriculaProductos) return;
    cuadriculaProductos.innerHTML = '';
    if (productosAMostrar.length === 0) {
        cuadriculaProductos.innerHTML = '<p class="mensaje-vacio">No se encontraron productos que coincidan con los filtros.</p>';
        return;
    }
    productosAMostrar.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('tarjeta-producto');
        tarjetaProducto.innerHTML = `
            <img src="../src/assets/img/${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p class="categoria-producto">${producto.category}</p>
            <p class="precio-producto">${formatPrice(producto.price)}</p>
            <a href="detalle-producto.html?id=${producto.id}" class="boton-cta">Ver Detalle</a>
        `;
        cuadriculaProductos.appendChild(tarjetaProducto);
    });
};

const configurarFiltros = () => {
    const listaCategorias = document.getElementById('lista-categorias');
    if (listaCategorias) {
        listaCategorias.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.tagName === 'A') {
                document.querySelectorAll('#lista-categorias li a').forEach(a => a.classList.remove('activo'));
                target.classList.add('activo');
                aplicarFiltros();
            }
        });
    }
    const rangoPrecio = document.getElementById('rango-precio');
    const valorPrecio = document.getElementById('valor-precio');
    if (rangoPrecio && valorPrecio) {
        rangoPrecio.addEventListener('input', () => {
            valorPrecio.textContent = formatPrice(rangoPrecio.value);
            aplicarFiltros();
        });
    }
};

// --- Lógica para la página de inicio (index.html) ---
const renderizarProductosEnInicio = () => {
    const cuadriculaProductosInicio = document.querySelector('.cuadricula-productos');
    if (cuadriculaProductosInicio) {
        renderizarProductosEnCatalogo(productos.slice(0, 4));
    }
};

// --- Lógica para la página de detalles del producto ---
const renderizarDetalleProducto = () => {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) {
        console.error('Producto no encontrado');
        document.querySelector('main').innerHTML = `
            <div style="text-align: center; padding: 5rem;">
                <h1>Producto no disponible</h1>
                <p>El producto que buscas no existe o ha sido eliminado.</p>
                <a href="catalogo.html" class="boton-cta">Volver al Catálogo</a>
            </div>
        `;
        return;
    }
    document.getElementById('nombre-producto').textContent = producto.name;
    document.getElementById('precio-producto').textContent = formatPrice(producto.price);
    document.getElementById('descripcion-producto').textContent = producto.description;
    const imagenProducto = document.querySelector('.imagen-producto img');
    imagenProducto.src = `../src/assets/img/${producto.image}`;
    imagenProducto.alt = producto.name;
    // Opcional: Renderizar productos relacionados
    const productosRelacionados = productos.filter(p => p.category === producto.category && p.id !== producto.id).slice(0, 4);
    if (productosRelacionados.length > 0) {
        const contenedorRelacionados = document.querySelector('.productos-relacionados .cuadricula-productos');
        if (contenedorRelacionados) {
            contenedorRelacionados.innerHTML = '';
            productosRelacionados.forEach(p => {
                const tarjetaRelacionada = document.createElement('div');
                tarjetaRelacionada.classList.add('tarjeta-producto');
                tarjetaRelacionada.innerHTML = `
                    <img src="../src/assets/img/${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="precio-producto">${formatPrice(p.price)}</p>
                    <a href="detalle-producto.html?id=${p.id}" class="boton-cta">Ver Detalle</a>
                `;
                contenedorRelacionados.appendChild(tarjetaRelacionada);
            });
        }
    } else {
        document.querySelector('.productos-relacionados').style.display = 'none';
    }
};

// --- Lógica para agregar un producto al carrito desde la página de detalle ---
const configurarBotonAgregarAlCarrito = () => {
    const botonAgregar = document.querySelector('.boton-agregar-carrito');
    if (botonAgregar) {
        botonAgregar.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search);
            const idProducto = params.get('id');
            if (idProducto) {
                agregarProductoAlCarrito(idProducto);
                alert('¡Producto agregado al carrito!');
            }
        });
    }
};

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('pagina-catalogo')) {
        renderizarProductosEnCatalogo(productos);
        configurarFiltros();
    } else if (document.body.classList.contains('pagina-detalle-producto')) {
        renderizarDetalleProducto();
        configurarBotonAgregarAlCarrito();
    } else {
        renderizarProductosEnInicio();
    }
});
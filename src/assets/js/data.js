// Archivo: src/assets/js/data.js

const productos = [
    {
        id: 'JM001',
        name: 'Catan',
        category: 'juegos-de-mesa',
        price: 29990,
        image: 'catan.jpg',
        description: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.'
    },
    // ... (El resto de tus productos aquí) ...
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};
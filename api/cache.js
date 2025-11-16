// Cache compartilhado para as funções serverless
// Em produção, substitua por Redis ou banco de dados
const cache = new Map();

function set(key, value, ttl = 3600000) {
    cache.set(key, value);
    setTimeout(() => cache.delete(key), ttl);
}

function get(key) {
    return cache.get(key);
}

function has(key) {
    return cache.has(key);
}

function size() {
    return cache.size;
}

module.exports = { set, get, has, size };


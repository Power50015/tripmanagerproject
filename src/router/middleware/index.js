export default function (next, store, middleware) {
    if (middleware == "user") {
        !store.state.isLogin ? next("/") : next();
    } else if (middleware == "guest") {
        store.state.isLogin ? next("/calculator") : next();
    }
}
    
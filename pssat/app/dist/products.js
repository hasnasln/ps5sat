import { createNav, fetchNavData } from './main.js';
import { createFooter, fetchFooterData } from './main.js';
import { createProducts, fetchProductsData } from './main.js';
document.addEventListener("DOMContentLoaded", async () => {
    const navData = await fetchNavData();
    const footerData = await fetchFooterData();
    const productsData = await fetchProductsData();
    createNav(navData);
    createProducts(productsData);
    createFooter(footerData);
});

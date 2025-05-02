import { createNav, fetchNavData } from './main.js';
import { createFooter, fetchFooterData } from './main.js';
function getPathParamFromEnd() {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
}
async function fetchProductPreview(productId) {
    try {
        const response = await fetch(`http://192.168.1.101:3000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching product preview:', error);
        return null;
    }
}
function handleCall() {
    window.location.href = "tel:+905555555555";
}
function handleContactWhatsap() {
    window.location.href = "https://api.whatsapp.com/send?phone=905555555555&text=Merhaba";
}
function createProductPreview(data) {
    const container = document.getElementById("product-preview");
    if (!container) {
        console.error("Product preview container not found");
        return;
    }
    // Temizle (önceki içerikler varsa)
    container.innerHTML = "";
    // Ana kapsayıcı stilleri
    container.className =
        "max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row items-center gap-8 transition-all";
    // Görsel
    const image = document.createElement("img");
    image.src = data.image;
    image.alt = data.name;
    image.className =
        "w-full md:w-1/2 h-auto rounded-2xl object-cover shadow-md transition-transform duration-300 hover:scale-105";
    // Bilgiler bölümü
    const info = document.createElement("div");
    info.className = "flex-1 flex flex-col justify-center";
    const title = document.createElement("h1");
    title.textContent = data.name;
    title.className =
        "text-4xl font-extrabold text-gray-900 mb-4 tracking-tight";
    const description = document.createElement("p");
    description.textContent = data.text;
    description.className = "text-gray-700 text-lg leading-relaxed mb-6";
    // Butonlar
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex flex-wrap gap-4";
    const callButton = document.createElement("button");
    callButton.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h2l3.6 7.59a1 1 0 00.77.41l6.4.34a1 1 0 00.94-.7l1.8-6.04A1 1 0 0018.5 5H5.21" />
		</svg>
		Ara
	`;
    callButton.className =
        "flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-300";
    callButton.addEventListener("click", handleCall);
    const whatsappButton = document.createElement("button");
    whatsappButton.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
			<path d="M12.001 2.003C6.478 2.003 2 6.481 2 12.003c0 1.954.505 3.783 1.387 5.384L2 22l4.738-1.363A9.937 9.937 0 0012 22c5.523 0 10.001-4.478 10.001-9.997C22.001 6.481 17.523 2.003 12.001 2.003zm5.334 14.133c-.225.625-1.316 1.203-1.819 1.277-.479.07-1.1.1-1.772-.11-.407-.126-.932-.305-1.6-.598-2.813-1.217-4.646-4.185-4.787-4.386-.14-.199-1.146-1.526-1.146-2.912 0-1.385.724-2.07.98-2.35.256-.28.558-.35.744-.35.187 0 .372.002.535.01.173.007.41-.066.643.49.233.555.788 1.922.856 2.06.07.14.116.3.023.48-.093.178-.14.28-.28.433-.14.153-.296.34-.424.456-.14.126-.29.264-.125.52.163.257.726 1.2 1.562 1.942 1.075.963 1.976 1.263 2.233 1.403.257.14.404.117.554-.07.14-.186.642-.748.814-1.005.17-.257.34-.213.567-.126.225.087 1.428.672 1.67.794.245.12.41.187.472.29.06.105.06.605-.166 1.23z"/>
		</svg>
		WhatsApp
	`;
    whatsappButton.className =
        "flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg transition duration-300";
    whatsappButton.addEventListener("click", handleContactWhatsap);
    buttonContainer.append(callButton, whatsappButton);
    info.append(title, description, buttonContainer);
    container.append(image, info);
}
document.addEventListener('DOMContentLoaded', async () => {
    const body = document.body;
    body.className = "min-h-screen flex flex-col";
    const navData = await fetchNavData();
    if (!navData)
        return;
    createNav(navData);
    // console.log(navData);
    const hasan = document.getElementById("product-preview-container");
    if (!hasan) {
        console.error("Product preview container not found");
        return;
    }
    hasan.className = "flex-1 flex items-center justify-center bg-gray-100 p-6";
    const productId = getPathParamFromEnd();
    // console.log(productId);
    const data = await fetchProductPreview(Number(productId));
    // console.log(data);
    createProductPreview(data);
    const footerData = await fetchFooterData();
    // console.log(footerData);
    createFooter(footerData);
});

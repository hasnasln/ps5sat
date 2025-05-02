export function createNav(nav_data) {
    const nav = document.getElementById("nav");
    nav.innerHTML = "";
    // Main navigation container
    nav.classList.add("flex", // Flex layout
    "items-center", // Vertically center the items
    "justify-center", // Center the items
    "bg-white", // Clean white background
    "shadow-md", // Subtle shadow
    "py-3", // Balanced padding
    "px-8", // Horizontal padding
    "rounded-none", // Sharp edges for modern look
    "sticky", // Sticky positioning
    "top-0", // Stick to top
    "z-50", // Ensure it stays above other content
    "border-b", // Thin border bottom
    "border-gray-100" // Light border color
    );
    // Nav items container
    const navItemsContainer = document.createElement("div");
    navItemsContainer.classList.add("flex", "space-x-1", "items-center");
    // Loop through the navigation items
    for (const [key, value] of Object.entries(nav_data.navigation)) {
        const navItem = document.createElement("li");
        navItem.classList.add("relative", // For hover effects
        "group", // For group hover effects
        "list-none" // Remove bullet points
        );
        // Adding the anchor link inside each nav item
        navItem.innerHTML = `
      <a class="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-sm uppercase tracking-wider flex items-center" href="${value}">
        ${key}
        <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
      </a>
    `;
        // Append the nav item to the container
        navItemsContainer.appendChild(navItem);
    }
    // Append nav items to main nav
    nav.appendChild(navItemsContainer);
}
let currentSlideIndex = 0;
let totalSlides = 0;
let slideInterval;
function createSlide(slide_data) {
    const slideContainer = document.getElementById("slide");
    slideContainer.innerHTML = "";
    slideContainer.classList.add("relative", "w-full", "mt-0", "overflow-hidden"); // mt-16 navbar yüksekliği kadar boşluk bırakır
    const slideWrapper = document.createElement("div");
    slideWrapper.classList.add("flex", "transition-transform", "duration-500", "ease-in-out", "h-[400px]");
    totalSlides = slide_data.slides.length;
    // Add slides
    slide_data.slides.forEach((slideItem, index) => {
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("slide-item", "w-full", "h-full", "flex-shrink-0", "flex", "flex-col", "items-center", "justify-center", "bg-contain", // bg-cover yerine bg-contain
        "bg-center", "bg-no-repeat" // boşluk oluşmaması için tekrar etmesini engeller
        );
        slideDiv.style.backgroundImage = `url(${slideItem.image})`;
        slideDiv.innerHTML = `
      <div class="bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 class="text-3xl font-bold text-white mb-4">${slideItem.title}</h2>
        <p class="text-lg text-white text-center max-w-2xl">${slideItem.description}</p>
      </div>
    `;
        slideWrapper.appendChild(slideDiv);
    });
    slideContainer.appendChild(slideWrapper);
    // Show first slide immediately
    updateSlidePosition(slideWrapper);
    // Start the slide transition (5 seconds)
    slideInterval = window.setInterval(() => {
        changeSlide(slideWrapper);
    }, 5000);
}
function changeSlide(wrapper) {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlidePosition(wrapper);
}
function updateSlidePosition(wrapper) {
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}
function createInfo(info_data) {
    const info = document.getElementById("info");
    info.innerHTML = "";
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("flex", // İçerikleri esnek kutuda yerleştir
    "flex-col", // Mobilde dikey yerleşim
    "md:flex-row", // Orta boyut ve üzeri için yatay yerleşim
    "items-center", // İçerikleri dikeyde ortala
    "justify-between", // Aralarında boşluk bırak
    "gap-8", // Elemanlar arasında boşluk (her boyutta geçerli)
    "p-4", // Mobilde iç boşluk
    "md:p-8", // Orta ve büyük ekranlarda daha fazla iç boşluk
    "w-full", // Genişlik varsayılan olarak %100
    "md:w-[90%]", // Orta boyut ve üzeri için %90 genişlik
    "lg:w-[70%]", // Büyük ekranlarda %70 genişlik
    "mx-auto" // Yatayda ortalamak için
    );
    // Yazı kısmı
    const textDiv = document.createElement("div");
    textDiv.classList.add("flex-1", // Genişlik esnek olsun
    "text-center", // Metni ortala
    "md:text-left" // Orta ve büyük ekranlarda sola hizala
    );
    textDiv.innerHTML = `
    <h2 class="text-2xl md:text-3xl font-bold mb-4">
      ${info_data.title}
    </h2>
    <p class="text-base md:text-lg">
      ${info_data.text}
    </p>
  `;
    // Görsel kısmı
    const image = document.createElement("img");
    image.src = info_data.image;
    image.alt = info_data.title;
    image.classList.add("w-full", // Mobilde %100 genişlik
    "md:w-1/2", // Orta ve büyük ekranlarda %50 genişlik
    "h-auto", // Oranını koruyarak yüksekliği ayarla
    "rounded-lg", // Köşeleri yumuşat
    "object-cover" // Görselin taşmasını engelle, oranı koru
    );
    infoDiv.appendChild(textDiv);
    infoDiv.appendChild(image);
    info.appendChild(infoDiv);
}
export function createProducts(prodacts_data) {
    const products = document.getElementById("products");
    products.innerHTML = "";
    // products div'ine grid ve düzenleme ekle
    products.classList.add("grid", "grid-cols-1", // küçük ekranda 1 kolon
    "sm:grid-cols-2", // orta ekranda 2 kolon
    "lg:grid-cols-4", // büyük ekranda 3 kolon  
    "gap-8", // ürünler arası boşluk
    "p-8", // kenarlardan boşluk
    "w-[80%]", // genel genişlik
    "mx-auto", // ortalama
    "justify-items-center" // 💥 yeni eklenen
    );
    for (const product of prodacts_data.products) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("bg-white", "rounded-xl", "shadow-lg", "overflow-hidden", "flex", "flex-col", "items-center", "p-6", "transition", "transform", "hover:scale-105", "hover:shadow-2xl", "cursor-pointer", "max-w-xs", // 💥 burayı ekliyoruz
        "mx-auto" // kartların ortalanması için
        );
        productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded-md">
      <h2 class="text-2xl font-bold mb-2 text-center">${product.name}</h2>
      <p class="text-gray-600 text-center">${product.description}</p>
    `;
        productDiv.addEventListener("click", () => {
            // Tıklanıldığında yeni sayfaya yönlendir
            window.location.href = `/product-rewiev/${product.id}`;
            console.log(`Ürün ID: ${product.id}`); // Konsola ürün ID'sini yazdır
        });
        products.appendChild(productDiv); // 💥 Burada ürün kartını products div'ine ekliyorsun!
    }
}
export function createFooter(footer_data) {
    const footer = document.getElementById("footer");
    footer.innerHTML = "";
    footer.classList.add("bg-blue-900", // Mavi arka plan
    "text-white", // Beyaz yazı rengi
    "p-8", // İçerik boşluğu
    "flex", // Flex düzeni
    "flex-wrap", // Kartların alt satıra geçmesini sağla
    "justify-center", // Kartları ortala
    "items-center", // Dikey hizalama
    "gap-6" // Hem yatay hem dikey boşluk
    // "md:flex-row" KALDIRILABİLİR çünkü zaten wrap ile yönleniyor
    );
    for (const branch of footer_data.branchs) {
        const branchDiv = document.createElement("div");
        branchDiv.classList.add("bg-blue-700", // Şube kartı için biraz daha açık mavi
        "p-6", // İçerik boşluğu
        "rounded-lg", // Yuvarlak köşeler
        "shadow-lg", // Gölgelendirme
        "transition", // Yumuşak geçişler
        "hover:scale-105", // Hoverda büyüme efekti
        "cursor-pointer", // Kart üzerine tıklanabilirlik
        "max-w-sm" // Kart genişliğini sınırlıyoruz
        );
        branchDiv.innerHTML = `
      <h2 class="text-xl font-bold mb-4 text-center">${branch.title}</h2>
      <p class="text-sm mb-2 text-center">${branch.address}</p>
      <p class="text-sm text-center">${branch.phone}</p>
    `;
        footer.appendChild(branchDiv);
    }
}
// Veriyi backend'den çekme fonksiyonu
export async function fetchNavData() {
    try {
        const response = await fetch('http://192.168.1.101:3000/api/navigation'); // Backend API endpoint
        if (!response.ok) {
            throw new Error('Nav verisi alınamadı');
        }
        const navData = await response.json(); // JSON verisini al
        return navData; // Veriyi geri döndür
    }
    catch (error) {
        console.error('Veri çekme hatası:', error);
        return { navigation: [] }; // Hata durumunda boş bir dizi döndürebiliriz
    }
}
async function fetchSlideData() {
    try {
        const response = await fetch('http://192.168.1.101:3000/api/slides'); // Backend API endpoint
        if (!response.ok) {
            throw new Error('Slide verisi alınamadı');
        }
        const slideData = await response.json(); // JSON verisini al
        return slideData; // Veriyi geri döndür
    }
    catch (error) {
        console.error('Veri çekme hatası:', error);
        return { slides: [] }; // Hata durumunda boş bir dizi döndürebiliriz
    }
}
export async function fetchProductsData() {
    try {
        const response = await fetch('http://192.168.1.101:3000/api/products'); // Backend API endpoint
        if (!response.ok)
            throw new Error('Ürün verisi alınamadı');
        const slideData = await response.json(); // JSON verisini al
        return slideData; // Veriyi geri döndür
    }
    catch (error) {
        console.error('Veri çekme hatası:', error);
        return { products: [] }; // Hata durumunda boş bir dizi döndürebiliriz
    }
}
async function fetchInfoData() {
    try {
        const response = await fetch('http://192.168.1.101:3000/api/info'); // Backend API endpoint
        if (!response.ok)
            throw new Error('Info verisi alınamadı');
        const slideData = await response.json(); // JSON verisini al
        return slideData; // Veriyi geri döndür
    }
    catch (error) {
        console.error('Veri çekme hatası:', error);
        return { info: [] }; // Hata durumunda boş bir dizi döndürebiliriz
    }
}
export async function fetchFooterData() {
    try {
        const response = await fetch('http://192.168.1.101:3000/api/footer'); // Backend API endpoint
        if (!response.ok)
            throw new Error('Footer verisi alınamadı');
        const slideData = await response.json(); // JSON verisini al
        return slideData; // Veriyi geri döndür
    }
    catch (error) {
        console.error('Veri çekme hatası:', error);
        return { branchs: [] }; // Hata durumunda boş bir dizi döndürebiliriz
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const app = document.querySelector('#app');
    if (!app)
        return;
    app.innerHTML = `
    <div>
      <div id="nav"></div>
      <div id="slide"></div>
      <div id="info"></div>
      <div id="products"></div>
      <div id="footer"></div>
    </div>
  `;
    const nav = await fetchNavData();
    createNav(nav);
    const slide = await fetchSlideData();
    createSlide(slide);
    const info = await fetchInfoData();
    createInfo(info);
    const prodacts = await fetchProductsData();
    createProducts(prodacts);
    const footer = await fetchFooterData();
    createFooter(footer);
});
let blinkInterval;
const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        blinkInterval = window.setInterval(() => {
            document.title = document.title === "📢 SATTTTTTTT !" ? "📢 TTTTTTTTTIM !" : "📢 SATTTTTTTT !";
        }, 1000);
    }
    else {
        clearInterval(blinkInterval);
        document.title = originalTitle;
    }
});

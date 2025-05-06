import { createNav, fetchNavData } from './main.js';
import { createFooter, fetchFooterData } from './main.js';

interface Contact {
	name: string;
	iletisim_no: string;
	address: string;
	lat_lng: string; // "latitude,longitude" formatında bekleniyor
}

interface Contacts {
	contacts: Contact[];
}

async function fetchContactData(): Promise<Contacts | null> {
	try {
		const response = await fetch("http://localhost:3000/api/contact");
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		console.log('Contact data fetched:', data);
		return data;
	} catch (error) {
		console.error('Error fetching contact data:', error);
		return null;
	}
}




function initMap() {
	const mapDiv = document.getElementById("map");
	if (!mapDiv) {
	  console.error("Map div not found!");
	  return;
	}

	const location = {lat: 40.87756285060169, lng: 29.23429213325203}; // Örnek: İstanbul
  
	const map = new google.maps.Map(mapDiv, {
	  center: location,
	  zoom: 14,
	});
  
	new google.maps.Marker({
	  position: location,
	  map: map,
	});
  }
  
  window.onload = function () {
	if (typeof google !== "undefined" && google.maps) {
	  initMap(); // Google Maps yüklendiyse haritayı başlat
	} else {
	  console.error("Google Maps API yüklenemedi!");
	}
  };
  
  function createContact(data: Contacts) {
    const contactContainer = document.getElementById("contact-container");
    if (!contactContainer) {
        console.error("Contact container not found!");
        return;
    }

    contactContainer.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto";

    data.contacts.forEach((contact) => {
        const card = document.createElement("div");
        card.className = `
            bg-white rounded-2xl shadow-md overflow-hidden
            border border-gray-100 hover:shadow-xl
            transition-all duration-300 ease-in-out
            flex flex-col
        `;

        card.innerHTML = `
            <div class="p-6 pb-4 flex-1">
                <div class="flex items-start gap-4 mb-4">
                    <div class="bg-blue-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>

                <div class="space-y-3 mt-6">
                    <div class="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="font-medium">${formatPhoneNumber(contact.iletisim_no)}</span>
                    </div>
                    
                    ${contact.address ? `
                    <div class="flex items-start text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="font-medium">${contact.address}</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${contact.lat_lng}" target="_blank"
                        class="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Yol Tarifi
                    </a>
                    <a href="https://wa.me/${contact.iletisim_no.replace(/\D/g, '')}?text=Merhaba%2C%20bilgi%20almak%20istiyorum." 
                        target="_blank"
                        class="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>
                
                <a href="tel:${contact.iletisim_no.replace(/\s+/g, '')}" 
                    class="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hemen Ara
                </a>
            </div>
        `;
        
        contactContainer.appendChild(card);
    });
}

// Telefon numarasını formatlamak için yardımcı fonksiyon
function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber;
}






document.addEventListener("DOMContentLoaded", async () => {
	const navData = await fetchNavData();
	const footerData = await fetchFooterData();
	const data = await fetchContactData();
	if (!data) {
		console.error("No contact data available");
		return;
	}
	
	console.log('Contact data:', data);

	createNav(navData);
	createContact(data);
	createFooter(footerData);
});

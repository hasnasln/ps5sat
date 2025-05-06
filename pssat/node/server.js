const express = require('express'); // Express framework'ünü içe aktar
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) desteği için
const path = require('path'); // Dosya ve dizin yolları ile güvenli işlem için
const morgan = require('morgan'); // ← Ekle

const fs = require('fs'); // Dosya sistemi işlemleri için

const app = express(); // Yeni bir Express uygulaması oluştur
const PORT = 3000; // Uygulamanın dinleyeceği port

app.use(morgan('dev')); // ← Orta seviyede, renkli ve güzel loglama

// Tüm origin'lerden gelen isteklere izin ver (CORS'u devreye alır)
app.use(cors());

function readFileandReturn(xpath) {
  const filePath = path.join(__dirname, xpath); // products.json dosyasının yolu
  try {
    const data = fs.readFileSync(filePath, 'utf8'); // Dosyayı senkron okur
    const x = JSON.parse(data); // JSON formatında parse eder
    return x; // JSON formatında yanıt döner
  } catch (err) {
    console.error('Dosya okuma hatası:', err);
    return null; // Hata durumunda null döner
  }
}

app.get('/api/navigation', (req, res) => {
  const navData = readFileandReturn('SRC/nav.json'); // navigation.json dosyasını oku
  if (!navData) return res.status(500).json({ message: 'Navigasyon verisi alınamadı' }); // Hata durumunda 500 döner
  res.json(navData); // JSON formatında yanıt döner
});

// Slider verisini döndüren endpoint
app.get('/api/slides', (req, res) => {
  const slide = readFileandReturn('SRC/slide.json'); // slide.json dosyasını oku
  if (!slide) return res.status(500).json({ message: 'Slider verisi alınamadı' }); // Hata durumunda 500 döner
  res.json(slide); // JSON formatında yanıt döner
});

app.get('/api/info', (req, res) => {
  const info = readFileandReturn('SRC/info.json'); // info.json dosyasını oku
  if (!info) return res.status(500).json({ message: 'Info verisi alınamadı' }); // Hata durumunda 500 döner
  res.json(info); // JSON formatında yanıt döner
});

app.get('/api/products', (req, res) => {
  const prodacts = readFileandReturn('SRC/products.json'); // products.json dosyasını oku
  if (!prodacts) {
    return res.status(500).json({ message: 'Ürün verisi alınamadı' }); // Hata durumunda 500 döner
  }
  res.json(prodacts); // JSON formatında yanıt döner
});

app.get('/api/footer', (req, res) => {  
  const footer = readFileandReturn('SRC/footer.json'); // footer.json dosyasını oku
  if (!footer) {
    return res.status(500).json({ message: 'Footer verisi alınamadı' }); // Hata durumunda 500 döner
  }
  res.json(footer); // JSON formatında yanıt döner
});

app.get('/api/contact', (req, res) => {
  const contact = readFileandReturn('SRC/contact.json'); // contact.json dosyasını oku
  if (!contact) {
    return res.status(500).json({ message: 'İletişim verisi alınamadı' }); // Hata durumunda 500 döner
  }
  console.log(contact);
  res.json(contact); // JSON formatında yanıt döner
});



app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const data = readFileandReturn('SRC/products.json')
  const xproduct = data.products.find(p => p.id === productId); // Ürünü bul
  if (xproduct) {
    res.json(xproduct);
  } else {
    res.status(404).json({ message: 'Ürün bulunamadı' });
  }
});

// Sunucuyu belirtilen port üzerinden başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

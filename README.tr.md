# Temu Global Products Only

[English](README.md) | **Türkçe**

Temu'da sadece global ürünleri gösteren, yerel ürünleri gizleyen bir tarayıcı eklentisi.

Bu eklenti ürünleri sadece görsel olarak gizlemez; API seviyesinde doğrudan filtreleme yapar. Yani aramalarınız, sunucuda yalnızca global ürünler gelecek şekilde işlenir.

## 🚀 Kurulum

### Chrome için

1. Bu repoyu indirin veya ZIP olarak çıkarın
2. Chrome'da `chrome://extensions/` adresine gidin
3. Sağ üst köşeden **Geliştirici modu**'nu açın
4. **Paketlenmemiş öğe yükle** butonuna tıklayın
5. İndirdiğiniz klasörü seçin

### Firefox için

1. Bu repoyu indirin veya ZIP olarak çıkarın
2. Firefox'ta `about:debugging#/runtime/this-firefox` adresine gidin
3. **Geçici Eklenti Yükle** butonuna tıklayın
4. İndirdiğiniz klasördeki `manifest.json` dosyasını seçin

**Not:** Firefox'ta eklenti geçici olarak yüklenecektir. Tarayıcı her kapatıldığında tekrar yüklemeniz gerekecektir. Kalıcı kullanım için eklentinin Mozilla tarafından imzalanması gerekir. En kısa sürede ilgileneceğim.

## 💻 Kullanım

1. Eklentiyi yükledikten sonra tarayıcınızın sağ üst köşesinde eklenti simgesi görünecektir
2. Simgeye tıklayarak eklentiyi açın
3. Toggle switch ile filtreyi açıp kapatabilirsiniz
4. Ayar değiştirdikten sonra Temu sayfaları otomatik yenilenir

## 🔧 Nasıl Çalışır?

Eklenti, Temu'nun API isteklerini yakalar ve `semiManaged` parametresini `false` olarak değiştirir. Bu sayede:

- ❌ Yerel ürünler gizlenir
- ✅ Sadece global ürünler gösterilir

## 📝 Teknik Detaylar

### Dosya Yapısı

```
temu-global-products-only/
├── manifest.json      # Extension yapılandırması
├── content.js         # API isteklerini yakalar
├── popup.html         # Popup arayüzü
├── popup.css          # Popup stilleri
├── popup.js           # Popup mantığı
├── _locales/          # Çoklu dil desteği
├── icon16.png         # 16x16 icon
├── icon48.png         # 48x48 icon
├── icon128.png        # 128x128 icon
└── README.md          # Bu dosya
```

### API Interception

Eklenti, `XMLHttpRequest` API'sini kullanarak Temu'nun `/api/poppy/v1/search` endpoint'ine yapılan istekleri yakalar ve modifiye eder:

```javascript
// semiManaged parametresini false yap
data.semiManaged = false;
```

## 🌍 Çoklu Dil Desteği

Eklenti tarayıcınızın dilini otomatik algılar:
- 🇬🇧 İngilizce
- 🇹🇷 Türkçe

## 📄 Lisans

MIT License - Özgürce kullanabilirsiniz.

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için önce bir issue açmanız daha iyi olur.

## ⚠️ Yasal Uyarı

Bu eklenti eğitim amaçlıdır. Temu'nun kullanım koşullarını ihlal edebilir. Kendi sorumluluğunuzda kullanın.


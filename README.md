# 📱 Social Media Demo

Modern bir sosyal medya demo uygulaması. Bu proje, kullanıcı yönetimi ve post gösterimi özelliklerini içeren React tabanlı bir web uygulamasıdır.

## ✨ Özellikler

- 👥 **Kullanıcı Yönetimi**: Kullanıcı ekleme, düzenleme ve silme
- 📝 **Post Görüntüleme**: Kullanıcıların postlarını görüntüleme
- 🎨 **Modern UI**: Tailwind CSS ile responsive tasarım
- 💾 **Local Storage**: Verilerin tarayıcıda saklanması
- 🔄 **State Management**: Redux Toolkit ile merkezi state yönetimi
- 🚀 **Hızlı Geliştirme**: Vite ile optimize edilmiş geliştirme ortamı

## 🛠️ Teknolojiler

- **Frontend Framework**: React 19.1.1
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Kurulum

1. **Projeyi klonlayın:**

   ```bash
   git clone <repository-url>
   cd Social-Media-Demo
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**

   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın:**
   ```
   http://localhost:5173
   ```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── modal/          # Modal bileşeni
│   ├── navbar/         # Navigasyon çubuğu
│   └── sidebar/        # Yan menü
├── layouts/            # Sayfa düzenleri
├── lib/                # Kütüphaneler ve konfigürasyonlar
├── pages/              # Sayfa bileşenleri
│   ├── posts/          # Post sayfası
│   └── users/          # Kullanıcı sayfası
├── store/              # Redux store yapılandırması
│   └── features/       # Redux slice'ları
├── App.tsx             # Ana uygulama bileşeni
└── main.tsx            # Uygulama giriş noktası
```

## 🎯 Kullanım

### Kullanıcı Yönetimi

- `/users` sayfasında kullanıcıları görüntüleyebilirsiniz
- "Add New User" butonu ile yeni kullanıcı ekleyebilirsiniz
- Mevcut kullanıcıları düzenleyebilir veya silebilirsiniz

### Post Görüntüleme

- Ana sayfada seçili kullanıcının postlarını görüntüleyebilirsiniz
- Sağ tarafta kullanıcı bilgileri görünür
- Postlar JSONPlaceholder API'sinden çekilir

### Navigasyon

- Sol üst köşedeki menü butonu ile sidebar'ı açabilirsiniz
- Sidebar'dan farklı sayfalara geçiş yapabilirsiniz

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Build'i önizle
npm run preview

# Linting kontrolü
npm run lint
```

## 📊 State Yönetimi

Uygulama Redux Toolkit kullanarak state yönetimi yapar:

- **userSlice**: Kullanıcı verilerini ve seçili kullanıcıyı yönetir
- **postSlice**: Post verilerini yönetir

### Store Yapısı

```typescript
{
  user: {
    users: User[],
    selectedUser: User
  },
  post: {
    userPosts: Post[]
  }
}
```

## 💾 Veri Saklama

Uygulama verileri tarayıcının localStorage'ında saklar:

- `users`: Kullanıcı listesi
- `selectedUser`: Seçili kullanıcı
- `userPosts`: Kullanıcı postları

## 🌐 API Entegrasyonu

Uygulama JSONPlaceholder API'sini kullanır:

- **Users**: `https://jsonplaceholder.typicode.com/users`
- **Posts**: `https://jsonplaceholder.typicode.com/posts?userId={userId}`

## 🎨 Styling

- **Tailwind CSS** ile utility-first CSS framework
- **Responsive design** - mobil ve masaüstü uyumlu
- **Modern UI components** - hover efektleri ve geçişler

## 📱 Responsive Tasarım

- **Mobile First**: Önce mobil tasarım, sonra masaüstü
- **Breakpoints**: sm, md, lg, xl
- **Flexible Layout**: Flexbox ve Grid kullanımı

## 🔍 Özellik Detayları

### Kullanıcı Ekleme

- Form validasyonu ile güvenli kullanıcı ekleme
- Modal popup ile kullanıcı dostu arayüz

### Post Görüntüleme

- Lazy loading ile performans optimizasyonu
- Cache mekanizması ile API çağrılarını azaltma

### State Persistence

- Sayfa yenilendiğinde verilerin korunması
- localStorage ile kalıcı veri saklama

## 🚀 Deployment

```bash
# Production build oluştur
npm run build

# Build dosyaları dist/ klasöründe oluşur
# Bu dosyaları herhangi bir static hosting servisine yükleyebilirsiniz
```

## 👨‍💻 Geliştirici

Bu proje modern web geliştirme teknolojileri kullanılarak geliştirilmiştir.

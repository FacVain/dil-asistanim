# Bil496 Bitirme Projesi - Dil Asistanım
Dil Asistanım, kullanıcıların yazılı iletişimlerini anlamak, iyileştirmek ve duygu analizi ile daha etkili hale getirmeyi amaçlayan bir uygulamadır. 
Bu sayede, kullanıcılar yazılarını daha etkili bir şekilde iletebilir ve iletişimlerindeki olası sorunları önceden belirleyerek çözümleyebilirler. \
Bu amaçla sade ve basit bir arayüz aracılığıyla kullanıcı metinlerini fine-tune edilen GPT-3.5 ve XMLRoBERTa modelleri ile iyileştirip, analiz eden bir servis geliştirilmiştir.  


## Grup Üyeleri
- Furkan Taşdemir
- Alptekin Sarılar
- Halil Erkan

## Backend
Gerekli paketlerin yüklenmesi 
```sh
npm i
```
Backend sunucusunun çalıştırılması
```sh
npx nodemon gpt-server.js
```
Yada
```sh
npm run dev
```
## Backend Environment Variables 
.env dosyasında aşağıdaki değişkenler bulunmalıdır.
```sh
MONGO_DB_PASS
DATABASE_URI
COOKIE_SECRET
OPENAI_API_KEY
MODEL_NAME
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SESSION_SECRET
PORT
FRONTEND_ORIGIN
MODEL_ORIGIN
```

## Frontend
"frontend/Dijital Dil Asistanım" klasörünün altında bulunmaktadır.

Gerekli paketlerin yüklenmesi 
```sh
npm i
```
Frontend sunucusunun çalıştırılması
```sh
npm run dev
```
## Frontend Environment Variables 
.env dosyasında Backend origini bu değişkene atanmalıdır.
```
VITE_API_URL
```

## XMLRoBERTa servisi
Flask uygulaması, Endpointine gönderilen girdiler ile XMLRoBERTa Modellerinden anlam ve ton analizi çıktıları almakkta ve bunları repsonse olarak Backend'e iletmekte. \
xmlroberta-request klasörü altında bulunmkatadır. \
Çalışması için https://huggingface.co/FacVain/Bitirme_Projesi_XMLRoBERTa_Modelleri/tree/main adresinde bulunan klasörler xmlroberta-request klasörüne indirilmelidir. \
Bu işlemin ardından dosya yapısı aşağıdaki gibi olmalıdır.
![image](https://github.com/FacVain/dil-asistanim/assets/78103291/ff384f03-5ceb-4278-874d-d044d8f8d979) \
Gerekli kütüphanelerin kurulmasının ardından servis aşağıdaki gibi ayağa kaldırılabilir
```
python main.py
```

import "./history.css";

// @hooks
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

// fake data
let writings = [
  {
    index: 0,
    title: "Anıları Hatırlatma Mektubu",
    content:
      "Umarım bu mektup, seninle olan güzel anılarımızı hatırlatır. Her anı, içinde sıcak bir tebessüm bırakır. Seninle geçirdiğimiz günlerin değeri, her geçen gün daha da artıyor. Umarım bu yazıyı okuduğunda, güzel anılarımız aklına gelir.",
    type: "mektup",
  },
  {
    index: 1,
    title: "Teşekkür ve İyi Dilekler",
    content:
      "Size bu yazıyı, son alışverişiniz için teşekkür etmek ve sizinle uzun vadeli bir ilişki kurmayı ummak için yazıyorum. Müşteri memnuniyeti bizim için çok önemlidir ve herhangi bir konuda yardıma ihtiyacınız olursa lütfen bize bildirin.",
    type: "teşekkür",
  },
  {
    index: 2,
    title: "Huzurlu Günler",
    content:
      "Bugün, sakin bir gün geçirdim. Kitap okuyarak ve doğayla iç içe zaman geçirerek huzur buldum. Hayatın küçük zevklerini fark etmek, gerçekten önemli. Her anı dolu dolu yaşamak için elimden geleni yapıyorum.",
    type: "günlük",
  },
];

const History = () => {
  const [currentWriting, setCurrentWriting] = useState(writings[0]);

  const selectWritingHandler = (title) => {
    setCurrentWriting(writings.find((writing) => writing.title === title));
  };

  writings = [...writings, ...writings, ...writings];

  return (
    <div className="history w-screen h-screen ">
      <Sidebar
        header="Geçmiş Yazılarım"
        components={writings.map((writing) => writing.title)}
        width="300px"
        height="100vh"
        buttonType="primary"
        onClick={selectWritingHandler}
        expandedData={writings.map(
          (writing) => writing.content.substring(0, 70) + "...",
        )}
      />
      <div className="history-writing-wrapper">{currentWriting.content}</div>
    </div>
  );
};
export default History;

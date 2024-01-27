// @antd components
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

// fake data
const writings = [
  {
    title: "Anıları Hatırlatma Mektubu",
    content:
      "Umarım bu mektup, seninle olan güzel anılarımızı hatırlatır. Her anı, içinde sıcak bir tebessüm bırakır. Seninle geçirdiğimiz günlerin değeri, her geçen gün daha da artıyor. Umarım bu yazıyı okuduğunda, güzel anılarımız aklına gelir.",
    type: "mektup",
  },
  {
    title: "Teşekkür ve İyi Dilekler",
    content:
      "Size bu yazıyı, son alışverişiniz için teşekkür etmek ve sizinle uzun vadeli bir ilişki kurmayı ummak için yazıyorum. Müşteri memnuniyeti bizim için çok önemlidir ve herhangi bir konuda yardıma ihtiyacınız olursa lütfen bize bildirin.",
    type: "teşekkür",
  },
  {
    title: "Huzurlu Günler",
    content:
      "Bugün, sakin bir gün geçirdim. Kitap okuyarak ve doğayla iç içe zaman geçirerek huzur buldum. Hayatın küçük zevklerini fark etmek, gerçekten önemli. Her anı dolu dolu yaşamak için elimden geleni yapıyorum.",
    type: "günlük",
  },
];

const items = writings.map((writing, index) => ({
  key: index,
  label: writing.title,
}));

const History = () => {
  const [selectedWriting, setSelectedWriting] = useState(writings[0]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSelectMenuItem = (item) => {
    setSelectedWriting(writings[item.key]);
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        style={{ height: "100vh" }}
        collapsed={false}
      >
        <div className="w-full text-gray-400 font-light text-base text-center p-3 border border-gray-200 border-solid rounded-md">
          Geçmişiniz
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onSelect={handleSelectMenuItem}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedWriting.content}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Dijital Dil Asistanım ©{new Date().getFullYear()} Created by Fine
          Dudes
        </Footer>
      </Layout>
    </Layout>
  );
};
export default History;

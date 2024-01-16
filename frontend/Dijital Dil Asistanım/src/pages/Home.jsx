import { Button, Card, Input } from "antd";

const { TextArea } = Input;

const Home = () => {
  return (
    <div className="grid p-4">
      <h1 className="text-4xl font-bold text-gray-700 justify-self-center">
        Dijital Dil Asistanım
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <TextArea placeholder="This is your Input" autoSize className="p-6" />
        <Button type="default" className="w-fit row-start-2">
          Submit
        </Button>
        <Card className=" border-gray-300">
          <p>This is Chat-GPT output!</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;

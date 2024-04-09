import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import Roboto from "../assets/Roboto-Regular.ttf";
import { saveAs } from "file-saver";
import "./components.css";

// Create styles
Font.register({
  family: "Roboto",
  src: Roboto,
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
});

const generatePdfDocument = async (fileName, pdfDocumentComponent) => {
  const blob = await pdf(pdfDocumentComponent).toBlob();
  saveAs(blob, fileName);
};

const pdfDocument = ({ text }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{text}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Create Document Component
const PdfComponent = ({ text, fileName }) => {
  const _pdfDocument = pdfDocument({ text });

  return (
    <button
      type="button"
      className="button pdf-button"
      onClick={() => {
        generatePdfDocument(fileName, _pdfDocument);
      }}
    >
      PDF Dosyasını İndir
    </button>
  );
};

export default PdfComponent;

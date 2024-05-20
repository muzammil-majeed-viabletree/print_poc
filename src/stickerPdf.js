import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-between",
    // transform: "rotate(90deg)",
  },
  section: {
    // margin: 10,
    // padding: 10,
    width: "40mm",
    height: "90mm",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "10mm",
    width: "10mm",
  },
});

const StickerPdf = () => {
  return (
    <Document>
      <Page size={{ width: "80mm", height: "100mm" }} style={styles.page}>
        <View style={styles.section}>
          <Image
            source={{
              uri: "https://stickershop.line-scdn.net/stickershop/v1/product/25175483/LINEStorePC/main.png?v=2",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.section}>
          <Image
            source={{
              uri: "https://stickershop.line-scdn.net/stickershop/v1/product/25175483/LINEStorePC/main.png?v=2",
            }}
            style={styles.image}
          />
        </View>
      </Page>
    </Document>
  );
};

export const stickerUi = `
<style>
  body {
    height: 50mm;
    width: 90mm
  }
</style>
  <div style="height: 50mm, width: 90mm, display: flex; justify-content: center; align-items: center">
    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;border: 1px solid black">
      <div style="width: 50%; display: flex; justify-content: center; align-items: center;height: max-content">
        <img src="https://stickershop.line-scdn.net/stickershop/v1/product/25175483/LINEStorePC/main.png?v=2" style="  height: 15mm;
        width: 15mm;
        object-fit: contain;" />
      </div>

      <div style="width: 50%; display: flex; justify-content: center; align-items: center; height: max-content">
        <img src="https://stickershop.line-scdn.net/stickershop/v1/product/25175483/LINEStorePC/main.png?v=2"style="  height: 15mm;
        width: 15mm;
        object-fit: contain" />
      </div>
    </div>
  </div>
`;

export default StickerPdf;

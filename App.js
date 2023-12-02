import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Dialog from "react-native-dialog";
import Search from "./Search";
import { useEffect, useState } from "react";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [rootLetters, setRootLetters] = useState("");
  const [index, setIndex] = useState(3);
  const [imageWidth, setImageWidth] = useState(1000);
  const [imageHeight, setImageHeight] = useState(1300);
  const [imageURL, setImageURL] = useState(
    "https://ejtaal.net/aa/img/hw4/0/hw4-0003.png"
  );

  const setPage = () => {
    if (index.toString().length == 3) {
      indexStr = "0" + index.toString();
      indexDir = indexStr.slice(1, 2);
    } else if (index.toString().length == 2) {
      indexStr = "00" + index.toString();
      indexDir = "0";
    } else if (index.toString().length == 1) {
      indexStr = "000" + index.toString();
      indexDir = "0";
    } else {
      indexStr = index.toString();
      indexDir = indexStr.slice(0, 2);
    }

    setImageURL(
      "https://ejtaal.net/aa/img/hw4/" + indexDir + "/hw4-" + indexStr + ".png"
    );
    Image.getSize(imageURL, (width, height) => {
      setImageHeight(height);
      setImageWidth(width);
    });
  };
  useEffect(() => {
    setPage();
  }, [index]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="light" translucent={false} />

      <SafeAreaView style={styles.columnContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "salmon",
              borderBottomWidth: 3,
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderRadius: 10,
              borderColor: "#DDD",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Press Here</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "salmon",
              borderBottomWidth: 3,
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderRadius: 10,
              borderColor: "#DDD",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* -------------START OF IMAGE CONTAINER------------- */}
      <View style={styles.pageContainer}>
        <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.4}>
          <Image
            style={[
              styles.image,
              {
                aspectRatio: imageWidth / imageHeight,
                flex: 1,
              },
            ]}
            source={{ uri: imageURL }}
          />
        </TouchableOpacity>
        <Dialog.Container
          visible={visible}
          contentStyle={{ backgroundColor: "#121212" }}
        >
          <Dialog.Title style={{ color: "white" }}>Search</Dialog.Title>
          <Dialog.Description style={{ color: "white" }}>
            Enter root letters using Eng/Arb
          </Dialog.Description>
          <Dialog.Input
            autoCorrect={false}
            style={{ color: "white" }}
            onChangeText={(text) => setRootLetters(text)}
          />
          <Dialog.Button
            color="salmon"
            label="Cancel"
            onPress={() => setVisible(false)}
          />
          <Dialog.Button
            color="salmon"
            label="Search"
            onPress={() => {
              setIndex(Search(rootLetters));
              setVisible(false);
            }}
          />
        </Dialog.Container>
      </View>
      {/* ---------------END OF IMAGE CONTAINER--------------- */}

      <SafeAreaView style={styles.controlContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setIndex(index > 1 ? index - 1 : index);
              setPage();
            }}
            style={{
              backgroundColor: "salmon",
              borderTopWidth: 3,
              borderBottomWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 4,
              borderRadius: 10,
              borderColor: "#DDD",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 40, bottom: 15 }}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setIndex(index < 1317 ? index + 1 : index);
              setPage();
            }}
            style={{
              backgroundColor: "salmon",
              borderTopWidth: 3,
              borderBottomWidth: 2,
              borderLeftWidth: 4,
              borderRightWidth: 2,
              borderRadius: 10,
              borderColor: "#DDD",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 40, bottom: 14.9 }}>→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DDD",
  },
  columnContainer: {
    flex: 0.8,
    flexDirection: "row",
  },
  pageContainer: {
    position: "relative",
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
    maxWidth: "98%",
  },
  controlContainer: {
    flex: 0.7,
    flexDirection: "row",
  },
});

import { View, Image, Text, StyleSheet } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";

import OutlinedButton from "./OutlinedButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      alignItems: true,
      aspect: [16, 9],
      quality: 0.1,
    });
    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  let imagePreview = <Text>No se ha tomado la foto todavía!</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage }} w />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Tomar foto!
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

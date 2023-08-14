import { View, Image, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import OutlinedButton from "./OutlinedButton";

function ImagePic({ onTakeImage }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(result.assets[0].uri);
    onTakeImage(result.assets[0].uri);
    if (!result.canceled) {
      imagePreview = <Image style={styles.image} source={{ uri: image }} w />;
    }
  };

  return (
    <View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <OutlinedButton onPress={pickImage} icon="camera">
        Tomar foto!
      </OutlinedButton>
    </View>
  );
}

export default ImagePic;

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

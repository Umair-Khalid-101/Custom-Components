import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const TimePickerModal = ({ isVisible, onClose, onConfirm }) => {
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  // Shared value to control the modal's animation
  const modalTranslateY = useSharedValue(SCREEN_HEIGHT);

  // Animated style for modal animation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: modalTranslateY.value }],
    };
  });

  const showModal = () => {
    modalTranslateY.value = withTiming(0, { duration: 700 }); // Smooth appearance
  };

  const hideModal = () => {
    modalTranslateY.value = withTiming(SCREEN_HEIGHT, { duration: 700 }); // Smooth disappearance
  };

  if (isVisible) {
    showModal();
  } else {
    hideModal();
  }

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleConfirm = () => {
    onConfirm(
      `${selectedHour}:${selectedMinute
        .toString()
        .padStart(2, "0")} ${selectedPeriod}`
    );
    onClose();
  };

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        {/* Replace View with Animated.View to apply animated styles */}
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <Text style={styles.headerText}>Select Time</Text>
          <View style={styles.pickerContainer}>
            {/* Hour Picker */}
            <ScrollView
              style={styles.scrollPicker}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                setSelectedHour(hours[index]);
              }}
            >
              {hours.map((hour, index) => (
                <Text key={index} style={styles.pickerText}>
                  {hour}
                </Text>
              ))}
            </ScrollView>

            {/* Minute Picker */}
            <ScrollView
              style={styles.scrollPicker}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                setSelectedMinute(minutes[index]);
              }}
            >
              {minutes.map((minute, index) => (
                <Text key={index} style={styles.pickerText}>
                  {minute}
                </Text>
              ))}
            </ScrollView>

            {/* AM/PM Picker */}
            <View style={styles.amPmContainer}>
              <TouchableOpacity
                onPress={() => setSelectedPeriod("AM")}
                style={styles.amPmButton}
              >
                <Text
                  style={[
                    styles.amPmText,
                    selectedPeriod === "AM" && styles.selectedText,
                  ]}
                >
                  AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedPeriod("PM")}
                style={styles.amPmButton}
              >
                <Text
                  style={[
                    styles.amPmText,
                    selectedPeriod === "PM" && styles.selectedText,
                  ]}
                >
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  scrollPicker: {
    width: 60,
    height: 150,
  },
  pickerText: {
    fontSize: 22,
    height: 50,
    textAlign: "center",
  },
  amPmContainer: {
    justifyContent: "space-between",
  },
  amPmButton: {
    paddingVertical: 10,
  },
  amPmText: {
    fontSize: 22,
  },
  selectedText: {
    fontWeight: "bold",
    color: "blue",
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
});

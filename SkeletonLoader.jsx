import { View, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient"; // Import LinearGradient

const { width: windowWidth } = Dimensions.get("window");

// CONSTANTS
import { colors } from "../../constants";

// CONTEXT
import { useStateContext } from "../../context";

export default function SkeletonLoader() {
  const { isEnabled } = useStateContext();

  // Shared value for animated gradient position
  const translateX = useSharedValue(-windowWidth); // Start position outside the view

  useEffect(() => {
    // Animate the gradient's movement
    translateX.value = withRepeat(
      withTiming(windowWidth, {
        duration: 1500, // Duration of the shimmer effect
        easing: Easing.linear, // Linear easing for continuous shimmer
      }),
      -1, // Infinite loop
      false // Do not reverse the animation
    );
  }, []);

  // Animated style for the gradient shimmer effect
  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }], // Animate the gradient's movement horizontally
    };
  });

  return (
    <SafeAreaView>
      <View style={{ margin: 20 }}>
        {/* Container for the skeleton block */}
        <View style={[styles.skeletonContainer]}>
          <View style={[styles.skeletonBlock, { height: 200 }]}>
            <Animated.View
              style={[styles.animatedGradient, animatedGradientStyle]}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.9)",
                  "rgba(255, 255, 255, 0.1)",
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
          </View>

          {/* Smaller text placeholder block */}
          <View style={[styles.skeletonBlock, { height: 80 }]}>
            <Animated.View
              style={[styles.animatedGradient, animatedGradientStyle]}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.9)",
                  "rgba(255, 255, 255, 0.1)",
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
          </View>

          {/* Another skeleton block */}
          <View style={[styles.skeletonBlock, { height: 150 }]}>
            <Animated.View
              style={[styles.animatedGradient, animatedGradientStyle]}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.9)",
                  "rgba(255, 255, 255, 0.1)",
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    marginBottom: 12,
    borderRadius: 8,
  },
  skeletonBlock: {
    backgroundColor: colors.secondaryTenPercent,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  animatedGradient: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateX: 0 }],
  },
});

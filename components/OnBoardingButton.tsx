import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { OnboardingData } from "@/data/data";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
};

const OnBoardingButton = ({
  flatListRef,
  flatListIndex,
  dataLength,
  x,
}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation = useNavigation();

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["transparent", "transparent", "#F15937"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const nextAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 120,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(180)
              : withTiming(0),
        },
      ],
    };
  });

  const getStartedTextAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          navigation.navigate("Home");
        }
      }}
    >
      <Animated.View style={[styles.container, animatedBackgroundColor]}>
        <Animated.Text
          style={[styles.textButton, getStartedTextAnimationStyle]}
        >
          Get Started
        </Animated.Text>

        <Animated.Text style={[styles.nextText, nextAnimationStyle]}>
          Next
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default OnBoardingButton;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  nextText: {
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "right",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    textAlign: "right",
  },
  lastScreenText: {
    backgroundColor: "#F15937",
  },
  allScreensText: {
    backgroundColor: "transparent",
  },
});

import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import data, { OnboardingData } from "@/data/data";
import OnBoardingScreenItem from "@/components/OnBoardingScreenItem";
import OnBoardingButton from "@/components/OnBoardingButton";
import Dot from "@/components/Dot";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const navigation = useNavigation();
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const skipTextAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            flatListIndex.value === data.length - 1
              ? withTiming(-300)
              : withTiming(0),
        },
      ],
    };
  });

  const dotsContainerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            flatListIndex.value === data.length - 1
              ? withTiming(-100)
              : withTiming(0),
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <OnBoardingScreenItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Animated.Text style={[styles.skipText, skipTextAnimation]}>
            Skip
          </Animated.Text>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.dotsContainer, dotsContainerAnimation]}>
          {data.map((_, index) => {
            return <Dot index={index} x={x} key={index} />;
          })}
        </Animated.View>
        <OnBoardingButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 30,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  dotsContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontSize: 20,
  },
});

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { DANGER_COLOR, DARK_COLOR, LIGHT_COLOR } from "./THEME";
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default function App() {
  const [colorMode, setColorMode] = useState("dark");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  useInterval(() => {
    setSeconds(new Date().getSeconds());
    setMinutes(new Date().getMinutes());
    setHours(new Date().getHours());
  }, 1000);

  const secondsToDeg = (time) => {
    return String(time * 6) + "deg";
  };
  const minutesToDeg = (time) => {
    return String(time * 6) + "deg";
  };

  const hoursToDeg = (time) => {
    if (time > 23) {
      time -= 12;
    }
    return String(time * 30 + "deg");
  };
  let arrowStyle = {};
  if (colorMode === "light") {
    arrowStyle = [DARK_COLOR, LIGHT_COLOR];
  } else {
    arrowStyle = [LIGHT_COLOR, DARK_COLOR];
  }

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const zipIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  const zipOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <View style={{ height: 290 }}>
        <View style={styles.container}>
          <Animated.View
            style={{
              ...styles.clock,
              transform: [{ scaleX: fadeAnim }, { rotate: "180deg" }],
              backgroundColor: colorMode === "light" ? LIGHT_COLOR : DARK_COLOR,
              borderWidth: 2,
            }}
          >
            <View
              style={{
                position: "absolute",
                transform: [{ rotate: secondsToDeg(seconds) }],
              }}
            >
              <LinearGradient
                colors={[
                  DANGER_COLOR,
                  colorMode === "light" ? LIGHT_COLOR : DARK_COLOR,
                ]}
                style={{
                  ...styles.arrow,
                  height: 135,
                  top: 75,
                }}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 1, y: 0.1 }}
              ></LinearGradient>
            </View>
            <View
              style={{
                position: "absolute",
                transform: [{ rotate: minutesToDeg(minutes) }],
              }}
            >
              <LinearGradient
                colors={arrowStyle}
                style={{
                  ...styles.arrow,
                  height: 135,
                  top: 75,
                }}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 1, y: 0.1 }}
              ></LinearGradient>
            </View>
            <View
              style={{
                position: "absolute",
                transform: [{ rotate: hoursToDeg(hours) }],
              }}
            >
              <LinearGradient
                colors={arrowStyle}
                style={{
                  ...styles.arrow,
                  height: 90,
                  top: 50,
                }}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 1, y: 0.1 }}
              ></LinearGradient>
            </View>

            <View
              style={{
                position: "absolute",
                backgroundColor: DANGER_COLOR,
                height: 20,
                width: 20,
                borderRadius: 20,
                opacity: 0.8,
              }}
            ></View>
          </Animated.View>
        </View>
      </View>
      <View
        style={{
          height: 50,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <TouchableNativeFeedback
          style={{}}
          onPress={() => {
            zipIn();
            setTimeout(() => {
              zipOut();
              setColorMode((prev) => (prev === "light" ? "dark" : "light"));
            }, 1000);
          }}
          background={TouchableNativeFeedback.Ripple(DARK_COLOR, false)}
        >
          <View style={styles.swapClockButtonWrapper}>
            <Text style={styles.swapClockButtonText}>Сменить циферблат</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: LIGHT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 290,
    height: 290,
    borderRadius: 290,
  },
  arrow: {
    width: 5,
    borderRadius: 3,
  },
  swapClockButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    color: LIGHT_COLOR,
    borderColor: DARK_COLOR,
    borderWidth: 1,
    padding: 15,
    borderRadius: 6,
  },
  swapClockButtonText: {
    color: DARK_COLOR,
  },
});

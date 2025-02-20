import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, Image, Text } from "react-native";
import { colors } from "../styles/colors";

import snowflake_icon from '../../../assets/snowflak_icon.png';
import dayjs from "dayjs";

// 분 → H M 변환 함수
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}H ${remainingMinutes}M`;
  } else if (hours > 0) {
    return `${hours}H`;
  } else {
    return `${remainingMinutes}M`;
  }
};

const ProgressBar = ({ startedAt, duration, version, userPoint, totalPoints, savedTime, totalTimeGoal }) => {
  const endDate = version === "Time" ? startedAt.add(duration, 'M') : null;
  
  const progress = useState(new Animated.Value(0))[0]; // 상태로 관리하지 않고 useState[0] 활용

  useEffect(() => {
    const calculateProgress = () => {
      if (version === 'Time') {
        const now = new Date();
        const totalTime = endDate - startedAt;
        const timeElapsed = now - startedAt;
        return Math.min((timeElapsed / totalTime) * 100, 100);
      } else if (version === 'Point') {
        return Math.min((userPoint / totalPoints) * 100, 100);
      } else if (version === 'SaveTime') {
        return Math.min((savedTime / totalTimeGoal) * 100, 100);
      }
      return 0;
    };

    const percentage = calculateProgress();
    progress.setValue(0); // 🔥 프로그레스 초기화
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [startedAt, duration, version, userPoint, totalPoints, savedTime, totalTimeGoal, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 280],
  });

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.filledBar, { width: progressBarWidth }]} />
          <Animated.View style={[styles.icon, { transform: [{ translateX }] }]}>
            <Image source={snowflake_icon} style={{ width: 16, height: 16 }} />
          </Animated.View>
        </View>
      </View>

      {version === 'Time' ? (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{startedAt.format("YYYY년 M월 D일")}</Text>
          <Text style={styles.dateText}>{endDate.format("YYYY년 M월 D일")}</Text>
        </View>
      ) : version === 'Point' ? (
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{`${userPoint}P`}</Text>
          <Text style={styles.pointsText}>{`${totalPoints}P`}</Text>
        </View>
      ) : (
        <View style={styles.saveTimeContainer}>
          <Text style={styles.saveTimeText}>{formatTime(savedTime)}</Text>
          <Text style={styles.saveTimeText}>{formatTime(totalTimeGoal)}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    width: 300,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    position: "relative",
  },
  filledBar: {
    height: "100%",
    backgroundColor: colors.indigoBlue,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: -25,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    height: 30,
  },
  dateText: {
    color: colors.gray77,
    fontWeight: "500",
    fontSize: 14,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.fontMain70,
  },
  saveTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
  saveTimeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.fontMain70,
  }
});

export default ProgressBar;
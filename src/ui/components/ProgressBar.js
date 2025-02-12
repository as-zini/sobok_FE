

import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, Image, Text } from "react-native";
import { colors } from "../styles/colors";

import snowflake_icon from '../../../assets/snowflak_icon.png';
import ShortAlertArea from "./ShortAlertArea";
import dayjs from "dayjs";

const ProgressBar = ({ startedAt, duration, version, userPoint, totalPoints }) => {
  const endDate = version ==="Time" ? startedAt.add(duration, 'M') : null;
  
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const calculateProgress = () => {
      let percentage = 0;
      let pointPercentage = 0;
      
      if (version === 'Time') {
        const now = new Date();
        const totalTime = endDate - startedAt;
        const timeElapsed = now - startedAt;
        percentage = Math.min((timeElapsed / totalTime) * 100, 100);
      } else if (version === 'Point') {
        // 포인트 프로그레스 계산
        percentage= Math.min((userPoint / totalPoints) * 100, 100);
      }
      
      return percentage;
    };

    const percentage = calculateProgress();

    // 프로그레스 애니메이션 실행
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500, // 애니메이션 지속 시간
      useNativeDriver: false,
    }).start();
  }, [startedAt, duration, version, userPoint, totalPoints]);

  // Progress Bar와 아이콘의 위치를 애니메이션으로 조정
  const translateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 280], // 280px = Progress Bar의 너비
  });

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"], // Progress Bar 채우기
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.progressBar}>
          {/* Progress Bar의 채워진 부분 */}
          <Animated.View style={[styles.filledBar, { width: progressBarWidth }]} />
          {/* 아이콘 */}
          <Animated.View style={[styles.icon, { transform: [{ translateX }] }]}>
            <Image source={snowflake_icon} style={{width: 16, height: 16}} />
          </Animated.View>
        </View>
      </View>
      {version === 'Time' ? (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{startedAt.format("YYYY년 M월 D일")}</Text>
          <Text style={styles.dateText}>{endDate.format("YYYY년 M월 D일")}</Text>
        </View>
      ) : (
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{`${userPoint}P`}</Text>
          <Text style={styles.pointsText}>{`${totalPoints}P`}</Text>
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
    width: 300, // Progress Bar 전체 너비
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    position: "relative",
  },
  filledBar: {
    height: "100%",
    backgroundColor: colors.indigoBlue, // Progress Bar 색상
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20, // 아이콘 크기
    borderRadius: 10,
    position: "absolute",
    top: -25, // Progress Bar 위로 올리기
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 30
  },
  dateText: {
    color: colors.gray77,
    fontWeight: 500,
    fontSize: 14,
  },
  pointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 10,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.fontMain70,
  }
});

export default ProgressBar;
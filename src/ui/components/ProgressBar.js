import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet, Image, Text } from "react-native";
import { colors } from "../styles/colors";

import snowflake_icon from '../../../assets/snowflak_icon.png';
import ShortAlertArea from "./ShortAlertArea";

const ProgressBar = () => {
  const startDate = new Date("2025-01-06");
  const endDate = new Date("2025-02-06");
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const totalTime = endDate - startDate;
      const timeElapsed = now - startDate;
      const percentage = Math.min((timeElapsed / totalTime) * 100, 100); // 0~100%로 계산
      return percentage;
    };

    const percentage = calculateProgress();
    console.log(startDate)

    // 프로그레스 애니메이션 실행
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500, // 애니메이션 지속 시간
      useNativeDriver: false,
    }).start();
  }, []);

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
          <Image source={snowflake_icon} style={{width:16, height:16}}/>
      
        </Animated.View>
      </View>
    </View>
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{startDate.getFullYear()+'년 '+(startDate.getMonth()+1)+'월 '+startDate.getDate()+'일'}</Text>
      <Text style={styles.dateText}>{endDate.getFullYear()+'년 '+(endDate.getMonth()+1)+'월 '+endDate.getDate()+'일'}</Text>

    </View>
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
    height: 20, // 아이콘 색상
    borderRadius: 10,
    position: "absolute",
    top: -25, // Progress Bar 위로 올리기
  },
  dateContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:300,
    height:30
  },
  dateText:{
    color:colors.gray77,
    fontWeight:500,
    fontSize:14 ,
  }
});

export default ProgressBar;

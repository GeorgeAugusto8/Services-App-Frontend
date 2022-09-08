import React from 'react';
import {Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Metrics = {
    screenHeight: height,
    screenWidth: width,
    baseHeight: height * 0.1,
    baseWidth: width * 0.1
}

export {
    Metrics
}

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import VehicleTrackMapView from '../../pages/home/VehicleTrackMapView';
import HomeScreen from '../../pages/home/HomeScreen';

const homeStack = createStackNavigator();
const HomeStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}
            edges={['left', 'right']}>
            <homeStack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
                initialRouteName='HomeScreen' >
                <homeStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <homeStack.Screen
                    name="VehicleTrackMap"
                    component={VehicleTrackMapView}
                />
            </homeStack.Navigator>
        </SafeAreaView>
    );
};

export default HomeStack;
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../../pages/profile/ProfileScreen';
import UserActivityScreen from '../../pages/profile/UserActivityScreen';

const profileStack = createStackNavigator();
const ProfileStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}
            edges={['left', 'right']}>
            <profileStack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
                initialRouteName='ProfileScreen' >
                <profileStack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                />
                <profileStack.Screen
                    name="UserActivityScreen"
                    component={UserActivityScreen}
                />
            </profileStack.Navigator>
        </SafeAreaView>
    );
};

export default ProfileStack;
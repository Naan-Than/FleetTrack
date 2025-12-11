import React from 'react';
import { Dimensions, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeIcon from '../assets/svg/tab-icons/HomeIcon';
import ProfileIcon from '../assets/svg/tab-icons/ProfileIcon';
import HomeOutlineIcon from '../assets/svg/tab-icons/HomeOutlineIcon';
import ProfileOutlineIcon from '../assets/svg/tab-icons/ProfileOutlineIcon';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from '../pages/profile/ProfileScreen';
import HomeStack from './stacks/homeStack';
import UserActivityScreen from '../pages/profile/UserActivityScreen';
import ProfileStack from './stacks/profileStack';
const { width, height } = Dimensions.get('window');

const MainBottomNav = () => {
    const BottomTab = createBottomTabNavigator();
    const dispatch = useDispatch();
    const theme = 'light';
    const userRole = useSelector((state: any) => state.auth.userRole);

    const TabIcon = ({ icon: Icon }) => {
        return (
            <View style={{ alignItems: 'flex-end', justifyContent: "flex-end" }}>
                <Icon />
            </View>
        );
    };

    const CustomTabBarButton = (props: any) => {
        return (
            <Pressable
                {...props}
                onPress={() => {
                    props.onPress();
                }}
                android_ripple={null}
                style={({ pressed }) => [{ opacity: 1 }, props.style]}
            />
        );
    };

    const getTabBarVisibility = (route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        const hiddenRoutes = ['UserActivityScreen','VehicleTrackMap'];

        return hiddenRoutes.includes(routeName) ? 'none' : 'flex';
    };

    return (
        <BottomTab.Navigator
            initialRouteName={'Home'}
            backBehavior="none"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    ...styles.tabBar,
                    display: getTabBarVisibility(route),
                },
        
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#9E9E9E',
                tabBarLabelStyle: styles.tabBarLabel,
            })}
        >

            <BottomTab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarAccessibilityLabel: 'Home',
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            icon={focused ? HomeIcon : HomeOutlineIcon}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarAccessibilityLabel: 'Profile',
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon
                            icon={focused ? ProfileIcon : ProfileOutlineIcon}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: '#fff',
        height: height * 0.072,
        borderTopColor: '#D9D9D9',
        borderTopWidth: 0.8,
        paddingBottom: 8,
        paddingTop: 4,
        display: 'flex',
        fontFamily: 'SpaceGrotesk-Bold',

    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '400',

    },
    bubbleTabButton: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 3,
        borderColor: '#fff',
    },
});

export default MainBottomNav;

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/store';
import { setUserLocation } from './src/store/slice/locationSlice';

const BackgroundLocationTask = async (taskData) => {
    try {
        const { lat, long } = taskData;
        console.log('Background Location:', lat, long);

        store.dispatch(setUserLocation({ lat, long }));
    } catch (error) {
        console.log('BG Task Error:', error);
    }
};

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('BackgroundLocationTask', () =>
    async (data) => {
        console.log('Background location:', data.lat, data.long);
        await BackgroundLocationTask(data);
    }
);
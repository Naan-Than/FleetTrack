import BackgroundFetch from "react-native-background-fetch";

export const initBackgroundTracking = async () => {
    BackgroundFetch.configure(
        {
            minimumFetchInterval: 1,
            stopOnTerminate: false,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId) => {
            console.log(" Running Background Task:", taskId);
            BackgroundFetch.finish(taskId);

        },
        (error) => {
            console.log("Background Fetch failed", error);
        }
    );

    BackgroundFetch.start();
};

import { useEffect, useRef } from "react";
import MockWebSocket from "../services/MockWebSocket";
import { setLastKnownDrivers } from "../store/slice/driverSlice";
import { useDispatch } from "react-redux";

export const useMockDriverSocket = (
    drivers: any[],
    isOnline: boolean,
    onUpdate: Function
) => {
    const socketRef = useRef<MockWebSocket | null>(null);
      const dispatch = useDispatch();

    useEffect(() => {
        const socket = new MockWebSocket();
        socketRef.current = socket;

        socket.onOpen(() => {
            console.log("Mock WebSocket Connected");
        });

        socket.onMessage((msg: any) => {
            if (msg.type === "DRIVER_UPDATE") {
                onUpdate(msg.drivers);
                dispatch(setLastKnownDrivers(msg.drivers));
            }
        });

        socket.startMockDriverStream();

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.setDrivers(drivers);
        }
    }, [drivers]);

    useEffect(() => {
        if (!socketRef.current) return;

        if (isOnline) {
            console.log("Socket resumed (online)");
            socketRef.current.resume();
        } else {
            console.log("Socket paused (offline mode)");
            socketRef.current.pause();
        }
    }, [isOnline]);

    return socketRef.current;
};

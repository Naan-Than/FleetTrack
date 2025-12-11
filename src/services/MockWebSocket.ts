export default class MockWebSocket {
    listeners = {
        open: [] as Function[],
        message: [] as Function[],
        close: [] as Function[],
    };

    private timer: any = null;
    private drivers: any[] = [];
    private isPaused: boolean = false; 

    constructor() {
        setTimeout(() => {
            this.emit("open", { message: "Mock WebSocket connected" });
        }, 500);
    }

    setDrivers(drivers: any[]) {
        this.drivers = Array.isArray(drivers) ? drivers : [];
    }

    onOpen(callback: Function) {
        this.listeners.open.push(callback);
    }

    onMessage(callback: Function) {
        this.listeners.message.push(callback);
    }

    onClose(callback: Function) {
        this.listeners.close.push(callback);
    }

    emit(type: "open" | "message" | "close", data: any) {
        this.listeners[type].forEach((cb) => cb(data));
    }

    // Pause movement updates (offline)
    pause() {
        this.isPaused = true;
    }

    // Resume movement updates (online)
    resume() {
        this.isPaused = false;
    }

    // Simulate GPS movement
    startMockDriverStream() {
        this.timer = setInterval(() => {
            if (this.isPaused) return;               // 👈 STOP updating offline
            if (!Array.isArray(this.drivers) || this.drivers.length === 0) return;

            const updatedDrivers = this.drivers.map((d) => {
                if (d.status !== "active") return d;

                const newLat = d.lat + (Math.random() - 0.5) * 0.0004;
                const newLong = d.long + (Math.random() - 0.5) * 0.0004;

                return { ...d, lat: newLat, long: newLong };
            });

            this.drivers = updatedDrivers;

            this.emit("message", {
                type: "DRIVER_UPDATE",
                drivers: updatedDrivers,
            });

        }, 3000);
    }

    close() {
        if (this.timer) clearInterval(this.timer);
        this.emit("close", { message: "Mock WebSocket closed" });
    }
}

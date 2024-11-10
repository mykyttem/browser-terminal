import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url, setOutput) => {
    const ws = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // connecting to a WebSocket server
        ws.current = new WebSocket(url);

        // processing an open connection
        ws.current.onopen = () => {
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            setOutput((prevOutput) => [...prevOutput, event.data]);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, setOutput]);

    const sendMessage = (message) => {
        // Checking the status of the WebSocket before sending a message
        if (isConnected && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.warn("WebSocket is not open yet.");
        }
    };

    return { sendMessage, isConnected };
};


export default useWebSocket;
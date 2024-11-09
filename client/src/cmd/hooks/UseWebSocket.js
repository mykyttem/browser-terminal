import { useEffect, useRef } from 'react';

const useWebSocket = (url, setOutput) => {
    const ws = useRef(null);

    useEffect(() => {
        // connecting to a WebSocket server
        ws.current = new WebSocket(url);

        // processing of received messages
        ws.current.onmessage = (event) => {
            setOutput((prevOutput) => [...prevOutput, event.data]);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, setOutput]);

    const sendMessage = (message) => {
        if (ws.current) {
            ws.current.send(message);
        }
    };

    return { sendMessage };
};


export default useWebSocket;
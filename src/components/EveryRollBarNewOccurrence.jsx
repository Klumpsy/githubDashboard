import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

const EveryRollBarOccurrence = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('rollbarEvent', (incomingEvent) => {
            if (incomingEvent.event_name === 'new_item') {
                setMessages(prevMessages => [incomingEvent, ...prevMessages]);
                setHighlightIndex(0);
                setTimeout(() => setHighlightIndex(-1), 1000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='grid-item-container'>
            <div className='title_wrapper'>
                <h2 className='dashboard_item_title'>
                    New Occurrence
                </h2>
            </div>
            <div className={`commitMessagesList`}>
                {messages.map((message, index) => (
                    <div key={message.id || index} className={`commitMessagesItem ${index === highlightIndex ? 'highlight' : ''}`}>
                        <div className={'commit_text'}>
                            <div>
                                <span className={'prefix_indicator_rollbar'}>NEW ERROR: </span> {message?.data?.item?.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EveryRollBarOccurrence;
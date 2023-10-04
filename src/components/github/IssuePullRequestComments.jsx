import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

const IssuePullRequestComments = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [totalCount, setTotalCount] = useState(0);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const datePart = date.toISOString().split('T')[0];
        const timePart = date.toTimeString().split(' ')[0];
        const hoursMinutes = timePart.substring(0, 5);
        return `${hoursMinutes} ${datePart}`;
    };

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on(event, (incomingEvent) => {
            if (incomingEvent.comment && incomingEvent.comment.body) {
                setMessages(prevMessages => [incomingEvent, ...prevMessages]);
                setTotalCount(totalCount => totalCount + 1);
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
                  <span className={'counter_container'}>
                       {totalCount}
                  </span>
                <h2 className='dashboard_item_title'>
                    Comments
                </h2>
            </div>
            <div className='commitMessagesList'>
                {messages.map((message, index) => (
                    <div key={message.id || index} className={`commitMessagesItem ${index === highlightIndex ? 'highlight' : ''}`}>
                        <div className='commit_mess'>
                            <img src={message?.comment?.user?.avatar_url} alt="Avatar"/>
                        </div>
                        <div className={'commit_text'}>
                            <div>
                                <span className={'prefix_indicator'}>Commented on: </span>
                                {message?.issue?.title}
                                <span className='time_indication'>
                                {message?.comment?.created_at && formatDateTime(message?.comment?.created_at)}
                            </span>
                            </div>
                            <div>
                                <span>"{message?.comment?.body}"</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IssuePullRequestComments;
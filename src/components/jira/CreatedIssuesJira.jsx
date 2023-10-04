import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

const CreatedIssuesJira = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on(event, (incomingEvent) => {
            if (incomingEvent.webhookEvent === 'jira:issue_created') {
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
                    New Issues
                </h2>
            </div>
            <div className='commitMessagesList'>
                {messages.map((message, index) => (
                    <div key={message.id || index} className={`commitMessagesItemJira ${index === highlightIndex ? 'highlight' : ''}`}>
                        <div className='commit_mess'>
                            <span className={'prefix_indicator_jira'}>{message?.user?.displayName}</span>
                        </div>
                        <div className={'commit_text'}>
                            <div>
                                <span className={'prefix_indicator'}>{message?.issue?.key}:</span>
                            </div>
                            <div class='jira_text_small'>
                                {message?.issue?.fields?.summary}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatedIssuesJira;
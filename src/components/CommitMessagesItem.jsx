import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

const CommitMessagesItem = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('githubEvent', (incomingEvent) => {
            if (incomingEvent.head_commit && incomingEvent.commits && incomingEvent.commits.length > 0) {
                setMessages(prevMessages => [incomingEvent, ...prevMessages]);
                setTotalCount(totalCount + 1)
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
                    <span class={'counter_container'}>
                        {totalCount}
                    </span>
                    <h2 className='dashboard_item_title'>
                        Commits
                    </h2>
                </div>
                <div className='commitMessagesList'>
                    {messages.map((message, index) => (
                        <div key={message.id || index} className={`commitMessagesItem ${index === highlightIndex ? 'highlight' : ''}`}>
                            <div className='commit_mess'>
                                <img src={message?.sender?.avatar_url} alt="Avatar"/>
                            </div>
                            <div className={'commit_text'}>
                                <div>
                                    <span className={'prefix_indicator'}>{message?.head_commit?.author?.name}: </span> {message?.head_commit?.message}
                                </div>
                                <div>
                                    <span className={'prefix_indicator'}>Branch: </span> {message?.ref?.replace('refs/heads/', '')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default CommitMessagesItem;
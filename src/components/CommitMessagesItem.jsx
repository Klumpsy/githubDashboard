import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4000";

const CommitMessagesItem = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('githubEvent', (incomingEvent) => {
            if(incomingEvent.head_commit) {
                setMessages(prevMessages => [incomingEvent, ...prevMessages]);
                setHighlight(true);
                setTimeout(() => setHighlight(false), 1000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <div class={'title_wrapper'}>
                <h2 className='dashboard_item_title'>
                    Commits
                </h2>
            </div>
            <div className='grid-item-container'>
                <div className={`commitMessagesList ${highlight ? 'highlight' : ''}`}>
                    {messages.map((message, index) => (
                        <div key={index} className='commitMessagesItem'>
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
        </div>
    );
};

export default CommitMessagesItem;
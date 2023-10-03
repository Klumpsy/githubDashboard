import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4000";

const WorkFlowJobItem = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('githubEvent', (incomingEvent) => {
                if(incomingEvent.workflow_job && incomingEvent.action === 'completed') {
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
           <h2 className='dashboard_item_title'>
               Jobs
           </h2>
           <div className='grid-item-container'>
               <div className={`commitMessagesList ${highlight ? 'highlight' : ''}`}>
                   {messages.map((message, index) => (
                       <div key={index} className='commitMessagesItem'>
                           <div className='commit_mess'>
                               <img src={message?.sender?.avatar_url} alt="Avatar"/>
                           </div>
                           <div className={'commit_text'}>
                               <div>
                                   <span className={'prefix_indicator'}>{message?.workflow_job?.head_branch}: </span><span className={message?.workflow_job?.conclusion}>{message?.workflow_job?.workflow_name}</span>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    );
};

export default WorkFlowJobItem;
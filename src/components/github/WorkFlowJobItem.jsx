import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

const WorkFlowJobItem = ({ event }) => {
    const [messages, setMessages] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on(event, (incomingEvent) => {
                if(incomingEvent.workflow_job && incomingEvent.action === 'completed') {
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
              <div className='title_wrappr'>
                  <h2 className='dashboard_item_title'>
                      Jobs
                  </h2>
                  <span className={'counter_container'}>
                       {totalCount}
                  </span>
              </div>
               <div className='commitMessagesList'>
                   {messages.map((message, index) => (
                       <div key={message.id || index} className={`commitMessagesItem ${index === highlightIndex ? 'highlight' : ''}`}>
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
    );
};

export default WorkFlowJobItem;
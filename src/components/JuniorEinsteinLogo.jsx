import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const EventLogoMap = {
    "failure": "/500-image.svg",
    "success": "/happy.gif",
};

const DEFAULT_LOGO = "/logo_no_text.svg";

const JuniorEinsteinLogo = ({ event }) => {
    const [logo, setLogo] = useState(DEFAULT_LOGO);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on(event, (incomingEvent) => {
            if (incomingEvent?.workflow_job?.conclusion) {
                setLogo(EventLogoMap[incomingEvent?.workflow_job?.conclusion]);

                setTimeout(() => {
                    setLogo(DEFAULT_LOGO);
                }, 3000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='grid-item-container grid-item-container_9'>
            <img src={logo} alt={'logo'}/>
        </div>
    );
};

export default JuniorEinsteinLogo;
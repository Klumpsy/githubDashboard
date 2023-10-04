import React, { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import Confetti from 'react-confetti';
import socketIOClient from "socket.io-client";

const ENDPOINT=process.env.REACT_APP_ENDPOINT;

export const BranchMergedEvent = () => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState()

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('githubEvent', (incomingEvent) => {
            if(incomingEvent.action === 'closed' && incomingEvent.pull_request.merged === true) {
                setMessage(incomingEvent);
                setShowConfetti(true);
                setShowModal(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    setShowModal(false);
                }, 10000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            {showConfetti && <Confetti width={width} height={height} />}
            {showModal && <Modal message={message} />}
        </>
    );
}

const Modal = ({message}) => {
    return (
        <div className='merged_branch_modal'>
            <h2>Branch was merged successfully!</h2>
            <div className='commitMessagesItem_modal'>
                <div className='commit_mess_modal'>
                    <img src={message?.pull_request.user?.avatar_url} alt="Avatar"/>
                </div>
                <div className={'commit_text_modal'}>
                    <div>
                        <span className={'prefix_indicator'}>{message?.pull_request?.user?.name}</span>
                        <span>merged:</span>
                        <span className='success merge_lines_of_code'>+ {message?.pull_request?.additions}</span>
                        <span className='failure merge_lines_of_code'>- {message?.pull_request?.deletions}</span>
                        <span>  Lines of code</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
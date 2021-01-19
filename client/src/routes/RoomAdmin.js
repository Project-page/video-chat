import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const RoomAdmin = (props) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const [messageAd, setMessageAd] = useState("");

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:numb.viagenie.ca"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'stunserver101',
                    username: 'tamzidhossainxarir@gmail.com',
                    credentialType: 'password'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };

    function sendMessage(message){
        socketRef.current.emit("fromBtn", message);
        setMessageAd(message);
        console.log("sent");
    }

    return (
        <div class="row">
            <div class="column">
                <h1>Saccades</h1>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("line small")}>line small</button>
                    <button class="button" onClick={()=>sendMessage("line large")}>line large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("L small")}>L small</button>
                    <button class="button" onClick={()=>sendMessage("L large")}>L large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("U small")}>U small</button>
                    <button class="button" onClick={()=>sendMessage("U large")}>U large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("Rect small")}>Rect small</button>
                    <button class="button" onClick={()=>sendMessage("Rect large")}>Rect large</button>
                </div>
            </div>

            <div class="column">
                <video autoPlay ref={userVideo} style={{width:0,visibility:"hidden"}}/>
                <video autoPlay ref={partnerVideo} />

                <p>{messageAd}</p>
            </div>

            <div class="column">
                
            <h1>Pursuit</h1>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>line slow small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>line slow large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>line fast small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>line fast large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>L slow small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>L slow large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>L fast small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>L fast large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>U slow small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>U slow large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>U fast small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>U fast large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>Rect slow small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>Rect slow large</button>
                </div>
                <div class="row">
                    <button class="button" onClick={()=>sendMessage("From Button 1")}>Rect fast small</button>
                    <button class="button" onClick={()=>sendMessage("From Button 2")}>Rect fast large</button>
                </div>
            </div>
        </div>   
    );
};

export default RoomAdmin;
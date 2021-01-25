import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();

  const [message, setMessage] = useState("");
  const [gif, setGif] = useState(false);
  const [image, setImage] = useState(false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [image6, setImage6] = useState(false);
  const [image7, setImage7] = useState(false);
  const [image8, setImage8] = useState(false);

  const [giflss, setGiflss] = useState(false);
  const [giflsl, setGiflsl] = useState(false);
  const [giflfs, setGiflfs] = useState(false);
  const [giflfl, setGiflfl] = useState(false);
  const [gifLss, setGifLss] = useState(false);
  const [gifLsl, setGifLsl] = useState(false);
  const [gifLfs, setGifLfs] = useState(false);
  const [gifLfl, setGifLfl] = useState(false);
  const [gifUss, setGifUss] = useState(false);
  const [gifUsl, setGifUsl] = useState(false);
  const [gifUfs, setGifUfs] = useState(false);
  const [gifUfl, setGifUfl] = useState(false);
  const [gifrss, setGifrss] = useState(false);
  const [gifrsl, setGifrsl] = useState(false);
  const [gifrfs, setGifrfs] = useState(false);
  const [gifrfl, setGifrfl] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/");
        socketRef.current.emit("join room", props.match.params.roomID);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        socketRef.current.on("incomingMessage", (message) => {
          if (message === "line small") {
            //setGif(true)
            setImage1(true);
            document.getElementById("ViewPlace").style.width = "50%";
            document.getElementById("ViewPlace").src = "/lineBase.png";
            document.getElementById("ClientBtnPlace").style.visibility =
              "visible";
          } else {
            setImage1(false);
          }
          if (message === "line large") {
            setImage2(true);
            document.getElementById("ViewPlace").style.width = "100%";
            document.getElementById("ViewPlace").src = "/lineBase.png";
            document.getElementById("ClientBtnPlace").style.visibility =
              "visible";
          } else {
            setImage2(false);
          }
          if (message === "L small") {
            //setGif(true)
            setImage3(true);
          } else {
            setImage3(false);
          }
          if (message === "L large") {
            setImage4(true);
          } else {
            setImage4(false);
          }
          if (message === "U small") {
            //setGif(true)
            setImage5(true);
          } else {
            setImage5(false);
          }
          if (message === "U large") {
            setImage6(true);
          } else {
            setImage6(false);
          }
          if (message === "Rect small") {
            //setGif(true)
            setImage7(true);
          } else {
            setImage7(false);
          }
          if (message === "Rect large") {
            setImage8(true);
          } else {
            setImage8(false);
          }
          if (message === "Rect fast small") {
            setGifrfs(true);
            document.getElementById("ViewPlace").style.width = "50%";
            document.getElementById("ViewPlace").src = "/RectBase.png";
            document.getElementById("ClientBtnPlace").style.visibility =
              "visible";
          } else {
            setGifrfs(false);
          }
          if (message === "Rect fast large") {
            setGifrfl(true);
            document.getElementById("ViewPlace").style.width = "100%";
            document.getElementById("ViewPlace").src = "/RectBase.png";
            document.getElementById("ClientBtnPlace").style.visibility =
              "visible";
          } else {
            setGifrfl(false);
          }

          setMessage(message);
        });
      });
  }, []);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(userID) {
    // const peer = new RTCPeerConnection({
    //   iceServers: [{ url: "stun:stun.l.google.com:19302" }],
    // });
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  function clientButton(message) {
    socketRef.current.emit("fromBtn", message);
    //setMessageAd(message);
    //var txt = "All working";
    //if (message === "Start") document.getElementById("demo").innerHTML = txt;

    console.log("sent");
    if (image1) document.getElementById("ViewPlace").src = "/line.png";
    else if (image2) {
      document.getElementById("ViewPlace").style.width = "100%";
      document.getElementById("ViewPlace").src = "/line.png";
    } else if (gifrfs) {
      document.getElementById("ViewPlace").style.width = "50%";
      document.getElementById("ViewPlace").src = "/Rect_400px.gif";
    } else if (gifrfl) {
      document.getElementById("ViewPlace").style.width = "100%";
      document.getElementById("ViewPlace").src = "/Rect_400px.gif";
    }

    //else if (gifrfs) document.getElementById("ViewPlace").src = "/100px.gif";

    document.getElementById("ClientBtnPlace").style.visibility = "hidden";
  }
  //<img class="two" src = "/line.png" width="906" height="458" align="center"/>
  //<img src = "/line.png" width="906" height="458" align="center"/>
  //{gif?<img src="https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/explore/ology-images/brain/optical-illustions/disappearing-dot/2933633-1-eng-US/disappearing-dot.gif"
  //                  width="320" height="240" align="center" />:""}
  return (
    <div>
      <video autoPlay ref={userVideo} width="200" height="200" align="center" />

      <video
        autoPlay
        ref={partnerVideo}
        style={{ visibility: "hidden", width: 0 }}
      />
      <p>{message}</p>

      <p id="demo"></p>
      <img id="ViewPlace" style={{ width: "50%" }} align="center" />
      <img id="ViewPlaceLarge" style={{ width: "100%" }} align="center" />
      <div>
        <button
          id="ClientBtnPlace"
          class="button"
          style={{ visibility: "hidden" }}
          onClick={() => clientButton("Start")}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Room;

//<div>
//       <button class="button" onClick={() => clientButton("Start")}>
//       Start
//     </button>
//    </div>

// {image1 ? (
//   <div>
//     <div class="row">
//       <img src="/line1.png" style={{ width: "50%" }} align="center" />
//     </div>
//     <div class="row">
//       <button class="button" onClick={() => clientButton("Start")}>
//         Start
//       </button>
//     </div>
//   </div>
// ) : (
//   ""
// )}
// {image2 ? (
//   <img src="/line1.png" style={{ width: "100%" }} align="center" />
// ) : (
//   ""
// )}
// {image3 ? (
//   <img src="/L1.png" width="250" height="250" align="center" />
// ) : (
//   ""
// )}
// {image4 ? (
//   <img src="/L1.png" width="408" height="408" align="center" />
// ) : (
//   ""
// )}
// {image5 ? (
//   <img src="/U1.png" width="250" height="250" align="center" />
// ) : (
//   ""
// )}
// {image6 ? (
//   <img src="/U1.png" width="408" height="408" align="center" />
// ) : (
//   ""
// )}
// {image7 ? (
//   <img src="/Gif1.png" style={{ width: "50%" }} align="center" />
// ) : (
//   ""
// )}
// {image8 ? (
//   <img src="/Gif1.png" style={{ width: "100%" }} align="center" />
// ) : (
//   ""
// )}

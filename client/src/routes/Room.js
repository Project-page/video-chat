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
          document.getElementById("ViewPlace").style.visibility = "visible";
          document.getElementById("ClientStartBtn").style.visibility =
            "visible";
          if (message === "line small") {
            //setGif(true)
            setImage1(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setImage1(false);
          }
          if (message === "line large") {
            setImage2(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setImage2(false);
          }
          if (message === "L small") {
            setImage3(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setImage3(false);
          }
          if (message === "L large") {
            setImage4(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setImage4(false);
          }
          if (message === "U small") {
            setImage5(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setImage5(false);
          }
          if (message === "U large") {
            setImage6(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setImage6(false);
          }
          if (message === "Rect small") {
            setImage7(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
          } else {
            setImage7(false);
          }
          if (message === "Rect large") {
            setImage8(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
          } else {
            setImage8(false);
          }

          // ------------------------------------------Gifs here-----------------------------------------------//
          if (message === "line slow small") {
            setGiflss(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setGiflss(false);
          }
          if (message === "line slow large") {
            setGiflsl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setGiflsl(false);
          }
          if (message === "line fast small") {
            setGiflfs(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setGiflfs(false);
          }
          if (message === "line fast large") {
            setGiflfl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/lineBase.png";
          } else {
            setGiflfl(false);
          }
          if (message === "L slow small") {
            setGifLss(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setGifLss(false);
          }
          if (message === "L slow large") {
            setGifLsl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setGifLsl(false);
          }
          if (message === "L fast small") {
            setGifLfs(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setGifLfs(false);
          }
          if (message === "L fast large") {
            setGifLfl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/LBase.png";
          } else {
            setGifLfl(false);
          }
          if (message === "U slow small") {
            setGifUss(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setGifUss(false);
          }
          if (message === "U slow large") {
            setGifUsl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setGifUsl(false);
          }
          if (message === "U fast small") {
            setGifUfs(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setGifUfs(false);
          }
          if (message === "U fast large") {
            setGifUfl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/UBase.png";
          } else {
            setGifUfl(false);
          }
          if (message === "Rect slow small") {
            setGifrss(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
          } else {
            setGifrss(false);
          }
          if (message === "Rect slow large") {
            setGifrsl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
          } else {
            setGifrsl(false);
          }
          if (message === "Rect fast small") {
            setGifrfs(true);
            document.getElementById("ViewPlace").style.width = "188px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
          } else {
            setGifrfs(false);
          }
          if (message === "Rect fast large") {
            setGifrfl(true);
            document.getElementById("ViewPlace").style.width = "375px";
            document.getElementById("ViewPlace").src = "/RectBase.png";
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

  function clientStart(message) {
    socketRef.current.emit("fromBtn", message);
    document.getElementById("ViewPlace").style.visibility = "visible";
    //setMessageAd(message);
    //var txt = "All working";
    //if (message === "Start") document.getElementById("demo").innerHTML = txt;

    console.log("sent");
    if (image1) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/line.png";
    } else if (image2) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/line.png";
    } else if (image3) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/L.png";
    } else if (image4) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/L.png";
    } else if (image5) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/U.png";
    } else if (image6) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/U.png";
    } else if (image7) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/Rect.png";
    } else if (image8) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/Rect.png";
    }
    //-----------------------------gifs-----------------------------------------
    else if (giflss) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/line_250px.gif";
    } else if (giflsl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/line_250px.gif";
    } else if (giflfs) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/line_500px.gif";
    } else if (giflfl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/line_500px.gif";
    } else if (gifLss) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/L_250px.gif";
    } else if (gifLsl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/L_250px.gif";
    } else if (gifLfs) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/L_500px.gif";
    } else if (gifLfl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/L_500px.gif";
    } else if (gifUss) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/U_250px.gif";
    } else if (gifUsl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/U_250px.gif";
    } else if (gifUfs) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/U_500px.gif";
    } else if (gifUfl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/U_500px.gif";
    } else if (gifrss) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/Rect_250px.gif";
    } else if (gifrsl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/Rect_250px.gif";
    } else if (gifrfs) {
      document.getElementById("ViewPlace").style.width = "188px";
      document.getElementById("ViewPlace").src = "/Rect_500px.gif";
    } else if (gifrfl) {
      document.getElementById("ViewPlace").style.width = "375px";
      document.getElementById("ViewPlace").src = "/Rect_500px.gif";
    }

    //else if (gifrfs) document.getElementById("ViewPlace").src = "/100px.gif";

    document.getElementById("ClientStartBtn").style.visibility = "hidden";
    document.getElementById("ClientDoneBtn").style.visibility = "visible";
  }

  function clientDone(message) {
    socketRef.current.emit("fromBtn", message);

    //var txt = "All working";
    //if (message === "Start") document.getElementById("demo").innerHTML = txt;

    console.log("Done");

    document.getElementById("ClientStartBtn").style.visibility = "hidden";
    document.getElementById("ClientDoneBtn").style.visibility = "hidden";
    document.getElementById("ViewPlace").style.visibility = "hidden";
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
      {/* <img id="ViewPlace" style={{ width: "50%" }} align="center" /> */}
      {/* <img id="ViewPlaceLarge" style={{ width: "100%" }} align="center" /> */}
      <img id="ViewPlace" style={{ width: "375px" }} align="center" />

      <div>
        <button
          id="ClientStartBtn"
          class="button"
          style={{ visibility: "hidden" }}
          onClick={() => clientStart("Start")}
        >
          Start
        </button>
        <button
          id="ClientDoneBtn"
          class="button"
          style={{ visibility: "hidden" }}
          onClick={() => clientDone("Done")}
        >
          Done
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

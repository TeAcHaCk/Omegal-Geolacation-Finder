window.oRTCPeerConnection =
    window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);

    pc.oaddIceCandidate = pc.addIceCandidate;

    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(" ");

        console.log(iceCandidate.candidate);
        const ip = fields[4];
        if (fields[7] === "srflx") {
            getLocation(ip);
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
};
// Use the API to be able to locate the person thanks to an IP :)
let getLocation = async (ip) => {
                
    let url = `https://ipapi.co/${ip}/json/`;

    await fetch(url).then((response) =>
        response.json().then((json) => {
            const output = `
-------------------------------
IP: ${ip}
Open New Tab: ${url}
-------------------------------
by L14 :)
          `;
            console.log(output);
        })
    );
};
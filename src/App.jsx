import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlObj = new URL(url);
  return new URLSearchParams(urlObj.search);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);

  let myMeeting = async (element) => {
    const appID = 816128556;
    const serverSecret = 'c484262f5d6882cedaa3ce352e7055a0';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },

      showScreenSharingButton: false,
      maxUsers: 100,
    });
  };

  return (
   
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: '100%', height: '100vh', background:'white',borderRadius: '10px', 
          border: '1px solid black' }}
      ></div> 
  );
}

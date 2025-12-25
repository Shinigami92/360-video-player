(async function (window, videojs) {
    let player = window.player = videojs('my-video', {
        controls: true,
        autoplay: true,
        controlBar: {
            pictureInPictureToggle: false,
            fullscreenToggle: false,
            remainingTimeDisplay: {
                displayNegative: false
            }
        }
    });
    player.mediainfo = player.mediainfo || {};
    player.mediainfo.projection = '360';
    while (!player.vr){
        // ugly hack to wait for the VR plugin to load
        console.log('Waiting for VR');
        await new Promise(r => setTimeout(r, 5));
    }

    window.vr = player.vr({ projection: 'AUTO', debug: true, forceCardboard: false });
    let vr = window.vr;

    // Add keyboard event listener for fullscreen toggle
    document.addEventListener('keydown', function(event) {
        // Check for 'F' key (keyCode 70 or key === 'f' or key === 'F')
        // or 'F11' key (keyCode 122 or key === 'F11')
        if (event.key === 'f' || event.key === 'F' || event.keyCode === 70) {
            event.preventDefault();
            toggleFullscreen();
        } else if (event.key === 'F11' || event.keyCode === 122) {
            event.preventDefault();
            toggleFullscreen();
        }
    });

    function toggleFullscreen() {
        if (player.isFullscreen()) {
            player.exitFullscreen();
        } else {
            player.requestFullscreen();
        }
    }
}(window, window.videojs));
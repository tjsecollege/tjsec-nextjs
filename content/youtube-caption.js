        var rsBannerYtPlayer;
        function rsDisableBannerCaptions(player) {
            try {
                player.setOption('captions', 'track', {});
                player.setOption('captions', 'reload', false);
            } catch (e) {}
        }
        function onYouTubeIframeAPIReady() {
            rsBannerYtPlayer = new YT.Player('rs-banner-yt-player', {
                events: {
                    onReady: function (e) {
                        rsDisableBannerCaptions(e.target);
                    },
                    onStateChange: function (e) {
                        rsDisableBannerCaptions(e.target);
                    }
                }
            });
        }
        (function () {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        })();

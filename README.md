# Matching HTML5 videos to a background color
This is an example on how to handle the color derivation bug concerning html5 videos that should be inserted seamlessly into a website. I use this mostly for big videos that integrate into the landing page. The full explanation on how it works can be read [here](https://sansho.studio/blog/html-videos-correct-background-color).

![drivation bug](example.gif "example gif")

Basically it renders the video onto a canvas and keeps it in sync with the hidden video. Simultaneously it picks up the background color of the video frame and adjusts the websites color.

The original solution comes from [Feng](https://stackoverflow.com/questions/35214962/html5-video-background-color-not-matching-background-color-of-website-in-some#44523649). I added retina support and a fallback for browsers with blocked autoplay (thanks safari mobile).

Feel free to improve :)
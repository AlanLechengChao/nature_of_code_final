# nature_of_code_final
We have learned about Reynold's steering force and relevant algorithms, so it's possible to simulate animal behaviors at a macroscopic level. I came up with the idea of drawing realistic crows, not only does it symbolizes a lot of meanings in different cultures, but because of its full black body, it is very easy to draw in terms of coloring. 

A lot of photographers like to shoot crows in black and white, especially Masahisa Fukase, and I believe this minimalism-ish black and white style is achievable using p5 sketches.









IMAGE
MASAHISA FUKASE –– THE SOLITUDE OF RAVENS

I personally sketched the crows before I have drawn it with code. And with the foreseeable way of myself drawing with Bezier curves in p5.js









IMAGE
MASAHISA FUKASE –– THE SOLITUDE OF RAVENS

This turned out to be very successful and I drew it on p5.js afterward. 









VIDEO



This is the basic static/standing status of the crow. When it is standing, legs will be displayed but otherwise, it will not.

It will have the seek behavior. Especially in order to make it more natural, I programmed the frequency of the flapping behavior. As birds usually flap more frequently when they lower their speed to stop in the air and finally withdraw their wings. Hence I let my crow flap normally when it is at a high speed, and let it flap frequently when it almost arrives at a target, and finally, it stands on the target position.









VIDEO



At first, I have thought about making a realistic atmosphere as the background of the crows, such as clouds, trees, and houses, etc. But then I would think that firstly it is very hard to make a realistic atmosphere pure realistic, and it may still ruin the overall aesthetics of this work. Eventually, I choose to metaphor a Chinese character as the actual tree.









IMAGE



Where the crows land on the character “鸦” which means crow. That font is a calligraphy style developed by Song Hui Zong, an emperor and an artist back in the days. This font style fits the overall feeling of this piece.

Not only the visual simulation matter, but I also tend to create a corresponding soundscape. The crow prototype has their tweeting "Ah" sound built-in, and a function can trigger them to make a sound; Whenever they flap their wings, a flap sound effect will be triggered to play (even though it is not that obvious in the video, as sound are compressed). Another way I developed the soundscape is in the second chapter where the birds act corresponding to the thunder sample I found. 

The last part is where I gave the crows metaphorical meanings. As we all know, crows are scavengers so that they often symbolize death in a lot of cultures in the world. Also in a lot of places, crows are seen as communicators with gods, since they tend to appear around dead things and ceremonies. Hence in the last part, I simulated their food-finding behaviors. To simplify realistic symbols, I replaced realistic forests with distorted-angled lines, realistic foods (maybe dead corpses) also with lines (that looks even a little bit scary). 












IMAGE



In this scene, the crows will choose to seek for the nearest food, and after they finish the food, they will seek another nearest food, they also detect other crows' existence, and to avoid them. So there will be circumstances that the crows are fighting for one piece of food. 

As the crows symbolize death, I feel it is wonderful to let the users "kill" them by giving them interactions. I came across some interactions similar to a mobile game that appeared a long time ago: Fruit Ninja. The users will have interactions on the screen to metaphor as a knife, that slices the object in front of. I then introduce the red color to represent the knife. The visuals will also have reactions to the users' killing actions. The background will go dark if it is currently bright. This is really playable with RGB grayscale values to make contrasts in brightness. As the crows look completely black, yet they are not, they have 30 out of 255 of grayscale. So it will appear under a completely black background. Also, the gray lines in the back help me to make the crows more visible. 









IMAGE



After the users kill all the crows on the screen, the final game over the scene will appear. It is very rich in meanings, with the characters 死亡, which means death. I removed the auto-refreshing background to make every trace visible. The outcomes give a very chaotic atmosphere, which is satisfying.









IMAGE


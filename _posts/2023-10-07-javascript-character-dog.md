---
layout: base
title: Dog Animation
description: Use JavaScript without external libraries to animate a sprite. Layer is in OOP style.
image: /images/dogSprite.png
type: ccc
courses: { csse: {week: 1} }
---

{% assign spriteImage = site.baseurl | append: page.image %}

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog Animation</title>
</head>

<body>
    <div id="controls">
        <button id="toggleCanvasEffect">Invert</button>
        <input type="radio" name="animation" id="idle" checked>
        <label for="idle">Idle</label>
        <input type="radio" name="animation" id="barking">
        <label for="barking">Barking</label>
        <input type="radio" name="animation" id="walking">
        <label for="walking">Walking</label>
    </div>
    <div>
        <canvas id="spriteContainer">
            <img id="dogSprite" src="{{site.baseurl}}/images/dogSprite.png">
        </canvas>
    </div>
    <script>
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        var isFilterEnabled = true;
        const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
        toggleCanvasEffect.addEventListener("click", function () {
            if (isFilterEnabled) {
                canvas.style.filter = "none";
            } else {
                canvas.style.filter = defaultFilter;
            }
            isFilterEnabled = !isFilterEnabled;
        });
        window.addEventListener('load', function () {
            const SPRITE_WIDTH = 160;
            const SPRITE_HEIGHT = 144;
            const FRAME_LIMIT = 48;
            const SCALE_FACTOR = 2;
            canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
            canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;
            class Dog {
                constructor() {
                    this.image = document.getElementById("dogSprite");
                    this.x = 0;
                    this.y = 0;
                    this.minFrame = 0;
                    this.maxFrame = FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.speed = 5; // Adjust the speed as needed
                }
                draw(context) {
                    context.drawImage(
                        this.image,
                        this.frameX * SPRITE_WIDTH,
                        this.frameY * SPRITE_HEIGHT,
                        SPRITE_WIDTH,
                        SPRITE_HEIGHT,
                        this.x,
                        this.y,
                        canvas.width,
                        canvas.height
                    );
                }
                update() {
                    if (this.frameX < this.maxFrame) {
                        this.frameX++;
                    } else {
                        this.frameX = 0;
                    }
                }
                move(direction) {
                    switch (direction) {
                        case 'ArrowUp':
                            this.y -= this.speed;
                            break;
                        case 'ArrowLeft':
                            this.x -= this.speed;
                            break;
                        case 'ArrowDown':
                            this.y += this.speed;
                            break;
                        case 'ArrowRight':
                            this.x += this.speed;
                            break;
                        default:
                            break;
                    }
                }
            }
            const dog = new Dog();
            const controls = document.getElementById('controls');
            controls.addEventListener('click', function (event) {
                if (event.target.tagName === 'INPUT') {
                    const selectedAnimation = event.target.id;
                    switch (selectedAnimation) {
                        case 'idle':
                            dog.frameY = 0;
                            break;
                        case 'barking':
                            dog.frameY = 1;
                            break;
                        case 'walking':
                            dog.frameY = 2;
                            break;
                        default:
                            break;
                    }
                }
            });
            window.addEventListener('keydown', function (event) {
                const key = event.key;
                if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
                    dog.move(key);
                }
            });
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                dog.draw(ctx);
                dog.update();
                requestAnimationFrame(animate);
            }
            animate();
        });
    </script>
</body>

</html>

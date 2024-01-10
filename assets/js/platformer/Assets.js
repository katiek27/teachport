// need to export the coin value so that it can disappear once the colliison is activated
// this is the easiest solution... make a js file and import that into player

export const assets = {
    obstacles: {
      tube: { src: "/images/platformer/obstacles/tube.png" },
    },
    platforms: {
      grass: { src: "/images/platformer/platforms/grass.png" },
      alien: { src: "/images/platformer/platforms/alien.png" }
    },
    platformO: {
      grass: { src: "/images/brick_wall.png" },
   },  
    thing: { 
      coin: { src: "/images/Coin.png" } 
    }, 
    backgrounds: {
      start: { src: "/images/platformer/backgrounds/home.png" },
      hills: { src: "/images/platformer/backgrounds/hills.png" },
      mountains: { src: "/images/platformer/backgrounds/mountains.jpg"},
      planet: { src: "/images/platformer/backgrounds/planet.jpg" },
      avenida: { src: "/images/platformer/backgrounds/avenida-1.png" },
      castles: { src: "/images/platformer/backgrounds/castles.png" },
      end: { src: "/images/platformer/backgrounds/game_over.png" },
    },
    players: {
      mario: {
        src: "/images/platformer/sprites/mario.png",
        width: 256,
        height: 256,
        w: { row: 10, frames: 15 },
        wa: { row: 11, frames: 15 },
        wd: { row: 10, frames: 15 },
        a: { row: 3, frames: 7, idleFrame: { column: 7, frames: 0 } },
        s: { row: 12, frames: 15 },
        d: { row: 2, frames: 7, idleFrame: { column: 7, frames: 0 } }
      },
      monkey: {
        src: "/images/platformer/sprites/monkey.png",
        width: 40,
        height: 40,
        w: { row: 9, frames: 15 },
        wa: { row: 9, frames: 15 },
        wd: { row: 9, frames: 15 },
        a: { row: 1, frames: 15, idleFrame: { column: 7, frames: 0 } },
        s: {  },
        d: { row: 0, frames: 15, idleFrame: { column: 7, frames: 0 } }
        // f: { row: 12, frames: 15 }
      },
      lopez: {
        src: "/images/platformer/sprites/lopezanimation.png", // Modify this to match your file path
        width: 46,
        height: 52.5,
        idle: { row: 6, frames: 1, idleFrame: {column: 1, frames: 0} },
        a: { row: 1, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Right Movement
        d: { row: 2, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Left Movement 
        runningLeft: { row: 5, frames: 4, idleFrame: {column: 1, frames: 0} },
        runningRight: { row: 4, frames: 4, idleFrame: {column: 1, frames: 0} },
        s: {}, // Stop the movement 
      },
    },
    enemies: {
      goomba: {
        src: "/images/platformer/sprites/goomba.png",
        width: 448,
        height: 452,
      }
    },
    scaffolds: {
        brick: { src: "images/platformer/obstacles/brick_wall.png" }, 
    },
  }
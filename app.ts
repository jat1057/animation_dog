(() => {
  const dropdown = document.getElementById('animations') as HTMLSelectElement;
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const CANVAS_WIDTH = canvas.width = 600;
  const CANVAS_HEIGHT = canvas.height = 600;

  const playerImage = new Image();
  playerImage.src = './assets/img/shadow_dog.png';

  let playerState: string = 'idle';

  dropdown.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    playerState = target.value;
  });

  const spriteWidth = 575;
  const spriteHeight = 523;

  let gameFrame = 0;
  const staggerFrame = 5;

  interface FrameLocation {
    x: number;
    y: number;
  }

  interface AnimationFrames {
    loc: FrameLocation[];
  }

  const spriteAnimation: Record<string, AnimationFrames> = {};

  const animationStates = [
    { name: 'idle', frames: 7 },
    { name: 'jump', frames: 7 },
    { name: 'fall', frames: 7 },
    { name: 'run', frames: 9 },
    { name: 'dizzy', frames: 11 },
    { name: 'sit', frames: 5 },
    { name: 'roll', frames: 7 },
    { name: 'bite', frames: 7 },
    { name: 'ko', frames: 12 },
    { name: 'getHit', frames: 4 }
  ];

  animationStates.forEach((state, index) => {
    let frames: AnimationFrames = { loc: [] };
    for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = index * spriteHeight;
      frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimation[state.name] = frames;
  });

  function animate(): void {
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimation[playerState].loc.length;
    let frameX = spriteAnimation[playerState].loc[position].x;
    let frameY = spriteAnimation[playerState].loc[position].y;

    ctx.drawImage(
      playerImage,
      frameX, frameY,
      spriteWidth, spriteHeight,
      0, 0,
      spriteWidth, spriteHeight
    );

    gameFrame++;
    requestAnimationFrame(animate);
  }

  playerImage.onload = () => {
    animate();
  };
})();

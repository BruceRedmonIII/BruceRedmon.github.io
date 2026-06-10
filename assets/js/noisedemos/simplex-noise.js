const GRADIENTS_2D = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function GetGradient(ix, iy, seed) {
  const hash = Get2DNoise(ix, iy, seed);
  return GRADIENTS_2D[Math.abs(hash) % GRADIENTS_2D.length];
}

function DotGradient(ix, iy, x, y, seed) {
  const gradient = GetGradient(ix, iy, seed);

  const dx = x - ix;
  const dy = y - iy;

  return dx * gradient[0] + dy * gradient[1];
}

function GetSimplexNoise(x, y, seed) {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

  const skew = (x + y) * F2;

  const i = Math.floor(x + skew);
  const j = Math.floor(y + skew);

  const unskew = (i + j) * G2;

  const cellOriginX = i - unskew;
  const cellOriginY = j - unskew;

  const x0 = x - cellOriginX;
  const y0 = y - cellOriginY;

  let i1;
  let j1;

  if (x0 > y0) {
    i1 = 1;
    j1 = 0;
  } else {
    i1 = 0;
    j1 = 1;
  }

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;

  const x2 = x0 - 1.0 + 2.0 * G2;
  const y2 = y0 - 1.0 + 2.0 * G2;

  let n0 = 0;
  let n1 = 0;
  let n2 = 0;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 > 0) {
    t0 *= t0;

    n0 = t0 * t0 * DotGradient(i, j, x, y, seed);
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 > 0) {
    t1 *= t1;

    n1 = t1 * t1 * DotGradient(i + i1, j + j1, x, y, seed);
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 > 0) {
    t2 *= t2;

    n2 = t2 * t2 * DotGradient(i + 1, j + 1, x, y, seed);
  }

  const value = 70.0 * (n0 + n1 + n2);

  return value;
}

function GetSimplexNoiseWithOctaves(x, y, canvas, config, seed) {
  let amplitude = 1.0;
  let frequency = 1.0;

  let totalNoise = 0.0;
  let totalAmplitude = 0.0;

  let octaveSeed = seed;

  for (let octave = 0; octave < config.numOfOctaves; octave++) {
    octaveSeed = BitShiftSeed(1, octaveSeed);

    const noise = GetSimplexNoise(x * frequency, y * frequency, octaveSeed);

    totalNoise += noise * amplitude;
    totalAmplitude += amplitude;

    amplitude *= config.persistence;
    frequency *= config.lacunarity;
  }

  return totalNoise / totalAmplitude;
}

function GenerateSimplexNoiseImage(seed, canvas, config) {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const noise = GetSimplexNoiseWithOctaves(
        x * config.magnitude,
        y * config.magnitude,
        canvas,
        config,
        seed,
      );
      const normalized = (noise + 1) * 0.5;
      const color = Math.floor(normalized * 255);

      const index = (y * canvas.width + x) * 4;

      canvas.data[index] = color;
      canvas.data[index + 1] = color;
      canvas.data[index + 2] = color;
      canvas.data[index + 3] = 255;
    }
  }

  canvas.ctx.putImageData(canvas.imageData, 0, 0);
}

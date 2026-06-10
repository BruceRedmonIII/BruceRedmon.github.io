class NoiseCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.imageData = this.ctx.createImageData(this.width, this.height);
    this.data = this.imageData.data; // This is a Uint8ClampedArray
  }
}

class NoiseMapConfig {
  constructor(
    magnitude,
    noiseInputRange,
    persistence,
    lacunarity,
    numOfOctaves,
  ) {
    this.magnitude = magnitude;
    this.noiseInputRange = noiseInputRange;
    this.persistence = persistence;
    this.lacunarity = lacunarity;
    this.numOfOctaves = numOfOctaves;
  }
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const lerp = (a, b, t) => a + t * (b - a);

function SmootherStep(value, min = 0, max = 1) {
  const t = clamp((value - min) / (max - min), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function Normalize(value, min, max) {
  return (value - min) / (max - min);
}

function Get2DNoiseVector(x, y, seed) {
  const hash = Get2DNoise(x, y, seed);

  // Convert hash into angle in radians
  const angle = ((hash >>> 0) / 4294967295.0) * Math.PI * 2.0;

  return [Math.cos(angle), Math.sin(angle)];
}

function CalculateGradientDot(gridX, gridY, sampleX, sampleY, seed) {
  const gradient = Get2DNoiseVector(gridX, gridY, seed);

  const dx = sampleX - gridX;
  const dy = sampleY - gridY;

  return dx * gradient[0] + dy * gradient[1];
}

function ConvertToNoiseSpace(x, y, width, height, noiseRange) {
  return [(x / width) * noiseRange, (y / height) * noiseRange];
}

function BitShiftSeed(count, seed) {
  const kBitNoise1 = 0x68e31da4;
  const kBitNoise2 = 0xb5297a4d;
  const kBitNoise3 = 0x1b56c4e9;

  seed = seed >>> 0;

  for (let i = 0; i < count; ++i) {
    seed = Math.imul(seed, kBitNoise1) >>> 0;
    seed ^= seed >>> 8;

    seed = Math.imul(seed, kBitNoise2) >>> 0;
    seed ^= (seed << 8) >>> 0;

    seed = Math.imul(seed, kBitNoise3) >>> 0;
    seed ^= seed >>> 8;
  }

  return seed >>> 0;
}

function Get1DNoise(x, seedOverride) {
  const kBitNoise1 = 0x68e31da4;
  const kBitNoise2 = 0xb5297a4d;
  const kBitNoise3 = 0x1b56c4e9;

  let mangledBits = x >>> 0;

  mangledBits = Math.imul(mangledBits, kBitNoise1) >>> 0;
  mangledBits = (mangledBits + seedOverride) >>> 0;
  mangledBits ^= mangledBits >>> 8;

  mangledBits = Math.imul(mangledBits, kBitNoise2) >>> 0;
  mangledBits ^= (mangledBits << 8) >>> 0;

  mangledBits = Math.imul(mangledBits, kBitNoise3) >>> 0;
  mangledBits ^= mangledBits >>> 8;

  return mangledBits >>> 0;
}

function Get2DNoise(x, y, seedOverride) {
  const kPrime = 198491317;
  return Get1DNoise(x + Math.imul(kPrime, y), seedOverride);
}

function NormalizeNoiseValue(noiseValue) {
  // SquirrelRNG returns noise values in the range [0, 2^32 - 1], so we need to normalize it to the range [0, 1]
  return noiseValue / 4294967295; // 4294967295 is 2^32 - 1
}

function GenerateRandomNoiseImage(seed, canvas, config) {
  // Clear the canvas before drawing the new noise pattern
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Loop through the pixel data array and set the RGBA values for each pixel
  for (let y = 0; y < canvas.height; ++y) {
    for (let x = 0; x < canvas.width; ++x) {
      const noiseValue =
        NormalizeNoiseValue(
          Get2DNoise(x * config.magnitude, y * config.magnitude, seed),
        ) * 255; // Get the noise value for this pixel and scale it to the range [0, 255]
      const index = (y * canvas.width + x) * 4; // Calculate the starting index for this pixel in the data array
      canvas.data[index] = noiseValue; // Red channel
      canvas.data[index + 1] = noiseValue; // Green channel
      canvas.data[index + 2] = noiseValue; // Blue channel
      canvas.data[index + 3] = 255; // Alpha channel (fully opaque)
    }
  }
  // Push the updated pixel data back onto the visible canvas
  canvas.ctx.putImageData(canvas.imageData, 0, 0);
}

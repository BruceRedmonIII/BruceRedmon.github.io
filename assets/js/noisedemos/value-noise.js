function GetValueNoise(x, y, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);

  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const topLeft = NormalizeNoiseValue(Get2DNoise(x0, y0, seed));

  const topRight = NormalizeNoiseValue(Get2DNoise(x1, y0, seed));

  const bottomLeft = NormalizeNoiseValue(Get2DNoise(x0, y1, seed));

  const bottomRight = NormalizeNoiseValue(Get2DNoise(x1, y1, seed));

  const tx = SmootherStep(x - x0);
  const ty = SmootherStep(y - y0);

  const top = lerp(topLeft, topRight, tx);

  const bottom = lerp(bottomLeft, bottomRight, tx);

  return lerp(top, bottom, ty);
}

function GetValueNoiseFromWorld(x, y, width, height, seed, noiseRange) {
  const [noiseX, noiseY] = ConvertToNoiseSpace(x, y, width, height, noiseRange);

  return GetValueNoise(noiseX, noiseY, seed);
}

function GetValueNoiseWithOctaves(x, y, canvas, config, seed) {
  let amplitude = 1.0;
  let totalAmplitude = 0.0;

  let frequencyRange = config.noiseInputRange;
  let totalNoise = 0.0;

  let octaveSeed = seed;

  for (let octave = 0; octave < config.numOfOctaves; octave++) {
    octaveSeed = BitShiftSeed(1, octaveSeed);

    const noise = GetValueNoiseFromWorld(
      x,
      y,
      canvas.width,
      canvas.height,
      octaveSeed,
      frequencyRange,
    );

    totalNoise += noise * amplitude;
    totalAmplitude += amplitude;

    amplitude *= config.persistence;
    frequencyRange *= config.lacunarity;
  }

  return totalNoise / totalAmplitude;
}

function GenerateValueNoiseImage(seed, canvas, config) {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const noise = GetValueNoiseWithOctaves(
        x * config.magnitude,
        y * config.magnitude,
        canvas,
        config,
        seed,
      );

      const color = Math.floor(noise * 255);

      const index = (y * canvas.width + x) * 4;

      canvas.data[index] = color;
      canvas.data[index + 1] = color;
      canvas.data[index + 2] = color;
      canvas.data[index + 3] = 255;
    }
  }

  canvas.ctx.putImageData(canvas.imageData, 0, 0);
}

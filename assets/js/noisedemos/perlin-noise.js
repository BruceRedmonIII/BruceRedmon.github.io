function GetPerlinNoise(x, y, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);

  const x1 = x0 + 1;
  const y1 = y0 + 1;

  const sx = SmootherStep(x - x0);
  const sy = SmootherStep(y - y0);

  // Top row
  const n0 = CalculateGradientDot(x0, y0, x, y, seed);

  const n1 = CalculateGradientDot(x1, y0, x, y, seed);

  const ix0 = lerp(n0, n1, sx);

  // Bottom row
  const n2 = CalculateGradientDot(x0, y1, x, y, seed);

  const n3 = CalculateGradientDot(x1, y1, x, y, seed);

  const ix1 = lerp(n2, n3, sx);

  const value = lerp(ix0, ix1, sy);

  // Approximate theoretical range
  return value;
}

function GetPerlinNoiseFromWorld(x, y, canvas, noiseInputRange, seed) {
  const [noiseX, noiseY] = ConvertToNoiseSpace(
    x,
    y,
    canvas.width,
    canvas.height,
    noiseInputRange,
  );

  return GetPerlinNoise(noiseX, noiseY, seed);
}

function GetPerlinNoiseFromWorldWithOctaves(x, y, canvas, config, seed) {
  let totalNoise = 0;
  let totalAmplitude = 0;

  let amplitude = 1;
  let frequencyRange = config.noiseInputRange;
  let octaveSeed = seed;

  for (let octave = 0; octave < config.numOfOctaves; octave++) {
    const noise = GetPerlinNoiseFromWorld(
      x,
      y,
      canvas,
      frequencyRange,
      octaveSeed,
    );

    totalNoise += noise * amplitude;
    totalAmplitude += amplitude;

    amplitude *= config.persistence;
    frequencyRange *= config.lacunarity;
  }

  return totalNoise / totalAmplitude;
}

function GeneratePerlinNoiseImage(seed, canvas, config) {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const noise = GetPerlinNoiseFromWorldWithOctaves(
        x * config.magnitude,
        y * config.magnitude,
        canvas,
        config,
        seed,
      );
      const normalized = (noise + 1) * 0.5;
      const color = Math.floor(clamp(normalized, 0, 1) * 255);

      const index = (y * canvas.width + x) * 4;

      canvas.data[index] = color;
      canvas.data[index + 1] = color;
      canvas.data[index + 2] = color;
      canvas.data[index + 3] = 255;
    }
  }

  canvas.ctx.putImageData(canvas.imageData, 0, 0);
}

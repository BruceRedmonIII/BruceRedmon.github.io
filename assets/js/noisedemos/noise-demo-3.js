const valueNoiseCanvas = new NoiseCanvas('valueNoiseCanvas-3');
const valueNoiseConfig = new NoiseMapConfig(2, 10, 0.5, 2, 8);
const perlinNoiseCanvas = new NoiseCanvas('perlinNoiseCanvas-3');
const perlinNoiseConfig = new NoiseMapConfig(1, 10, 0.5, 2, 8);
const simplexNoiseCanvas = new NoiseCanvas('simplexNoiseCanvas-3');
const simplexNoiseConfig = new NoiseMapConfig(0.05, 10, 0.5, 2, 8);

const seedInput = document.getElementById('seedInput-3');
const perlinNoiseOctaves = document.getElementById('perlin-noise-octaves-3');
const simplexNoiseOctaves = document.getElementById('simplex-noise-octaves-3');
const valueNoiseOctaves = document.getElementById('value-noise-octaves-3');
const generateButton = document.getElementById('generateButton-3');
const defaultSeed = 12345;

seedInput.value = defaultSeed;

generateButton.addEventListener('click', () => {
  GenerateNoiseMaps();
});

// Generate the initial noise image using the default seed value
GenerateNoiseMaps();

function GenerateNoiseMaps() {
  const seed = parseInt(seedInput.value, 10);
  perlinNoiseConfig.numOfOctaves = parseInt(perlinNoiseOctaves.value, 10);
  simplexNoiseConfig.numOfOctaves = parseInt(simplexNoiseOctaves.value, 10);
  valueNoiseConfig.numOfOctaves = parseInt(valueNoiseOctaves.value, 10);

  GeneratePerlinNoiseImage(seed, perlinNoiseCanvas, perlinNoiseConfig);
  GenerateSimplexNoiseImage(seed, simplexNoiseCanvas, simplexNoiseConfig);
  GenerateValueNoiseImage(seed, valueNoiseCanvas, valueNoiseConfig);
}

perlinNoiseOctaves.addEventListener('change', () => {
  perlinNoiseOctaves.value = Math.min(
    8,
    Math.max(1, Number(perlinNoiseOctaves.value)),
  );
  GenerateNoiseMaps();
});

simplexNoiseOctaves.addEventListener('change', () => {
  simplexNoiseOctaves.value = Math.min(
    8,
    Math.max(1, Number(simplexNoiseOctaves.value)),
  );
  GenerateNoiseMaps();
});
valueNoiseOctaves.addEventListener('change', () => {
  valueNoiseOctaves.value = Math.min(
    8,
    Math.max(1, Number(valueNoiseOctaves.value)),
  );
  GenerateNoiseMaps();
});

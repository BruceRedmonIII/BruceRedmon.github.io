const randomNoiseCanvas = new NoiseCanvas('randomNoiseCanvas-2');
const randomNoiseConfig = new NoiseMapConfig(0.5, 1, 1, 1, 1);
const valueNoiseCanvas = new NoiseCanvas('valueNoiseCanvas-2');
const valueNoiseConfig = new NoiseMapConfig(2, 10, 0.5, 2, 1);
const perlinNoiseCanvas = new NoiseCanvas('perlinNoiseCanvas-2');
const perlinNoiseConfig = new NoiseMapConfig(1, 10, 0.5, 2, 1);
const simplexNoiseCanvas = new NoiseCanvas('simplexNoiseCanvas-2');
const simplexNoiseConfig = new NoiseMapConfig(0.1, 10, 0.5, 2, 1);

const seedInput = document.getElementById('seedInput-2');
const generateButton = document.getElementById('generateButton-2');
const defaultSeed = 12345;

seedInput.value = defaultSeed;

generateButton.addEventListener('click', () => {
  GenerateNoiseMaps();
});

// Generate the initial noise image using the default seed value
GenerateNoiseMaps();

function GenerateNoiseMaps() {
  const seed = parseInt(seedInput.value, 10);
  GenerateRandomNoiseImage(seed, randomNoiseCanvas, randomNoiseConfig);
  GeneratePerlinNoiseImage(seed, perlinNoiseCanvas, perlinNoiseConfig);
  GenerateSimplexNoiseImage(seed, simplexNoiseCanvas, simplexNoiseConfig);
  GenerateValueNoiseImage(seed, valueNoiseCanvas, valueNoiseConfig);
}

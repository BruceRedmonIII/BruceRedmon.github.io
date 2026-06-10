const randomNoiseCanvas = new NoiseCanvas('myCanvas');
const randomNoiseConfig = new NoiseMapConfig(1, 1, 1, 1, 1);
const seedInput = document.getElementById('seedInput');
const generateButton = document.getElementById('generateButton');
const defaultSeed = 12345;

seedInput.value = defaultSeed;

generateButton.addEventListener('click', () => {
  GenerateMap();
});

GenerateMap();

function GenerateMap() {
  const seed = parseInt(seedInput.value, 10);
  GenerateRandomNoiseImage(seed, randomNoiseCanvas, randomNoiseConfig);
}

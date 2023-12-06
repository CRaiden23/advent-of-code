import { parseInput } from '../util/index.js';

class EndOfMap {
  lastIndex: number;
  constructor(index: number) {
    this.lastIndex = index;
  }
}

interface SeedRange {
  start: number;
  length: number;
}

class CategoryMap {
  SourceStart: number;
  DestinationStart: number;
  Length: number;

  constructor(destStart: number, sourceStart: number, length: number) {
    this.SourceStart = sourceStart;
    this.DestinationStart = destStart;
    this.Length = length;
  }

  isInRange(source: number): boolean {
    return (
      source >= this.SourceStart && source <= this.SourceStart + this.Length - 1
    );
  }

  convertToDestination(source: number): number {
    if (this.isInRange(source)) {
      return this.DestinationStart + (source - this.SourceStart);
    }
    return source;
  }
}

const processMap = (mapInput: string[]) => {
  const process = () => {
    const categoryMaps: CategoryMap[] = [];
    try {
      mapInput.forEach((line, index) => {
        if (line == '') throw new EndOfMap(index);

        const split = line.split(' ');
        categoryMaps.push(
          new CategoryMap(Number(split[0]), Number(split[1]), Number(split[2]))
        );
      });
    } catch (e) {
      if (e instanceof EndOfMap) {
        mapInput = mapInput.slice(e.lastIndex + 2);
      }
    }
    return categoryMaps;
  };
  const seedToSoil = process();
  const soilToFertilizer = process();
  const fertilizerToWater = process();
  const waterToLight = process();
  const lightToTemperature = process();
  const temperatureToHumidity = process();
  const humidityToLocation = process();

  return [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ];
};

const calculateDestination = (maps: CategoryMap[], source: number): number => {
  let result = 0;
  maps.forEach((map, index) => {
    if (map.isInRange(source)) {
      result = index;
      return;
    }
  });

  return maps[result].convertToDestination(source);
};

const input = parseInput({ split: { mapper: false } });
let result = Number.MAX_SAFE_INTEGER;

const seeds = input[0].split('seeds: ')[1].split(' ');
const seedRanges: SeedRange[] = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push({
    start: Number(seeds[i]),
    length: Number(seeds[i + 1]),
  } as SeedRange);
}

const mapInput = input.slice(3);

const [
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
] = processMap(mapInput);

const processes: Promise<number>[] = [];
seedRanges.forEach((seedRange) => {
  processes.push(
    new Promise<number>((resolve) => {
      let result = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < seedRange.length; i++) {
        const seed = seedRange.start + i;
        const soil = calculateDestination(seedToSoil, seed);
        const fert = calculateDestination(soilToFertilizer, soil);
        const water = calculateDestination(fertilizerToWater, fert);
        const light = calculateDestination(waterToLight, water);
        const temp = calculateDestination(lightToTemperature, light);
        const humid = calculateDestination(temperatureToHumidity, temp);
        const loc = calculateDestination(humidityToLocation, humid);

        if (loc < result) {
          result = loc;
        }
      }
      resolve(result);
    })
  );
});

await Promise.all(processes).then((locations) => {
  locations.forEach((location) => {
    if (location < result) {
      result = location;
    }
  });
});

export default result;

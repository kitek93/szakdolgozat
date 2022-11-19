import {useMemo} from 'react';

const useImageSource = (actualLevel: number) => {
  const imageSource = useMemo(() => {
    if (actualLevel === 2) return require('../assets/level1.png');
    if (actualLevel === 6) return require('../assets/level2.png');
    if (actualLevel === 11) return require('../assets/level3.png');
    if (actualLevel === 13) return require('../assets/level4.png');
    if (actualLevel > 2 && actualLevel < 6)
      return require('../assets/level1.png');
    if (actualLevel > 6 && actualLevel < 11)
      return require('../assets/level2.png');
    if (actualLevel > 11 && actualLevel < 13)
      return require('../assets/level3.png');

    return require('../assets/level4.png');
  }, [actualLevel]);

  return imageSource;
};

export default useImageSource;

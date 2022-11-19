import React, {FC, PropsWithChildren} from 'react';
import {ImageBackground, useWindowDimensions} from 'react-native';

const TabContainer: FC<PropsWithChildren> = ({children}) => {
  const {width, height} = useWindowDimensions();

  return (
    <>
      {children}
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={{width, height, position: 'absolute', zIndex: -1}}
      />
    </>
  );
};

export default TabContainer;

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import {globalStyles} from '../styles/globalStyles';

export default function Activity() {
  return(
    
    < View style={globalStyles.container} >
      <ActivityIndicator animating={true} color={'#000'} />
    </View >

  )
}
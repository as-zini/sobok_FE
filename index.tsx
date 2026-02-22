/**
 * @format
 */

import { AppRegistry, Text, TextProps } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// React 19에서 defaultProps는 deprecated이므로 타입 캐스팅 사용
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = [{ fontFamily: 'Pretendard Variable' }, (Text as any).defaultProps?.style];

AppRegistry.registerComponent(appName, () => App);

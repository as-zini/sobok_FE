import type { NavigationContainerRef } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

let navigator: NavigationContainerRef<any> | null = null;

function setTopLevelNavigator(navigatorRef: NavigationContainerRef<any> | null) {
  navigator = navigatorRef;
}

function navigate(name: string, params?: any) {
  navigator?.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
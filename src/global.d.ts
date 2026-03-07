// 이미지 모듈 타입 선언
declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.jpeg' {
    const value: any;
    export default value;
}

declare module '*.gif' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: any;
    export default value;
}

declare module '*.webp' {
    const value: any;
    export default value;
}

// react-native-splash-screen 타입
declare module 'react-native-splash-screen' {
    const SplashScreen: {
        show: () => void;
        hide: () => void;
    };
    export default SplashScreen;
}

// react-native-keyboard-aware-scroll-view 타입
declare module 'react-native-keyboard-aware-scroll-view' {
    import type { ComponentType } from 'react';
    export const KeyboardAwareScrollView: ComponentType<any>;
}

// dayjs duration 플러그인
declare module 'dayjs/plugin/duration' {
    import type { PluginFunc } from 'dayjs';
    const plugin: PluginFunc;
    export default plugin;
}

// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider

// @main
// class AppDelegate: UIResponder, UIApplicationDelegate {
//   var window: UIWindow?

//   var reactNativeDelegate: ReactNativeDelegate?
//   var reactNativeFactory: RCTReactNativeFactory?

//   func application(
//     _ application: UIApplication,

//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {
//     let delegate = ReactNativeDelegate()
//     let factory = RCTReactNativeFactory(delegate: delegate)
//     delegate.dependencyProvider = RCTAppDependencyProvider()

//     reactNativeDelegate = delegate
//     reactNativeFactory = factory

//     window = UIWindow(frame: UIScreen.main.bounds)

//     factory.startReactNative(
//       withModuleName: "sobok",
//       in: window,
//       launchOptions: launchOptions
//     )

//     return true
//   }
// }

// class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
// #if DEBUG
//     RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
// #else
//     Bundle.main.url(forResource: "main", withExtension: "jsbundle")
// #endif
//   }
// }
// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider

// // 1) 카카오 SDK 임포트
// import KakaoSDKCommon
// import KakaoSDKAuth

// @main
// class AppDelegate: UIResponder, UIApplicationDelegate {
//   var window: UIWindow?

//   var reactNativeDelegate: ReactNativeDelegate?
//   var reactNativeFactory: RCTReactNativeFactory?

//   func application(
//     _ application: UIApplication,
//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {
//     // 2) 카카오 SDK 초기화: 'YOUR_NATIVE_APP_KEY'를 실제 네이티브 앱 키로 교체
//     KakaoSDK.initSDK(appKey: "f83381080c3d72f68b8b1eb9d49079ae")

//     let delegate = ReactNativeDelegate()
//     let factory = RCTReactNativeFactory(delegate: delegate)
//     delegate.dependencyProvider = RCTAppDependencyProvider()

//     reactNativeDelegate = delegate
//     reactNativeFactory = factory

//     window = UIWindow(frame: UIScreen.main.bounds)
//     factory.startReactNative(
//       withModuleName: "sobok",
//       in: window,
//       launchOptions: launchOptions
//     )

//     return true
//   }

//   // 3) iOS 9 이상 카카오톡/웹뷰 로그인 콜백 처리
//   func application(
//     _ app: UIApplication,
//     open url: URL,
//     options: [UIApplication.OpenURLOptionsKey : Any] = [:]
//   ) -> Bool {
//     if AuthApi.isKakaoTalkLoginUrl(url) {
//       return AuthController.handleOpenUrl(url: url)
//     }
//     return false
//   }
// }

// class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
//   #if DEBUG
//     RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
//   #else
//     Bundle.main.url(forResource: "main", withExtension: "jsbundle")
//   #endif
//   }
// }
import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

import KakaoSDKCommon
import KakaoSDKAuth

// ✅ 추가
import FirebaseCore

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // Kakao
    KakaoSDK.initSDK(appKey: "f83381080c3d72f68b8b1eb9d49079ae")

    // ✅ GoogleService-Info.plist 경로 확인 로그(반드시 하나 찍혀야 함)
    if let path = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist") {
      print("[DEBUG] GoogleService-Info.plist path =", path)
    } else {
      print("[ERROR] GoogleService-Info.plist not found!")
    }

    // ✅ Firebase 초기화 (가장 먼저 해도 됨)
    if FirebaseApp.app() == nil {
      FirebaseApp.configure()
      print("[DEBUG] FirebaseApp configured")
    } else {
      print("[DEBUG] FirebaseApp already configured")
    }

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "sobok",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  // Kakao 콜백
  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    if AuthApi.isKakaoTalkLoginUrl(url) {
      return AuthController.handleOpenUrl(url: url)
    }
    return false
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
  #if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
  #else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
  #endif
  }
}
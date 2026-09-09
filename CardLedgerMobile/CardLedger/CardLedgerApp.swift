import SwiftUI
import UIKit

@main
struct CardLedgerApp: App {
    @UIApplicationDelegateAdaptor(CardLedgerAppDelegate.self) private var appDelegate
    @StateObject private var store = AppStore()
    @StateObject private var preferences = AppPreferences.shared

    init() {
        UISegmentedControl.appearance().backgroundColor = UIColor(LedgerTheme.raised)
        UISegmentedControl.appearance().setTitleTextAttributes([.foregroundColor: UIColor(LedgerTheme.secondary)], for: .normal)
        UITabBar.appearance().unselectedItemTintColor = UIColor(LedgerTheme.secondary).withAlphaComponent(0.6)
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .environmentObject(preferences)
                .environment(\.locale, Locale(identifier: preferences.language.rawValue))
                .id("\(preferences.language.rawValue)-\(preferences.appearance.rawValue)")
                .tint(LedgerTheme.mint)
                .preferredColorScheme(.dark)
        }
    }
}

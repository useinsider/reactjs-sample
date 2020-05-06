#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
// MARK: Please implement UserNotifications.
#import <UserNotifications/UserNotifications.h>

// MARK: Please implement UNUserNotificationCenterDelegate.
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

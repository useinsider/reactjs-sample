//
//  NotificationViewController.m
//  InsiderNotificationContent
//
//  Created by Insider on 6.04.2020.
//

#import "NotificationViewController.h"
#import <UserNotificationsUI/UserNotificationsUI.h>
#import "iCarousel.h"
#import <InsiderMobileAdvancedNotification/InsiderPushNotification.h>

@interface NotificationViewController () <UNNotificationContentExtension, iCarouselDelegate, iCarouselDataSource>
@property (nonatomic, weak) IBOutlet iCarousel *carousel;

@end

// FIXME: Please change with your app group.
static NSString *APP_GROUP = @"group.com.insiderdemo";

@implementation NotificationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [InsiderPushNotification interactivePushLoad:APP_GROUP superView:self.view];
    _carousel.type = iCarouselTypeRotary;
    [_carousel reloadData];
}
- (void)didReceiveNotification:(UNNotification *)notification
{
    [InsiderPushNotification interactivePushDidReceiveNotification];
}

- (NSInteger)numberOfItemsInCarousel:(iCarousel *)carousel
{
    return [InsiderPushNotification getNumberOfSlide];
}
- (UIView *)carousel:(iCarousel *)carousel viewForItemAtIndex:(NSInteger)index reusingView:(UIView *)view
{
    return [InsiderPushNotification getSlide:index reusingView:view superView:self.view];
}
- (void)dealloc
{
    self.carousel.delegate = nil;
    self.carousel.dataSource = nil;
}
- (CGFloat)carouselItemWidth:(iCarousel *)carousel
{
    return [InsiderPushNotification getItemWidth];
}
- (void)didReceiveNotificationResponse:(UNNotificationResponse *)response
                     completionHandler:(void (^)(UNNotificationContentExtensionResponseOption option))completion
{
    if ([response.actionIdentifier isEqualToString:@"insider_int_push_next"]){
        [_carousel scrollToItemAtIndex:[InsiderPushNotification didReceiveNotificationResponse:[_carousel currentItemIndex]] animated:true];
        completion(UNNotificationContentExtensionResponseOptionDoNotDismiss);
    }else{
        [InsiderPushNotification logPlaceholderClick:response];
        completion(UNNotificationContentExtensionResponseOptionDismissAndForwardAction);
    }
}
@end

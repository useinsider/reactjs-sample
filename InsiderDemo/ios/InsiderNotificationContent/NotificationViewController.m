#import "NotificationViewController.h"
#import <UserNotificationsUI/UserNotificationsUI.h>
#import <InsiderMobileAdvancedNotification/iCarousel.h>
#import <InsiderMobileAdvancedNotification/InsiderPushNotification.h>

@interface NotificationViewController () <UNNotificationContentExtension, iCarouselDelegate, iCarouselDataSource>
@property (nonatomic, weak) IBOutlet iCarousel *carousel;
@end

// FIXME: Please change with your app group.
static NSString *APP_GROUP = @"group.com.useinsider.InsiderDemo";

@implementation NotificationViewController

@synthesize carousel;

-(void)viewDidLoad {
    [super viewDidLoad];
}

-(void)didReceiveNotification:(UNNotification *)notification {
    [InsiderPushNotification interactivePushLoad:APP_GROUP superView:self.view notification:notification];
    
    carousel.type = iCarouselTypeRotary;
    [carousel reloadData];
    
    [InsiderPushNotification interactivePushDidReceiveNotification];
}

-(NSInteger)numberOfItemsInCarousel:(iCarousel *)carousel {
    return [InsiderPushNotification getNumberOfSlide];
}

-(UIView *)carousel:(iCarousel *)carousel viewForItemAtIndex:(NSInteger)index reusingView:(UIView *)view {
    return [InsiderPushNotification getSlide:index reusingView:view superView:self.view];
}

-(void)dealloc {
    carousel.delegate = nil;
    carousel.dataSource = nil;
}

-(CGFloat)carouselItemWidth:(iCarousel *)carousel {
    return [InsiderPushNotification getItemWidth];
}

-(void)didReceiveNotificationResponse:(UNNotificationResponse *)response
                     completionHandler:(void (^)(UNNotificationContentExtensionResponseOption option))completion {
    if ([response.actionIdentifier isEqualToString:@"insider_int_push_next"]){
        [carousel scrollToItemAtIndex:[InsiderPushNotification didReceiveNotificationResponse:[carousel currentItemIndex]] animated:true];
        
        completion(UNNotificationContentExtensionResponseOptionDoNotDismiss);
    } else {
        [InsiderPushNotification logPlaceholderClick:response];
        
        completion(UNNotificationContentExtensionResponseOptionDismissAndForwardAction);
    }
}

@end

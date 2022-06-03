//
//  NotificationService.m
//  InsiderNotificationService
//
//  Created by Insider on 6.04.2020.
//

#import "NotificationService.h"
#import <InsiderMobileAdvancedNotification/InsiderPushNotification.h>

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@property (nonatomic, strong) UNNotificationRequest *receivedRequest;
@property (nonatomic, strong) NSString *source;

@end

// FIXME: Please change with your app group.
static NSString *APP_GROUP = @"group.com.useinsider.InsiderDemo";

@implementation NotificationService
- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
  self.receivedRequest = request;
      self.contentHandler = contentHandler;
      self.bestAttemptContent = [request.content mutableCopy];
      NSDictionary *notificationData = request.content.userInfo;
      self.source = [notificationData objectForKey:@"source"];
      
      // YOU CAN CUSTOMIZE THESE
      NSString *nextButtonText = @">>";
      NSString *goToAppText = @"Launch App";
      
      if ([self.source  isEqual: @"Insider"]) {
        [InsiderPushNotification showInsiderRichPush:request appGroup:APP_GROUP nextButtonText:nextButtonText goToAppText:goToAppText  success:^(UNNotificationAttachment *attachment) {
            self->_bestAttemptContent.attachments = [self->_bestAttemptContent.attachments arrayByAddingObject:attachment];
            self.contentHandler(self.bestAttemptContent);
        }];
        
        return;
      }
    
      //other push provider code
      
  }

- (void)serviceExtensionTimeWillExpire {
  if ([self.source  isEqual: @"Insider"]) {
    self.contentHandler(self.bestAttemptContent);
    
    return;
  }
  
  //Other push provider code
 
}

@end

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNInsider from 'react-native-insider';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';
import InsiderGender from 'react-native-insider/src/InsiderGender';
import ContentOptimizerDataType from 'react-native-insider/src/ContentOptimizerDataType';
import RNInsiderIdentifier from 'react-native-insider/src/InsiderIdentifier';
import "react-native-keychain";

class App extends React.Component {
  componentDidMount() {
    RNInsider.init(
      'orkunbites',
      'group.com.useinsider.mobile-ios',
      (type, data) => {
        switch (type) {
          case InsiderCallbackType.NOTIFICATION_OPEN:
            console.log('[INSIDER][NOTIFICATION_OPEN]: ', data);
            Alert.alert('[INSIDER][NOTIFICATION_OPEN]:', JSON.stringify(data));
            break;
          case InsiderCallbackType.INAPP_BUTTON_CLICK:
            console.log('[INSIDER][INAPP_BUTTON_CLICK]: ', data);
            Alert.alert(
              '[INSIDER][INAPP_BUTTON_CLICK]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_PURCHASE:
            console.log('[INSIDER][TEMP_STORE_PURCHASE]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_PURCHASE]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_ADDED_TO_CART:
            console.log('[INSIDER][TEMP_STORE_ADDED_TO_CART]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_ADDED_TO_CART]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION:
            console.log('[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ',
              JSON.stringify(data),
            );
            break;
        }
      },
    );
    RNInsider.registerWithQuietPermission(false);
    RNInsider.startTrackingGeofence();
    RNInsider.enableIDFACollection(false);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <Button onPress={() => trigger()} title="Trigger" />
          </View>
          {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
              </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView> */}
        </SafeAreaView>
      </>
    );
  }
}

function trigger() {
  // --- USER --- //

  // You can crete Insider User and add attributes later on it.
  let currentUser = RNInsider.getCurrentUser();

  // Setting User Attributes in chainable way.
  currentUser
    .setName('Insider')
    .setSurname('Demo')
    .setAge(23)
    .setGender(InsiderGender.Other)
    .setBirthday(new Date())
    .setEmailOptin(true)
    .setSMSOptin(false)
    .setPushOptin(true)
    .setLocationOptin(true)
    .setFacebookID('Facebook-ID')
    .setTwitterID('Twittter-ID')
    .setLanguage('TR')
    .setLocale('tr_TR');

  // Setting User Identifiers.
  let identifiers = new RNInsiderIdentifier();
  identifiers.addEmail('mobile@useinsider.com');
  identifiers.addPhoneNumber('+901234567');
  identifiers.addUserID('CRM-ID');

  // Login and Logout
  currentUser.logout();
  currentUser.login(identifiers);

  // Setting custom attributes.
  // MARK: Your attribute key should be all lowercased and should not include any special or non Latin characters or any space, otherwise this attribute will be ignored. You can use underscore _.
  currentUser.setCustomAttributeWithString(
    'string_attribute',
    'This is Insider.',
  );
  currentUser.setCustomAttributeWithInt('int_attribute', 10);
  currentUser.setCustomAttributeWithDouble('double_attribute', 20.5);
  currentUser.setCustomAttributeWithBoolean('bool_attribute', true);
  currentUser.setCustomAttributeWithDate('date_attribute', new Date());

  // MARK: You can only call the method with array of string otherwise this event will be ignored.
  const arr = ['value1', 'value2', 'value3'];
  RNInsider.getCurrentUser().setCustomAttributeWithArray('key', arr);

  // --- EVENT --- //

  // You can create an event without parameters and call the build method
  RNInsider.tagEvent('first_event').build();

  // You can create an event then add parameters and call the build method
  RNInsider.tagEvent('second_event')
    .addParameterWithInt('int_parameter', 10)
    .build();

  // You can create an object and add the parameters later
  let insiderExampleEvent = RNInsider.tagEvent('third_event');

  insiderExampleEvent
    .addParameterWithString('string_parameter', 'This is Insider.')
    .addParameterWithInt('int_parameter', 10)
    .addParameterWithDouble('double_parameter', 10.5)
    .addParameterWithBoolean('bool_parameter', true)
    .addParameterWithDate('date_parameter', new Date());

  // MARK: You can only call the method with array of string otherwise this event will be ignored.
  insiderExampleEvent.addParameterWithArray('array_parameter', arr);

  // Do not forget to call build method once you are done with parameters.
  // Otherwise your event will be ignored.
  insiderExampleEvent.build();

  // --- PRODUCT --- //

  // MARK: If any parameter which is passed to this method is nil / null or an empty string, it will return an empty and invalid Insider Product Object. Note that an invalid Insider Product object will be ignored for any product related operations.
  // You can crete Insider Product and add attributes later on it.
  const taxonomy = ['taxonomy1', 'taxonomy2', 'taxonomy3'];
  let insiderExampleProduct = RNInsider.createNewProduct(
    'productID',
    'productName',
    taxonomy,
    'imageURL',
    1000.5,
    'currency',
  );

  // Setting Product Attributes in chainable way.
  insiderExampleProduct
    .setColor('color')
    .setVoucherName('voucherName')
    .setVoucherDiscount(10.5)
    .setPromotionName('promotionName')
    .setPromotionDiscount(10.5)
    .setSize('size')
    .setSalePrice(10.5)
    .setShippingCost(10.5)
    .setQuantity(10)
    .setStock(10);

  // Setting custom attributes.
  // MARK: Your attribute key should be all lowercased and should not include any special or non Latin characters or any space, otherwise this attribute will be ignored. You can use underscore _.
  insiderExampleProduct
    .setCustomAttributeWithString('string_parameter', 'This is Insider.')
    .setCustomAttributeWithInt('int_parameter', 10)
    .setCustomAttributeWithDouble('double_parameter', 10.5)
    .setCustomAttributeWithBoolean('bool_parameter', true)
    .setCustomAttributeWithDate('date_parameter', new Date());

  // MARK: You can only call the method with array of string otherwise this event will be ignored.
  insiderExampleProduct.setCustomAttributeWithArray('array_parameter', arr);

  // --- REVENUE TRACKING --- //

  RNInsider.itemPurchased('uniqueSaleID', insiderExampleProduct);

  // --- CART REMINDER --- //

  // Adding item to cart.
  RNInsider.itemAddedToCart(insiderExampleProduct);

  // Removing item from the cart.
  RNInsider.itemRemovedFromCart('productID');

  // Removing all the items from the cart.
  // This method will automatically triggered when you call Revenue Tracking.
  RNInsider.cartCleared();

  // --- RECOMMENDATION ENGINE --- //

  // ID comes from your smart recommendation campaign.
  // Please follow the language code structure. For instance en_US.
  RNInsider.getSmartRecommendation(1, 'tr_TR', 'TRY', recommendation => {
    // Handle here
    console.log('[INSIDER][getSmartRecommendation]: ', recommendation);
  });

  RNInsider.getSmartRecommendationWithProduct(
    insiderExampleProduct,
    1,
    'tr_TR',
    recommendation => {
      // Handle here
      console.log(
        '[INSIDER][getSmartRecommendationWithProduct]: ',
        recommendation,
      );
    },
  );

  // --- SOCIAL PROOF --- //

  RNInsider.visitProductDetailPage(insiderExampleProduct);

  // --- PAGE VISITING --- //

  RNInsider.visitHomePage();
  RNInsider.visitListingPage(taxonomy);

  const insiderExampleProducts = [insiderExampleProduct, insiderExampleProduct];
  RNInsider.visitCartPage(insiderExampleProducts);

  // --- GDPR --- //

  // MARK: Please note that by default our SDK is collecting the data so you don't have to call this function if you are not asking users consents.

  // MARK: If you set false, the user will not share any data or receive any push until you set back true.
  RNInsider.setGDPRConsent(true);

  // --- MESSAGE CENTER --- //

  const startDate = new Date(Date.now() + 86400000);
  const endDate = new Date(Date.now() - 86400000);

  RNInsider.getMessageCenterData(100, startDate, endDate, messageCenterData => {
    // Handle here
    console.log('[INSIDER][getMessageCenterData]: ', messageCenterData);
  });

  // --- CONTENT OPTIMIZER --- //

  // String
  const contentOptimizerString = RNInsider.getContentStringWithName(
    'string_variable_name',
    'defaultValue',
    ContentOptimizerDataType.ELEMENT,
  );
  console.log('[INSIDER][getContentStringWithName]: ', contentOptimizerString);

  // Boolean
  const contentOptimizerBool = RNInsider.getContentBoolWithName(
    'bool_variable_name',
    true,
    ContentOptimizerDataType.ELEMENT,
  );
  console.log('[INSIDER][getContentBoolWithName]: ', contentOptimizerBool);

  // Integer
  const contentOptimizerInt = RNInsider.getContentIntWithName(
    'int_variable_name',
    10,
    ContentOptimizerDataType.Element,
  );
  console.log('[INSIDER][getContentIntWithName]: ', contentOptimizerInt);
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

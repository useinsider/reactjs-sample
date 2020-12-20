# 4.1.0-nh

`nh` stands for non-huawei.

Same as 4.1.0 without any Huawei dependencies and services.

# 4.1.0

Google policy update adaptation.

### Removed

- Amplification has been removed.

```ts
    static getAutoStartPermission(vendors: Array<number>)
```

- Rule has been removed from proguard.

```rb
    -keep class com.useinsider.insider.Vendor { *; }
```

- `Vendor.js` has been removed.

### Added

- New proguard rule has been added.

```rb
    -keep interface com.useinsider.insider.InsiderUser$InsiderIDResult { *; }
```

### Changed

- Minimum deployment target for iOS has been changed from `7.0` to

```rb
    s.platform     = :ios, '9.0'
```

- Native iOS SDK version has been changed from 10.6.0 to

```rb
    s.dependency 'InsiderMobile', '10.7.0'
```

- Native Android SDK version has been changed from 11.3.0 to

```rb
    implementation ('com.useinsider:insider:11.6.0')
```

- Minimum SDK version for Android SDK has been changed from 19 to

```rb
    minSdkVersion getVersionFromPartner('minSdkVersion', 17)
```

- Compile SDK version for Android has been changed from 29 to

```rb
    compileSdkVersion getVersionFromPartner('compileSdkVersion', 30)
```

- Gradle version has been changed from 3.4.2 to

```rb
    classpath 'com.android.tools.build:gradle:3.6.1'
```

- Huawei dependency versions has been updated in build.gradle.

```rb
    implementation 'com.huawei.hms:push:5.0.4.302'
    implementation 'com.huawei.hms:ads-identifier:3.4.34.301'
    implementation 'com.huawei.hms:location:4.0.4.300'
```

- `language: string` parameter has been renamed to `locale: string`.

```ts
    static getSmartRecommendation(recommendationID: number, locale: string, currency: string, callback: Function)
```

```ts
    static getSmartRecommendationWithProduct(product: RNInsiderProduct, recommendationID: number, locale: string, callback: Function)
```

- `insiderIDResult` has been added to `login` method as an option.

```ts
    login(identifiers: RNInsiderIdentifier, insiderIDResult: Function)
```

# 4.0.0

## Added

- HMS dependencies has been addded to `build.gradle`.

```rb
    implementation 'com.huawei.hms:push:4.0.2.300'
    implementation 'com.huawei.hms:ads-identifier:3.4.28.305'
    implementation 'com.huawei.hms:location:4.0.1.300'
```

- Smart Recommendation logging has been added to `RNInsider`.

```ts
    static clickSmartRecommendationProduct(recommendationID: number, product: RNInsiderProduct)
```

- IDFA collection has been disabled by default. Optional method has been added to `RNInsider`.

```ts
    static enableIDFACollection(enableIDFACollection: boolean)
```

- Custom identifier setting with key value pair has been added to `RNInsiderIdentifier`.

```ts
    addCustomIdentifier(key: string, value: string)
```

- Locale attribute has been added to `RNInsiderUser`.

```ts
    setLocale(value: string)
```
  
## Changed

- Native iOS SDK version has been changed from 10.4.0 to

```rb
    s.dependency 'InsiderMobile', '10.6.0'
```

- Native Android SDK version has been changed from 10.3.0 to

```rb
    implementation ('com.useinsider:insider:11.3.0')
```

- Minimum SDK version for Android SDK has been changed from 16

```rb
    minSdkVersion getVersionFromPartner('minSdkVersion', 19)
```

- SDK url has been changed from `https://mobile.useinsider.com` to `https://mobilesdk.useinsider.com/android`.

You need to update your build.gradle
```rb
    maven { url "https://mobilesdk.useinsider.com/android" }
```

# 3.2.0

## Removed

- `setSubCategory` method has been removed from `RNInsiderProduct`.

```ts
    setSubCategory(subCategory: string)
```

- Following methods has been removed form `RNInsiderUser`.

```ts
    setUserIdentifierWithEmail(value: string)
```

```ts
    setUserIdentifierWithPhoneNumber(value: string)
```

```ts
    setUserIdentifierWithUserID(value: string)
```

```ts
    unsetUserIdentifierEmail()
```

```ts
    unsetUserIdentifierPhoneNumber()
```

```ts
    unsetUserIdentifierUserID()
```

## Added

- Insider Identifiers has been added. It can be imported like

```js
    import RNInsiderIdentifier from 'react-native-insider/src/InsiderIdentifier';
```

Its methods are:

```ts
    addEmail(email: string)
```

```ts
    addPhoneNumber(phoneNumber: string)
```

```ts
    addUserID(userID: string)
```

## Changed

- Native iOS SDK version has been changed from 10.0.3 to

```rb
    s.dependency 'InsiderMobile', '10.4.0'
```

- Native Android SDK version has been changed from 10.0.7 to

```rb
    implementation ('com.useinsider:insider:10.3.0')
```

- `lifecycle-extensions` has been changed to

```rb
    implementation 'androidx.lifecycle:lifecycle-process:2.2.0'
```

- Taxonomy data type has been changed from `string` to `Array<string>` which affects following methods:

  - `createNewProduct` method has been changed.
  
    ```ts
        static createNewProduct(productID: string, name: string, taxonomy: Array<string>, imageURL: string, price: number, currency: string)
    ```

  - `visitListingPage` method has been changed.

    ```ts
        static visitListingPage(taxonomy: Array<string>)
    ```

- `login` method has been changed.

```ts
    login(identifiers: RNInsiderIdentifier)
```

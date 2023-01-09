import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const haptic = () => {
  const hapticOptions = {
    enableVibrateFallback: false,
    ignoreAndroidSystemSettings: true,
  };
  const hapticTriggerType = Platform.select({
    ios: 'impactHeavy',
    android: 'impactHeavy',
  });
  ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
};

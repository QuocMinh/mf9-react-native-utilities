const { Platform} = require('react-native');
const { Constants, Location, Permissions } = require('expo');

const LocationMessage = {
  PermissionDenied: 'Permission to access location was denied!',
  LocationDisabled: 'Location services are disabled!',
  NotDevice: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
};

/**
 * Hàm lấy vị trí: return [object] nếu thành công || return [string] nếu lỗi.
 * Dùng cho App tích hợp Expo.
 */
module.exports.getLocationAsync = async () => {
  let result = '';

  // Check devices
  if (Platform.OS === 'android' && !Constants.isDevice) result = LocationMessage.NotDevice;

  // Check Permission
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') result = LocationMessage.PermissionDenied;

  // Get Location
  try {
    result = await Location.getCurrentPositionAsync({});

  } catch (error) {
    result = error.toString();
  }

  return result;
};
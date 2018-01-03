
import $ from 'jquery';

const IdentifyTouchDevices = () => {

  const ua = navigator.userAgent;

  // Assume all devices are not a touch device
  $('html').addClass('no-touch-device');

  // Check the user agent string
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/igm.test(ua)) {
    // Add a preliminary class because this can get tripped accidentally
    $('html').addClass('prel-touch-device');
  }

  $(document).on('touchstart', () => {
    // Definitely a touch device!
    // Now we can safely remove the the no-touch-device and prel-touch-device classes
    // Derive touch-specific CSS using the touch-device class (e.g. removing hover states)
    $('html').removeClass('no-touch-device prel-touch-device').addClass('touch-device');
  });
};

export default IdentifyTouchDevices;

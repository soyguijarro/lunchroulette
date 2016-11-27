export default () => (
  new Promise((resolve, reject) => {
    const { geolocation } = window.navigator;

    if (!geolocation) reject();

    const requestOptions = {
      enableHighAccuracy: true,
      timeout: 10000
    };
    geolocation.getCurrentPosition(
      position => resolve(position.coords),
      reject,
      requestOptions
    );
  })
);

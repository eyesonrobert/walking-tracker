/** @format */

import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            time: 1000,
            distanceInterval: 10,
          },
          callback
        );
  
        if (!granted) {
          throw new Error('Location permission not granted');
        }
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
        setSubscriber = null;
      }
      return () => {
        if (subscriber) {
          subscriber.remove();
        }
      };
    }
  }, [shouldTrack, callback]); //anything in the array will get compared to the value it had when the application last refreshed

  return [err];
};

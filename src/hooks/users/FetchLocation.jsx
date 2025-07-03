import { toast } from "sonner";

export const FetchLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(location);
      },
      (err) => {
        console.error(err);
        toast.error("Unable to get your location, give your location in description box or try again");
        reject("Failed to get location");
      }
    );
  });
};

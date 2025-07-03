import { toast } from "sonner";

export const FetchLocation = () => {
  
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
       return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
       }
      },
      (err) => {
        console.error(err);
        toast.error("Unable to get your location, give your location in description box or try again")
      }
    );
   
};


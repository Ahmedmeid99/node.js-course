const request=require('request')
const geocode = (adress, callback) => {
    const URL2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiYWhtZWQtZWlkIiwiYSI6ImNsNzJjOTd5dDAxbXAzb3BoaHB5dDZ2d2IifQ.-PhxcmRPSLbtYTNPKjeQTQ&limit=1`;
  
    request({ url: URL2, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          adress: response.body.features[0].place_name,
          log: response.body.features[0].center[0],
          let: response.body.features[0].center[1],
        });
      }
    });
}
module.exports=geocode
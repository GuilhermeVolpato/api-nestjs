interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface GeocodingResponse {
  data: {
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    results: Result[];
    status: string;
  };
}

//exemplo de resposta
// "plus_code":{
//   "compound_code":"9M23+4XM Criciúma, SC, Brazil",
//   "global_code":"583G9M23+4XM"
// },
// "results":[
//   {
//      "address_components":[
//         {
//            "long_name":"558",
//            "short_name":"558",
//            "types":[
//               "street_number"
//            ]
//         },
//         {
//            "long_name":"SC-446",
//            "short_name":"SC-446",
//            "types":[
//               "route"
//            ]
//         },
//         {
//            "long_name":"São Simão",
//            "short_name":"São Simão",
//            "types":[
//               "political",
//               "sublocality",
//               "sublocality_level_1"
//            ]
//         },
//         {
//            "long_name":"Criciúma",
//            "short_name":"Criciúma",
//            "types":[
//               "administrative_area_level_2",
//               "political"
//            ]
//         },
//         {
//            "long_name":"Santa Catarina",
//            "short_name":"SC",
//            "types":[
//               "administrative_area_level_1",
//               "political"
//            ]
//         },
//         {
//            "long_name":"Brazil",
//            "short_name":"BR",
//            "types":[
//               "country",
//               "political"
//            ]
//         },
//         {
//            "long_name":"88811-400",
//            "short_name":"88811-400",
//            "types":[
//               "postal_code"
//            ]
//         }
//      ],
//      "formatted_address":"SC-446, 558 - São Simão, Criciúma - SC, 88811-400, Brazil",
//      "geometry":{
//         "location":{
//            "lat":-28.6495881,
//            "lng":-49.3450379
//         },
//         "location_type":"ROOFTOP",
//         "viewport":{
//            "northeast":{
//               "lat":-28.6482391197085,
//               "lng":-49.34368891970851
//            },
//            "southwest":{
//               "lat":-28.6509370802915,
//               "lng":-49.3463868802915
//            }
//         }
//      },
//      "place_id":"ChIJ0b75gBV4IZURl0LuhQpMmtA",
//      "plus_code":{
//         "compound_code":"9M23+5X São Simão, Criciúma - SC, Brazil",
//         "global_code":"583G9M23+5X"
//      },
//      "types":[
//         "street_address"
//      ]
//   },

# `@skyra/weather-helpers`

Very basic weather helper functions for several ArchId bots to ensure we do not duplicate code.

## Features

-   Powered by the `@skyra/safe-fetch` package

## Usage

You can use the functions exported from this package to interact with the [Weather API]("https://wttr.in").

```typescript
import { getWeatherData } from '@skyra/weather-helpers';

const result = await getWeatherData('Amsterdam', 'en-us');
console.log(result);
```

<details>
 <summary>Here is an example request</summary>

```json
{
	"current_condition": [
		{
			"FeelsLikeC": "-4",
			"FeelsLikeF": "25",
			"cloudcover": "75",
			"humidity": "86",
			"lang_fr": [
				{
					"value": "Partiellement couvert"
				}
			],
			"localObsDateTime": "2024-01-06 11:02 PM",
			"observation_time": "10:02 PM",
			"precipInches": "0.0",
			"precipMM": "0.0",
			"pressure": "1017",
			"pressureInches": "30",
			"temp_C": "1",
			"temp_F": "34",
			"uvIndex": "1",
			"visibility": "10",
			"visibilityMiles": "6",
			"weatherCode": "116",
			"weatherDesc": [
				{
					"value": "Partly cloudy"
				}
			],
			"weatherIconUrl": [
				{
					"value": ""
				}
			],
			"winddir16Point": "NNE",
			"winddirDegree": "30",
			"windspeedKmph": "19",
			"windspeedMiles": "12"
		}
	],
	"nearest_area": [
		{
			"areaName": [
				{
					"value": "Amsterdam"
				}
			],
			"country": [
				{
					"value": "Netherlands"
				}
			],
			"latitude": "52.374",
			"longitude": "4.890",
			"population": "741636",
			"region": [
				{
					"value": "North Holland"
				}
			],
			"weatherUrl": [
				{
					"value": ""
				}
			]
		}
	],
	"request": [
		{
			"query": "Lat 52.37 and Lon 4.90",
			"type": "LatLon"
		}
	],
	"weather": []
}
```

</details>

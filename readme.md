#Requirements:
    - Docker
    - port 3000 isn't used or set env variable PORT value any available port
    - host 0.0.0.0 is available to use or set env variable HOST value any available host

#Setup app:
 run DB in container
    `docker-compose up`
 install dependencies
    `npm i`
 start app
    `npm start`

#API call requests examples:
 -get all active scooter vehicle from the Cyty Centre
`   curl --location --request GET 'http://<HOST>:<PORT>/api/v1/vehicles?isActive=true&deliveryArea=City%20Center&vehicleType=scooter'`
 -create new vehicle
`    curl --location --request POST 'http://<HOST>:<PORT>/api/v1/vehicles' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": {
            "first": "New One",
            "last": "New Scooter"
        },
        "isActive": true,
        "vehicleType": "scooter",
        "vehicleColor": "green",
        "email": "new@email.biz",
        "phone": "+27 (963) 507-1234",
        "deliveryAreas": [
            {
                "name": "City Center"
            }
        ]
    }'`
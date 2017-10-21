let aws = require('./index');

let event = {
    "update_id": -1,
    "message": {
        "message_id": 7,
        "from": {
            "id": -1,
            "is_bot": false,
            "first_name": "Alberto",
            "last_name": "Bastos",
            "language_code": "es"
        },
        "chat": {
            "id": -1,
            "first_name": "Alberto",
            "last_name": "Bastos",
            "type": "private"
        },
        "date": 1508567038,
        "text": "ping"
    }
};

let context = {
    succeed: (obj) => console.log('succeed called with', obj),
    fail: (obj) => console.error('fail called with', obj)
};

aws.handler(event, context);
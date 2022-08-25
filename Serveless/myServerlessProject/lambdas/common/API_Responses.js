const Responses = {
    _200(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-control-Allow-Methods': '*',
                'Access-control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(data)
        }
    },

    _400(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-control-Allow-Methods': '*',
                'Access-control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    },

    _503(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-control-Allow-Methods': '*',
                'Access-control-Allow-Origin': '*',
            },
            statusCode: 503,
            body: JSON.stringify(data)
        }
    }
}

module.exports = Responses;

import response from '../helpers/responses';

const handlers = {
    async error404(req, res, next) {
        return response.handleError(405, 'Method not allowed', res);
        next()
    },
    async error500(error, req, res, next) {
        return response.handleError(500, 'Something went wrong', res);

    }

}

export default handlers;
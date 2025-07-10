// Utilitaire pour envoyer une réponse JSON standardisée
function sendResponse(res, statusCode, status, message, data = undefined) {
    const response = { status, message };
    if (data !== undefined) response.data = data;
    return res.status(statusCode).json(response);
}


module.exports = { sendResponse };
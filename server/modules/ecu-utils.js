// modules


var Utils = (function() {
    function Utils() {

    }

    Utils.prototype.toResponse = function(success, message, data, error) {
        return {
            success: success || false,
            message: message || undefined,
            data: data || undefined,
            error: error || undefined
        }
    };

    return new Utils();
})();

// export module
module.exports = Utils;
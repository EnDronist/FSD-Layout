var path = require('path');

/** Function then creates a EJS routing function
 * @constructor
 * @param {string} root Absolute path to root used to routing
 * @param {string} varName Name of object used in including EJS-files
 */
module.exports = function(root, varName) {
    if (typeof root != 'string') throw new Error('ejs-route: "root" is not a string');
    if (typeof varName != 'string') throw new Error('ejs-route: "varName" is not a string');
    if (!(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName))) throw new Error('ejs-route: "varName" has incorrect value');
    this.root = root;
    this.varName = varName;
    this.include = (
        /** Renders and includes EJS-file
         * @param {function} handler EJS function 'include'
         * @param {string} dirname Current file path relative to root
         * @param {string} filePath Path to file to include
         * @param {boolean} fromRoot Is path relative to root?
         * @param {Object} data Additional data for render
         * @returns {string} HTML string
         */
        (handler, dirname, filePath, fromRoot = false, data = {}) => {
            if (typeof handler != 'function') throw new Error('ejs-route: "handler" is not a function');
            if (typeof filePath != 'string') throw new Error('ejs-route: "filePath" is not a string');
            if (typeof fromRoot != 'boolean') throw new Error('ejs-route: "fromRoot" is not a boolean');
            let relativePath = path.relative(dirname, path.join(fromRoot ? root : dirname, filePath));
            return handler(relativePath, {
                __dirname: path.join(dirname, filePath.substr(0, filePath.lastIndexOf('/'))),
                ...data,
                [this.varName]: this,
            });
        }
    )
}
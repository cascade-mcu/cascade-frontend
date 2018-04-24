const rewireSVGR = require('react-app-rewire-svgr');

module.exports = function override(config, env) {
    config = rewireSVGR(config, env);
    return config;
}

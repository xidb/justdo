const Encore = require('@symfony/webpack-encore');

Encore.setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('js/JustDo', './assets/js/index.js')
    .enableSassLoader()
    .enableReactPreset()
    .configureBabel((babelConfig) => {
        const preset = babelConfig.presets.find(([name]) => name === '@babel/preset-env');
        if (preset !== undefined) {
            preset[1].useBuiltIns = 'usage';
            preset[1].debug = true;
        }
    });

module.exports = Encore.getWebpackConfig();
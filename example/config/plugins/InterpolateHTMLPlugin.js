const escapeStringRegexp = require('escape-string-regexp')

function InterpolateHTMLPlugin(options) {
  this.replacements = options
}

InterpolateHTMLPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('InterpolateHTMLPlugin', compilation => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
      'InterpolateHTMLPlugin',
      (data, cb) => {
        Object.keys(this.replacements).forEach(key => {
          const value = this.replacements[key]
          data.html = data.html.replace(
            new RegExp(`%${escapeStringRegexp(key)}%`, 'g'),
            value
          )
        })
        data.html = data.html.replace(new RegExp('inject-', 'g'), '')
        cb(null, data)
      }
    )
  })
}

module.exports = InterpolateHTMLPlugin

module.exports = function (req, res, next) {
  res.render = function (filepath, options, callback) {
    let self = this;
    let done = function (err, html) {
      res.setHeader('Content-Type', 'text.html;charset=utf-8');
      res.end(html);
    }
    res.app.render(filepath, options, callback || done);
  }
  next();
}
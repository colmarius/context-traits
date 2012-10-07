(function() {
  var browser, flag, platform, _i, _len, _ref, _ref2;

  platform = contexts.ensure('platform');

  _.extend(platform, {
    Mozilla: new Context(),
    WebKit: new Context(),
    Opera: new Context(),
    IE: new Context(),
    NodeJS: new Context()
  });

  if ($) {
    _ref = [['Mozilla', 'mozilla'], ['WebKit', 'webkit'], ['Opera', 'opera'], ['IE', 'msie']];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref2 = _ref[_i], browser = _ref2[0], flag = _ref2[1];
      if ($.browser[flag]) platform[browser].activate();
    }
  }

}).call(this);

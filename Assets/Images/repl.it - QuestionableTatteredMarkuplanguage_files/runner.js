(function(t) {
  'use strict';
  function e() {
    l &&
      (
        l.setAttribute('height', ''),
        l.setAttribute('height', h.height || h.documentElement.scrollHeight)
      );
  }
  function n() {
    l && d.removeChild(l), (l = h.createElement('iframe')), l.setAttribute(
      'width',
      '100%',
    ), 'string' == typeof f && l.setAttribute('sandbox', f), e(), d.appendChild(
      l,
    );
  }
  function s(t) {
    n(), l.addEventListener(
      'load',
      function() {
        o('load', null);
      },
      !1,
    );
    var e = l.contentWindow.document;
    e.open(), e.write(t), e.close();
  }
  function o(e, n) {
    var s = p.stringify({ data: n, type: e, secret: u });
    t.parent.postMessage(s, '*');
  }
  function r(t, e) {
    var n = l.contentWindow.Error;
    ((t && t instanceof Error) || t instanceof n) &&
      (t = {
        message: t.message,
        stack: t.stack,
        type: t.type,
        arguments: t.arguments,
        __errorType__: (t.constructor + '')
          .trim()
          .match(/^function ([^\(\s]+)/)[1],
      }), 'function' == typeof e && (e += ''), o('evaljs', {
      error: t,
      result: e,
    });
  }
  function a(t) {
    var e = null;
    try {
      e = l.contentWindow.eval(t);
    } catch (n) {
      throw (r(n, null), n);
    }
    r(null, e);
  }
  function i() {
    o('html', l.contentWindow.document.documentElement.outerHTML);
  }
  function c(t) {
    return '_custom_' + t;
  }
  var l,
    u,
    f,
    h = t.document,
    d = h.querySelector('body'),
    p = t.JSON,
    m = { load: s, evaljs: a, html: i };
  t.addEventListener(
    'message',
    function(t) {
      var e;
      try {
        e = p.parse(t.data);
      } catch (n) {
        return;
      }
      var s = e.type,
        o = e.data;
      if (e.secret)
        if (u || 'handshake' !== e.type) {
          if (e.secret !== u) return;
          if (!m[s]) throw Error('No listeners for event:' + s);
          m[s](o);
        } else (u = e.secret), (f = e.data);
    },
    !1,
  ), t.addEventListener('resize', e), (t.stuffEmit = function(t, e) {
    o('custom', { type: t, data: e });
  }), (t.stuffOn = function(t, e) {
    var n = c(t);
    if (m[n]) throw Error('Already subscribed to this event');
    m[n] = e;
  }), (t.stuffOff = function(t) {
    var e = c(t);
    delete m[e];
  });
})(window);

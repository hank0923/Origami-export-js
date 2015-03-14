var springSystem = new rebound.SpringSystem();

springSystem.addListener({
  onAfterIntegrate: function(springSystem) {
    updateLayers();
  }
});

// bouncy transition

var bouncySpring = springSystem
  .createSpringWithBouncinessAndSpeed(6, 16)
  .addListener({onSpringUpdate: function(spring) {
      setBouncyProgress(spring.getCurrentValue());
  }
               });

var bouncy = function(on) {
  bouncySpring.setEndValue(on ? 1 : 0);
};

var setBouncyProgress = function(progress) {
  var scalesmall = transition(progress, 1, 0.4);
  layers.button.scale = scalesmall;
};

// Hook up variables to dom elements here

var layers = {
  button: {
    domElement: null
  }
};

// Utilities

var transition = function(progress, startValue, endValue) {
  return rebound.MathUtil.mapValueInRange(progress, 0, 1, startValue, endValue);
};

var updateLayers = function() {
  for (var name in layers) {
    var layer = layers[name];
    var el = layer.domElement;
    el.style.width = layer.width + 'px';
    el.style.height = layer.height + 'px';
    el.style.opacity = layer.opacity;
    transform(el, layer.xPosition, layer.yPosition, layer.scale, layer.zRotation);
  }
};

var transform = function(el, xlatX, xlatY, scale, rot) {
  xlatX = typeof xlatX === 'undefined' ? 0 : xlatX;
  xlatY = typeof xlatY === 'undefined' ? 0 : xlatY;
  scale = typeof scale === 'undefined' ? 1 : scale;
  rot   = typeof rot === 'undefined' ? 0 : rot;
  var xfrm =
    'translate3d(' + xlatX + 'px, ' + xlatY + 'px, 0px) ' +
    'scale3d(' + scale + ', ' + scale + ', 1) ' +
    'rotate(' + rot + 'deg)';
  el.style.mozTransform = el.style.msTransform =
  el.style.webkitTransform = el.style.transform = xfrm;
};

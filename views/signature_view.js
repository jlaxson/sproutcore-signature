// ==========================================================================
// Project:   Signature.SignatureView
// Copyright: @2012 John Laxson
// ==========================================================================
/*globals Signature */

/** @class

  Implements a Sproutcore view wrapper for the jSignature plugin to jQuery.  
  Bind to the 'value' property for jSignature's default base30 representation,
  which can also be written back in, or set value to null to clear the signature.
  Get 'imageData' for an SVG data-url representation.

  @extends Signature.SignatureView
*/
Signature.SignatureView = SC.View.extend(
/** @scope Signature.SignatureView.prototype */ {

  classNames: ["signature-view"],
  //layout: {width: 600, height: 300},
  tagName: 'div',

  _layerInitialized: false,


  // TODO: Add your own code here.
  didAppendToDocument: function() {
    var layer = $(this.get('layer')),
        opts = {sizeRatio: 4},
        that = this;
    this._sigPad = $(layer).jSignature(opts);
    this._layerInitialized = true;

    $(layer).bind('touchend', function() {
      that.notifyPropertyChange('imageData');
      that.notifyPropertyChange('value');
    });
    $(layer).bind('mouseup', function() {
      that.notifyPropertyChange('imageData');
      that.notifyPropertyChange('value');
    })
  },

  imageData: function() {
    if (!this._sigPad) return null;
    //return this._sigPad.getSignatureImage();
    data = $(this.get('layer')).jSignature("getData", "svgbase64");
    return "data:" + data.join(",");
  }.property(),

  value: function(key, value) {
    var layer = this.get('layer')
    if (!this._layerInitialized) {
      console.error("layer not initialized!");
      return "";
    }
    if (value) {
      $(layer).jSignature("setData", value);
    } else if (value === null) {
      $(layer).jSignature("clear");
    } else {
      var data = $(this.get('layer')).jSignature("getData", "base30");
      return "data:" + data.join(",");
    }
    
  }.property().idempotent(true),

});

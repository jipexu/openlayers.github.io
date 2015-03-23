// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Definition of the WebChannelRequest class. The request
 * object encapsulates the logic for making a single request, either for the
 * forward channel, back channel, or test channel, to the server. It contains
 * the logic for the three types of transports we use:
 * XMLHTTP, Trident ActiveX (ie only), and Image request. It provides timeout
 * detection.
 *
 * @visibility {//visibility:private}
 */


goog.provide('goog.labs.net.webChannel.WebChannelRequest');

goog.require('goog.Timer');
goog.require('goog.async.Throttle');
goog.require('goog.events.EventHandler');
goog.require('goog.labs.net.webChannel.requestStats');
goog.require('goog.labs.net.webChannel.requestStats.ServerReachability');
goog.require('goog.labs.net.webChannel.requestStats.Stat');
goog.require('goog.net.ErrorCode');
goog.require('goog.net.EventType');
goog.require('goog.net.XmlHttp');
goog.require('goog.object');
goog.require('goog.userAgent');



/**
 * A new WebChannelRequest is created for each request to the server.
 *
 * @param {goog.labs.net.webChannel.Channel} channel
 *     The channel that owns this request.
 * @param {goog.labs.net.webChannel.WebChannelDebug} channelDebug A
 *     WebChannelDebug to use for logging.
 * @param {string=} opt_sessionId  The session id for the channel.
 * @param {string|number=} opt_requestId  The request id for this request.
 * @param {number=} opt_retryId  The retry id for this request.
 * @constructor
 */
goog.labs.net.webChannel.WebChannelRequest = function(channel, channelDebug,
    opt_sessionId, opt_requestId, opt_retryId) {
  /**
   * The channel object that owns the request.
   * @type {goog.labs.net.webChannel.Channel}
   * @private
   */
  this.channel_ = channel;

  /**
   * The channel debug to use for logging
   * @type {goog.labs.net.webChannel.WebChannelDebug}
   * @private
   */
  this.channelDebug_ = channelDebug;

  /**
   * The Session ID for the channel.
   * @type {string|undefined}
   * @private
   */
  this.sid_ = opt_sessionId;

  /**
   * The RID (request ID) for the request.
   * @type {string|number|undefined}
   * @private
   */
  this.rid_ = opt_requestId;


  /**
   * The attempt number of the current request.
   * @type {number}
   * @private
   */
  this.retryId_ = opt_retryId || 1;


  /**
   * The timeout in ms before failing the request.
   * @type {number}
   * @private
   */
  this.timeout_ = goog.labs.net.webChannel.WebChannelRequest.TIMEOUT_MS_;

  /**
   * An object to keep track of the channel request event listeners.
   * @type {!goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  /**
   * A timer for polling responseText in browsers that don't fire
   * onreadystatechange during incremental loading of responseText.
   * @type {goog.Timer}
   * @private
   */
  this.pollingTimer_ = new goog.Timer();

  this.pollingTimer_.setInterval(
      goog.labs.net.webChannel.WebChannelRequest.POLLING_INTERVAL_MS_);
};


goog.scope(function() {
var Channel = goog.labs.net.webChannel.Channel;
var WebChannelRequest = goog.labs.net.webChannel.WebChannelRequest;
var requestStats = goog.labs.net.webChannel.requestStats;
var WebChannelDebug = goog.labs.net.webChannel.WebChannelDebug;


/**
 * Extra HTTP headers to add to all the requests sent to the server.
 * @type {Object}
 * @private
 */
WebChannelRequest.prototype.extraHeaders_ = null;


/**
 * Whether the request was successful. This is only set to true after the
 * request successfully completes.
 * @type {boolean}
 * @private
 */
WebChannelRequest.prototype.successful_ = false;


/**
 * The TimerID of the timer used to detect if the request has timed-out.
 * @type {?number}
 * @private
 */
WebChannelRequest.prototype.watchDogTimerId_ = null;


/**
 * The time in the future when the request will timeout.
 * @type {?number}
 * @private
 */
WebChannelRequest.prototype.watchDogTimeoutTime_ = null;


/**
 * The time the request started.
 * @type {?number}
 * @private
 */
WebChannelRequest.prototype.requestStartTime_ = null;


/**
 * The type of request (XMLHTTP, IMG, Trident)
 * @type {?number}
 * @private
 */
WebChannelRequest.prototype.type_ = null;


/**
 * The base Uri for the request. The includes all the parameters except the
 * one that indicates the retry number.
 * @type {goog.Uri}
 * @private
 */
WebChannelRequest.prototype.baseUri_ = null;


/**
 * The request Uri that was actually used for the most recent request attempt.
 * @type {goog.Uri}
 * @private
 */
WebChannelRequest.prototype.requestUri_ = null;


/**
 * The post data, if the request is a post.
 * @type {?string}
 * @private
 */
WebChannelRequest.prototype.postData_ = null;


/**
 * The XhrLte request if the request is using XMLHTTP
 * @type {goog.net.XhrIo}
 * @private
 */
WebChannelRequest.prototype.xmlHttp_ = null;


/**
 * The position of where the next unprocessed chunk starts in the response
 * text.
 * @type {number}
 * @private
 */
WebChannelRequest.prototype.xmlHttpChunkStart_ = 0;


/**
 * The Trident instance if the request is using Trident.
 * @type {ActiveXObject}
 * @private
 */
WebChannelRequest.prototype.trident_ = null;


/**
 * The verb (Get or Post) for the request.
 * @type {?string}
 * @private
 */
WebChannelRequest.prototype.verb_ = null;


/**
 * The last error if the request failed.
 * @type {?WebChannelRequest.Error}
 * @private
 */
WebChannelRequest.prototype.lastError_ = null;


/**
 * The last status code received.
 * @type {number}
 * @private
 */
WebChannelRequest.prototype.lastStatusCode_ = -1;


/**
 * Whether to send the Connection:close header as part of the request.
 * @type {boolean}
 * @private
 */
WebChannelRequest.prototype.sendClose_ = true;


/**
 * Whether the request has been cancelled due to a call to cancel.
 * @type {boolean}
 * @private
 */
WebChannelRequest.prototype.cancelled_ = false;


/**
 * A throttle time in ms for readystatechange events for the backchannel.
 * Useful for throttling when ready state is INTERACTIVE (partial data).
 * If set to zero no throttle is used.
 *
 * See WebChannelBase.prototype.readyStateChangeThrottleMs_
 *
 * @type {number}
 * @private
 */
WebChannelRequest.prototype.readyStateChangeThrottleMs_ = 0;


/**
 * The throttle for readystatechange events for the current request, or null
 * if there is none.
 * @type {goog.async.Throttle}
 * @private
 */
WebChannelRequest.prototype.readyStateChangeThrottle_ = null;


/**
 * Default timeout in MS for a request. The server must return data within this
 * time limit for the request to not timeout.
 * @type {number}
 * @private
 */
WebChannelRequest.TIMEOUT_MS_ = 45 * 1000;


/**
 * How often to poll (in MS) for changes to responseText in browsers that don't
 * fire onreadystatechange during incremental loading of responseText.
 * @type {number}
 * @private
 */
WebChannelRequest.POLLING_INTERVAL_MS_ = 250;


/**
 * Enum for channel requests type
 * @enum {number}
 * @private
 */
WebChannelRequest.Type_ = {
  /**
   * XMLHTTP requests.
   */
  XML_HTTP: 1,

  /**
   * IMG requests.
   */
  IMG: 2,

  /**
   * Requests that use the MSHTML ActiveX control.
   */
  TRIDENT: 3
};


/**
 * Enum type for identifying an error.
 * @enum {number}
 */
WebChannelRequest.Error = {
  /**
   * Errors due to a non-200 status code.
   */
  STATUS: 0,

  /**
   * Errors due to no data being returned.
   */
  NO_DATA: 1,

  /**
   * Errors due to a timeout.
   */
  TIMEOUT: 2,

  /**
   * Errors due to the server returning an unknown.
   */
  UNKNOWN_SESSION_ID: 3,

  /**
   * Errors due to bad data being received.
   */
  BAD_DATA: 4,

  /**
   * Errors due to the handler throwing an exception.
   */
  HANDLER_EXCEPTION: 5,

  /**
   * The browser declared itself offline during the request.
   */
  BROWSER_OFFLINE: 6,

  /**
   * IE is blocking ActiveX streaming.
   */
  ACTIVE_X_BLOCKED: 7
};


/**
 * Returns a useful error string for debugging based on the specified error
 * code.
 * @param {WebChannelRequest.Error} errorCode The error code.
 * @param {number} statusCode The HTTP status code.
 * @return {string} The error string for the given code combination.
 */
WebChannelRequest.errorStringFromCode = function(
    errorCode, statusCode) {
  switch (errorCode) {
    case WebChannelRequest.Error.STATUS:
      return 'Non-200 return code (' + statusCode + ')';
    case WebChannelRequest.Error.NO_DATA:
      return 'XMLHTTP failure (no data)';
    case WebChannelRequest.Error.TIMEOUT:
      return 'HttpConnection timeout';
    default:
      return 'Unknown error';
  }
};


/**
 * Sentinel value used to indicate an invalid chunk in a multi-chunk response.
 * @type {Object}
 * @private
 */
WebChannelRequest.INVALID_CHUNK_ = {};


/**
 * Sentinel value used to indicate an incomplete chunk in a multi-chunk
 * response.
 * @type {Object}
 * @private
 */
WebChannelRequest.INCOMPLETE_CHUNK_ = {};


/**
 * Returns whether XHR streaming is supported on this browser.
 *
 * If XHR streaming is not supported, we will try to use an ActiveXObject
 * to create a Forever IFrame.
 *
 * @return {boolean} Whether XHR streaming is supported.
 * @see http://code.google.com/p/closure-library/issues/detail?id=346
 */
WebChannelRequest.supportsXhrStreaming = function() {
  return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(10);
};


/**
 * Sets extra HTTP headers to add to all the requests sent to the server.
 *
 * @param {Object} extraHeaders The HTTP headers.
 */
WebChannelRequest.prototype.setExtraHeaders = function(extraHeaders) {
  this.extraHeaders_ = extraHeaders;
};


/**
 * Sets the timeout for a request
 *
 * @param {number} timeout   The timeout in MS for when we fail the request.
 */
WebChannelRequest.prototype.setTimeout = function(timeout) {
  this.timeout_ = timeout;
};


/**
 * Sets the throttle for handling onreadystatechange events for the request.
 *
 * @param {number} throttle The throttle in ms.  A value of zero indicates
 *     no throttle.
 */
WebChannelRequest.prototype.setReadyStateChangeThrottle = function(
    throttle) {
  this.readyStateChangeThrottleMs_ = throttle;
};


/**
 * Uses XMLHTTP to send an HTTP POST to the server.
 *
 * @param {goog.Uri} uri  The uri of the request.
 * @param {string} postData  The data for the post body.
 * @param {boolean} decodeChunks  Whether to the result is expected to be
 *     encoded for chunking and thus requires decoding.
 */
WebChannelRequest.prototype.xmlHttpPost = function(uri, postData,
    decodeChunks) {
  this.type_ = WebChannelRequest.Type_.XML_HTTP;
  this.baseUri_ = uri.clone().makeUnique();
  this.postData_ = postData;
  this.decodeChunks_ = decodeChunks;
  this.sendXmlHttp_(null /* hostPrefix */);
};


/**
 * Uses XMLHTTP to send an HTTP GET to the server.
 *
 * @param {goog.Uri} uri  The uri of the request.
 * @param {boolean} decodeChunks  Whether to the result is expected to be
 *     encoded for chunking and thus requires decoding.
 * @param {?string} hostPrefix  The host prefix, if we might be using a
 *     secondary domain.  Note that it should also be in the URL, adding this
 *     won't cause it to be added to the URL.
 * @param {boolean=} opt_noClose   Whether to request that the tcp/ip connection
 *     should be closed.
 */
WebChannelRequest.prototype.xmlHttpGet = function(uri, decodeChunks,
    hostPrefix, opt_noClose) {
  this.type_ = WebChannelRequest.Type_.XML_HTTP;
  this.baseUri_ = uri.clone().makeUnique();
  this.postData_ = null;
  this.decodeChunks_ = decodeChunks;
  if (opt_noClose) {
    this.sendClose_ = false;
  }
  this.sendXmlHttp_(hostPrefix);
};


/**
 * Sends a request via XMLHTTP according to the current state of the request
 * object.
 *
 * @param {?string} hostPrefix The host prefix, if we might be using a secondary
 *     domain.
 * @private
 */
WebChannelRequest.prototype.sendXmlHttp_ = function(hostPrefix) {
  this.requestStartTime_ = goog.now();
  this.ensureWatchDogTimer_();

  // clone the base URI to create the request URI. The request uri has the
  // attempt number as a parameter which helps in debugging.
  this.requestUri_ = this.baseUri_.clone();
  this.requestUri_.setParameterValues('t', this.retryId_);

  // send the request either as a POST or GET
  this.xmlHttpChunkStart_ = 0;
  var useSecondaryDomains = this.channel_.shouldUseSecondaryDomains();
  this.xmlHttp_ = this.channel_.createXhrIo(useSecondaryDomains ?
      hostPrefix : null);

  if (this.readyStateChangeThrottleMs_ > 0) {
    this.readyStateChangeThrottle_ = new goog.async.Throttle(
        goog.bind(this.xmlHttpHandler_, this, this.xmlHttp_),
        this.readyStateChangeThrottleMs_);
  }

  this.eventHandler_.listen(this.xmlHttp_,
      goog.net.EventType.READY_STATE_CHANGE,
      this.readyStateChangeHandler_);

  var headers = this.extraHeaders_ ? goog.object.clone(this.extraHeaders_) : {};
  if (this.postData_) {
    this.verb_ = 'POST';
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    this.xmlHttp_.send(this.requestUri_, this.verb_, this.postData_, headers);
  } else {
    this.verb_ = 'GET';

    // If the user agent is webkit, we cannot send the close header since it is
    // disallowed by the browser.  If we attempt to set the "Connection: close"
    // header in WEBKIT browser, it will actually causes an error message.
    if (this.sendClose_ && !goog.userAgent.WEBKIT) {
      headers['Connection'] = 'close';
    }
    this.xmlHttp_.send(this.requestUri_, this.verb_, null, headers);
  }
  requestStats.notifyServerReachabilityEvent(
      requestStats.ServerReachability.REQUEST_MADE);
  this.channelDebug_.xmlHttpChannelRequest(this.verb_,
      this.requestUri_, this.rid_, this.retryId_,
      this.postData_);
};


/**
 * Handles a readystatechange event.
 * @param {goog.events.Event} evt The event.
 * @private
 */
WebChannelRequest.prototype.readyStateChangeHandler_ = function(evt) {
  var xhr = /** @type {goog.net.XhrIo} */ (evt.target);
  var throttle = this.readyStateChangeThrottle_;
  if (throttle &&
      xhr.getReadyState() == goog.net.XmlHttp.ReadyState.INTERACTIVE) {
    // Only throttle in the partial data case.
    this.channelDebug_.debug('Throttling readystatechange.');
    throttle.fire();
  } else {
    // If we haven't throttled, just handle response directly.
    this.xmlHttpHandler_(xhr);
  }
};


/**
 * XmlHttp handler
 * @param {goog.net.XhrIo} xmlhttp The XhrIo object for the current request.
 * @private
 */
WebChannelRequest.prototype.xmlHttpHandler_ = function(xmlhttp) {
  requestStats.onStartExecution();

  /** @preserveTry */
  try {
    if (xmlhttp == this.xmlHttp_) {
      this.onXmlHttpReadyStateChanged_();
    } else {
      this.channelDebug_.warning('Called back with an ' +
                                     'unexpected xmlhttp');
    }
  } catch (ex) {
    this.channelDebug_.debug('Failed call to OnXmlHttpReadyStateChanged_');
    if (this.xmlHttp_ && this.xmlHttp_.getResponseText()) {
      this.channelDebug_.dumpException(ex,
          'ResponseText: ' + this.xmlHttp_.getResponseText());
    } else {
      this.channelDebug_.dumpException(ex, 'No response text');
    }
  } finally {
    requestStats.onEndExecution();
  }
};


/**
 * Called by the readystate handler for XMLHTTP requests.
 *
 * @private
 */
WebChannelRequest.prototype.onXmlHttpReadyStateChanged_ = function() {
  var readyState = this.xmlHttp_.getReadyState();
  var errorCode = this.xmlHttp_.getLastErrorCode();
  var statusCode = this.xmlHttp_.getStatus();
  if (!WebChannelRequest.supportsXhrStreaming()) {
    if (readyState < goog.net.XmlHttp.ReadyState.COMPLETE) {
      // not yet ready
      return;
    }
  } else {
    // we get partial results in browsers that support ready state interactive.
    // We also make sure that getResponseText is not null in interactive mode
    // before we continue.  However, we don't do it in Opera because it only
    // fire readyState == INTERACTIVE once.  We need the following code to poll
    if (readyState < goog.net.XmlHttp.ReadyState.INTERACTIVE ||
        readyState == goog.net.XmlHttp.ReadyState.INTERACTIVE &&
        !goog.userAgent.OPERA && !this.xmlHttp_.getResponseText()) {
      // not yet ready
      return;
    }
  }

  // Dispatch any appropriate network events.
  if (!this.cancelled_ && readyState == goog.net.XmlHttp.ReadyState.COMPLETE &&
      errorCode != goog.net.ErrorCode.ABORT) {

    // Pretty conservative, these are the only known scenarios which we'd
    // consider indicative of a truly non-functional network connection.
    if (errorCode == goog.net.ErrorCode.TIMEOUT ||
        statusCode <= 0) {
      requestStats.notifyServerReachabilityEvent(
          requestStats.ServerReachability.REQUEST_FAILED);
    } else {
      requestStats.notifyServerReachabilityEvent(
          requestStats.ServerReachability.REQUEST_SUCCEEDED);
    }
  }

  // got some data so cancel the watchdog timer
  this.cancelWatchDogTimer_();

  var status = this.xmlHttp_.getStatus();
  this.lastStatusCode_ = status;
  var responseText = this.xmlHttp_.getResponseText();
  if (!responseText) {
    this.channelDebug_.debug('No response text for uri ' +
        this.requestUri_ + ' status ' + status);
  }
  this.successful_ = (status == 200);

  this.channelDebug_.xmlHttpChannelResponseMetaData(
      /** @type {string} */ (this.verb_),
      this.requestUri_, this.rid_, this.retryId_, readyState,
      status);

  if (!this.successful_) {
    if (status == 400 &&
        responseText.indexOf('Unknown SID') > 0) {
      // the server error string will include 'Unknown SID' which indicates the
      // server doesn't know about the session (maybe it got restarted, maybe
      // the user got moved to another server, etc.,). Handlers can special
      // case this error
      this.lastError_ = WebChannelRequest.Error.UNKNOWN_SESSION_ID;
      requestStats.notifyStatEvent(
          requestStats.Stat.REQUEST_UNKNOWN_SESSION_ID);
      this.channelDebug_.warning('XMLHTTP Unknown SID (' + this.rid_ + ')');
    } else {
      this.lastError_ = WebChannelRequest.Error.STATUS;
      requestStats.notifyStatEvent(requestStats.Stat.REQUEST_BAD_STATUS);
      this.channelDebug_.warning(
          'XMLHTTP Bad status ' + status + ' (' + this.rid_ + ')');
    }
    this.cleanup_();
    this.dispatchFailure_();
    return;
  }

  if (readyState == goog.net.XmlHttp.ReadyState.COMPLETE) {
    this.cleanup_();
  }

  if (this.decodeChunks_) {
    this.decodeNextChunks_(readyState, responseText);
    if (goog.userAgent.OPERA &&
        readyState == goog.net.XmlHttp.ReadyState.INTERACTIVE) {
      this.startPolling_();
    }
  } else {
    this.channelDebug_.xmlHttpChannelResponseText(
        this.rid_, responseText, null);
    this.safeOnRequestData_(responseText);
  }

  if (!this.successful_) {
    return;
  }

  if (!this.cancelled_) {
    if (readyState == goog.net.XmlHttp.ReadyState.COMPLETE) {
      this.channel_.onRequestComplete(this);
    } else {
      // The default is false, the result from this callback shouldn't carry
      // over to the next callback, otherwise the request looks successful if
      // the watchdog timer gets called
      this.successful_ = false;
      this.ensureWatchDogTimer_();
    }
  }
};


/**
 * Decodes the next set of available chunks in the response.
 * @param {number} readyState The value of readyState.
 * @param {string} responseText The value of responseText.
 * @private
 */
WebChannelRequest.prototype.decodeNextChunks_ = function(readyState,
        responseText) {
  var decodeNextChunksSuccessful = true;
  while (!this.cancelled_ &&
         this.xmlHttpChunkStart_ < responseText.length) {
    var chunkText = this.getNextChunk_(responseText);
    if (chunkText == WebChannelRequest.INCOMPLETE_CHUNK_) {
      if (readyState == goog.net.XmlHttp.ReadyState.COMPLETE) {
        // should have consumed entire response when the request is done
        this.lastError_ = WebChannelRequest.Error.BAD_DATA;
        requestStats.notifyStatEvent(
            requestStats.Stat.REQUEST_INCOMPLETE_DATA);
        decodeNextChunksSuccessful = false;
      }
      this.channelDebug_.xmlHttpChannelResponseText(
          this.rid_, null, '[Incomplete Response]');
      break;
    } else if (chunkText == WebChannelRequest.INVALID_CHUNK_) {
      this.lastError_ = WebChannelRequest.Error.BAD_DATA;
      requestStats.notifyStatEvent(requestStats.Stat.REQUEST_BAD_DATA);
      this.channelDebug_.xmlHttpChannelResponseText(
          this.rid_, responseText, '[Invalid Chunk]');
      decodeNextChunksSuccessful = false;
      break;
    } else {
      this.channelDebug_.xmlHttpChannelResponseText(
          this.rid_, /** @type {string} */ (chunkText), null);
      this.safeOnRequestData_(/** @type {string} */ (chunkText));
    }
  }
  if (readyState == goog.net.XmlHttp.ReadyState.COMPLETE &&
      responseText.length == 0) {
    // also an error if we didn't get any response
    this.lastError_ = WebChannelRequest.Error.NO_DATA;
    requestStats.notifyStatEvent(requestStats.Stat.REQUEST_NO_DATA);
    decodeNextChunksSuccessful = false;
  }
  this.successful_ = this.successful_ && decodeNextChunksSuccessful;
  if (!decodeNextChunksSuccessful) {
    // malformed response - we make this trigger retry logic
    this.channelDebug_.xmlHttpChannelResponseText(
        this.rid_, responseText, '[Invalid Chunked Response]');
    this.cleanup_();
    this.dispatchFailure_();
  }
};


/**
 * Polls the response for new data.
 * @private
 */
WebChannelRequest.prototype.pollResponse_ = function() {
  var readyState = this.xmlHttp_.getReadyState();
  var responseText = this.xmlHttp_.getResponseText();
  if (this.xmlHttpChunkStart_ < responseText.length) {
    this.cancelWatchDogTimer_();
    this.decodeNextChunks_(readyState, responseText);
    if (this.successful_ &&
        readyState != goog.net.XmlHttp.ReadyState.COMPLETE) {
      this.ensureWatchDogTimer_();
    }
  }
};


/**
 * Starts a polling interval for changes to responseText of the
 * XMLHttpRequest, for browsers that don't fire onreadystatechange
 * as data comes in incrementally.  This timer is disabled in
 * cleanup_().
 * @private
 */
WebChannelRequest.prototype.startPolling_ = function() {
  this.eventHandler_.listen(this.pollingTimer_, goog.Timer.TICK,
      this.pollResponse_);
  this.pollingTimer_.start();
};


/**
 * Called when the browser declares itself offline at the start of a request or
 * during its lifetime.  Abandons that request.
 * @private
 */
WebChannelRequest.prototype.cancelRequestAsBrowserIsOffline_ = function() {
  if (this.successful_) {
    // Should never happen.
    this.channelDebug_.severe(
        'Received browser offline event even though request completed ' +
        'successfully');
  }

  this.channelDebug_.browserOfflineResponse(this.requestUri_);
  this.cleanup_();

  // set error and dispatch failure
  this.lastError_ = WebChannelRequest.Error.BROWSER_OFFLINE;
  requestStats.notifyStatEvent(requestStats.Stat.BROWSER_OFFLINE);
  this.dispatchFailure_();
};


/**
 * Returns the next chunk of a chunk-encoded response. This is not standard
 * HTTP chunked encoding because browsers don't expose the chunk boundaries to
 * the application through XMLHTTP. So we have an additional chunk encoding at
 * the application level that lets us tell where the beginning and end of
 * individual responses are so that we can only try to eval a complete JS array.
 *
 * The encoding is the size of the chunk encoded as a decimal string followed
 * by a newline followed by the data.
 *
 * @param {string} responseText The response text from the XMLHTTP response.
 * @return {string|Object} The next chunk string or a sentinel object
 *                         indicating a special condition.
 * @private
 */
WebChannelRequest.prototype.getNextChunk_ = function(responseText) {
  var sizeStartIndex = this.xmlHttpChunkStart_;
  var sizeEndIndex = responseText.indexOf('\n', sizeStartIndex);
  if (sizeEndIndex == -1) {
    return WebChannelRequest.INCOMPLETE_CHUNK_;
  }

  var sizeAsString = responseText.substring(sizeStartIndex, sizeEndIndex);
  var size = Number(sizeAsString);
  if (isNaN(size)) {
    return WebChannelRequest.INVALID_CHUNK_;
  }

  var chunkStartIndex = sizeEndIndex + 1;
  if (chunkStartIndex + size > responseText.length) {
    return WebChannelRequest.INCOMPLETE_CHUNK_;
  }

  var chunkText = responseText.substr(chunkStartIndex, size);
  this.xmlHttpChunkStart_ = chunkStartIndex + size;
  return chunkText;
};


/**
 * Uses the Trident htmlfile ActiveX control to send a GET request in IE. This
 * is the innovation discovered that lets us get intermediate results in
 * Internet Explorer.  Thanks to http://go/kev
 * @param {goog.Uri} uri The uri to request from.
 * @param {boolean} usingSecondaryDomain Whether to use a secondary domain.
 */
WebChannelRequest.prototype.tridentGet = function(uri,
    usingSecondaryDomain) {
  this.type_ = WebChannelRequest.Type_.TRIDENT;
  this.baseUri_ = uri.clone().makeUnique();
  this.tridentGet_(usingSecondaryDomain);
};


/**
 * Starts the Trident request.
 * @param {boolean} usingSecondaryDomain Whether to use a secondary domain.
 * @private
 */
WebChannelRequest.prototype.tridentGet_ = function(usingSecondaryDomain) {
  this.requestStartTime_ = goog.now();
  this.ensureWatchDogTimer_();

  var hostname = usingSecondaryDomain ? window.location.hostname : '';
  this.requestUri_ = this.baseUri_.clone();
  this.requestUri_.setParameterValue('DOMAIN', hostname);
  this.requestUri_.setParameterValue('t', this.retryId_);

  try {
    this.trident_ = new ActiveXObject('htmlfile');
  } catch (e) {
    this.channelDebug_.severe('ActiveX blocked');
    this.cleanup_();

    this.lastError_ = WebChannelRequest.Error.ACTIVE_X_BLOCKED;
    requestStats.notifyStatEvent(requestStats.Stat.ACTIVE_X_BLOCKED);
    this.dispatchFailure_();
    return;
  }

  var body = '<html><body>';
  if (usingSecondaryDomain) {
    body += '<script>document.domain="' + hostname + '"</scr' + 'ipt>';
  }
  body += '</body></html>';

  this.trident_.open();
  this.trident_.write(body);
  this.trident_.close();

  this.trident_.parentWindow['m'] = goog.bind(this.onTridentRpcMessage_, this);
  this.trident_.parentWindow['d'] = goog.bind(this.onTridentDone_, this, true);
  this.trident_.parentWindow['rpcClose'] =
      goog.bind(this.onTridentDone_, this, false);

  var div = this.trident_.createElement('div');
  this.trident_.parentWindow.document.body.appendChild(div);
  div.innerHTML = '<iframe src="' + this.requestUri_ + '"></iframe>';
  this.channelDebug_.tridentChannelRequest('GET',
      this.requestUri_, this.rid_, this.retryId_);
  requestStats.notifyServerReachabilityEvent(
      requestStats.ServerReachability.REQUEST_MADE);
};


/**
 * Callback from the Trident htmlfile ActiveX control for when a new message
 * is received.
 *
 * @param {string} msg The data payload.
 * @private
 */
WebChannelRequest.prototype.onTridentRpcMessage_ = function(msg) {
  // need to do async b/c this gets called off of the context of the ActiveX
  requestStats.setTimeout(
      goog.bind(this.onTridentRpcMessageAsync_, this, msg), 0);
};


/**
 * Callback from the Trident htmlfile ActiveX control for when a new message
 * is received.
 *
 * @param {string} msg  The data payload.
 * @private
 */
WebChannelRequest.prototype.onTridentRpcMessageAsync_ = function(msg) {
  if (this.cancelled_) {
    return;
  }
  this.channelDebug_.tridentChannelResponseText(this.rid_, msg);
  this.cancelWatchDogTimer_();
  this.safeOnRequestData_(msg);
  this.ensureWatchDogTimer_();
};


/**
 * Callback from the Trident htmlfile ActiveX control for when the request
 * is complete
 *
 * @param {boolean} successful Whether the request successfully completed.
 * @private
 */
WebChannelRequest.prototype.onTridentDone_ = function(successful) {
  // need to do async b/c this gets called off of the context of the ActiveX
  requestStats.setTimeout(
      goog.bind(this.onTridentDoneAsync_, this, successful), 0);
};


/**
 * Callback from the Trident htmlfile ActiveX control for when the request
 * is complete
 *
 * @param {boolean} successful Whether the request successfully completed.
 * @private
 */
WebChannelRequest.prototype.onTridentDoneAsync_ = function(
    successful) {
  if (this.cancelled_) {
    return;
  }
  this.channelDebug_.tridentChannelResponseDone(
      this.rid_, successful);
  this.cleanup_();
  this.successful_ = successful;
  this.channel_.onRequestComplete(this);
  requestStats.notifyServerReachabilityEvent(
      requestStats.ServerReachability.BACK_CHANNEL_ACTIVITY);
};


/**
 * Uses an IMG tag to send an HTTP get to the server. This is only currently
 * used to terminate the connection, as an IMG tag is the most reliable way to
 * send something to the server while the page is getting torn down.
 * @param {goog.Uri} uri The uri to send a request to.
 */
WebChannelRequest.prototype.sendUsingImgTag = function(uri) {
  this.type_ = WebChannelRequest.Type_.IMG;
  this.baseUri_ = uri.clone().makeUnique();
  this.imgTagGet_();
};


/**
 * Starts the IMG request.
 *
 * @private
 */
WebChannelRequest.prototype.imgTagGet_ = function() {
  var eltImg = new Image();
  eltImg.src = this.baseUri_;
  this.requestStartTime_ = goog.now();
  this.ensureWatchDogTimer_();
};


/**
 * Cancels the request no matter what the underlying transport is.
 */
WebChannelRequest.prototype.cancel = function() {
  this.cancelled_ = true;
  this.cleanup_();
};


/**
 * Ensures that there is watchdog timeout which is used to ensure that
 * the connection completes in time.
 *
 * @private
 */
WebChannelRequest.prototype.ensureWatchDogTimer_ = function() {
  this.watchDogTimeoutTime_ = goog.now() + this.timeout_;
  this.startWatchDogTimer_(this.timeout_);
};


/**
 * Starts the watchdog timer which is used to ensure that the connection
 * completes in time.
 * @param {number} time The number of milliseconds to wait.
 * @private
 */
WebChannelRequest.prototype.startWatchDogTimer_ = function(time) {
  if (this.watchDogTimerId_ != null) {
    // assertion
    throw Error('WatchDog timer not null');
  }
  this.watchDogTimerId_ = requestStats.setTimeout(
      goog.bind(this.onWatchDogTimeout_, this), time);
};


/**
 * Cancels the watchdog timer if it has been started.
 *
 * @private
 */
WebChannelRequest.prototype.cancelWatchDogTimer_ = function() {
  if (this.watchDogTimerId_) {
    goog.global.clearTimeout(this.watchDogTimerId_);
    this.watchDogTimerId_ = null;
  }
};


/**
 * Called when the watchdog timer is triggered. It also handles a case where it
 * is called too early which we suspect may be happening sometimes
 * (not sure why)
 *
 * @private
 */
WebChannelRequest.prototype.onWatchDogTimeout_ = function() {
  this.watchDogTimerId_ = null;
  var now = goog.now();
  if (now - this.watchDogTimeoutTime_ >= 0) {
    this.handleTimeout_();
  } else {
    // got called too early for some reason
    this.channelDebug_.warning('WatchDog timer called too early');
    this.startWatchDogTimer_(this.watchDogTimeoutTime_ - now);
  }
};


/**
 * Called when the request has actually timed out. Will cleanup and notify the
 * channel of the failure.
 *
 * @private
 */
WebChannelRequest.prototype.handleTimeout_ = function() {
  if (this.successful_) {
    // Should never happen.
    this.channelDebug_.severe(
        'Received watchdog timeout even though request loaded successfully');
  }

  this.channelDebug_.timeoutResponse(this.requestUri_);
  // IMG requests never notice if they were successful, and always 'time out'.
  // This fact says nothing about reachability.
  if (this.type_ != WebChannelRequest.Type_.IMG) {
    requestStats.notifyServerReachabilityEvent(
        requestStats.ServerReachability.REQUEST_FAILED);
  }
  this.cleanup_();

  // set error and dispatch failure
  this.lastError_ = WebChannelRequest.Error.TIMEOUT;
  requestStats.notifyStatEvent(requestStats.Stat.REQUEST_TIMEOUT);
  this.dispatchFailure_();
};


/**
 * Notifies the channel that this request failed.
 * @private
 */
WebChannelRequest.prototype.dispatchFailure_ = function() {
  if (this.channel_.isClosed() || this.cancelled_) {
    return;
  }

  this.channel_.onRequestComplete(this);
};


/**
 * Cleans up the objects used to make the request. This function is
 * idempotent.
 *
 * @private
 */
WebChannelRequest.prototype.cleanup_ = function() {
  this.cancelWatchDogTimer_();

  goog.dispose(this.readyStateChangeThrottle_);
  this.readyStateChangeThrottle_ = null;

  // Stop the polling timer, if necessary.
  this.pollingTimer_.stop();

  // Unhook all event handlers.
  this.eventHandler_.removeAll();

  if (this.xmlHttp_) {
    // clear out this.xmlHttp_ before aborting so we handle getting reentered
    // inside abort
    var xmlhttp = this.xmlHttp_;
    this.xmlHttp_ = null;
    xmlhttp.abort();
    xmlhttp.dispose();
  }

  if (this.trident_) {
    this.trident_ = null;
  }
};


/**
 * Indicates whether the request was successful. Only valid after the handler
 * is called to indicate completion of the request.
 *
 * @return {boolean} True if the request succeeded.
 */
WebChannelRequest.prototype.getSuccess = function() {
  return this.successful_;
};


/**
 * If the request was not successful, returns the reason.
 *
 * @return {?WebChannelRequest.Error}  The last error.
 */
WebChannelRequest.prototype.getLastError = function() {
  return this.lastError_;
};


/**
 * Returns the status code of the last request.
 * @return {number} The status code of the last request.
 */
WebChannelRequest.prototype.getLastStatusCode = function() {
  return this.lastStatusCode_;
};


/**
 * Returns the session id for this channel.
 *
 * @return {string|undefined} The session ID.
 */
WebChannelRequest.prototype.getSessionId = function() {
  return this.sid_;
};


/**
 * Returns the request id for this request. Each request has a unique request
 * id and the request IDs are a sequential increasing count.
 *
 * @return {string|number|undefined} The request ID.
 */
WebChannelRequest.prototype.getRequestId = function() {
  return this.rid_;
};


/**
 * Returns the data for a post, if this request is a post.
 *
 * @return {?string} The POST data provided by the request initiator.
 */
WebChannelRequest.prototype.getPostData = function() {
  return this.postData_;
};


/**
 * Returns the time that the request started, if it has started.
 *
 * @return {?number} The time the request started, as returned by goog.now().
 */
WebChannelRequest.prototype.getRequestStartTime = function() {
  return this.requestStartTime_;
};


/**
 * Helper to call the callback's onRequestData, which catches any
 * exception and cleans up the request.
 * @param {string} data The request data.
 * @private
 */
WebChannelRequest.prototype.safeOnRequestData_ = function(data) {
  /** @preserveTry */
  try {
    this.channel_.onRequestData(this, data);
    var stats = requestStats.ServerReachability;
    requestStats.notifyServerReachabilityEvent(stats.BACK_CHANNEL_ACTIVITY);
  } catch (e) {
    // Dump debug info, but keep going without closing the channel.
    this.channelDebug_.dumpException(
        e, 'Error in httprequest callback');
  }
};


/**
 * Convenience factory method.
 *
 * @param {Channel} channel The channel object that owns this request.
 * @param {WebChannelDebug} channelDebug A WebChannelDebug to use for logging.
 * @param {string=} opt_sessionId  The session id for the channel.
 * @param {string|number=} opt_requestId  The request id for this request.
 * @param {number=} opt_retryId  The retry id for this request.
 * @return {WebChannelRequest} The created channel request.
 */
WebChannelRequest.createChannelRequest = function(channel, channelDebug,
    opt_sessionId, opt_requestId, opt_retryId) {
  return new WebChannelRequest(
      channel,
      channelDebug,
      opt_sessionId,
      opt_requestId,
      opt_retryId);
};
});  // goog.scope
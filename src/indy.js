(function() {
  window.btnFeedback;
  var MAX_RETRY = 10,
    WAIT_FOR_RETRY = 200;
  var userConfig,
    background, // btn background
    apiUrl,
    label, // btn label
    element, // btn
    application,
    containers = {},
    translatedTemplates,
    divToAppend,
    divToCapture,
    spacing,
    perspective,
    positionAside,
    positionX,
    backgroundColor,
    html2canvas = window["html2canvas"],
    nbRetryInitShow = 0,
    nbRetryInitHide = 0,
    initReady = false,
    note = false,
    email = "",
    comment = "",
    data = [],
    base64 = "";
  var trads = {
    en: {
      panelTitle: "Product feedback",
      labelBtnPopup: "Feedback",
      labelHeaderPopup: "Send a feedback",
      labelDescPopup: "How would you rate your experience on our tool ?",
      labelNotation: "How was your experience today?",
      labelCommentNegative: "What was the issue  ?",
      labelCommentNeutral: "What can we do to make you happy ?",
      labelCommentPositif: "What did you like ?",
      labelEmail: "Your e-mail",
      labelBtnSend: "Send my feedback",
      feedbackSuccess: "Your feedback was successfully sent.",
      closeFeedback: "Close",
      labelCapture: "Send a screenshot",
      tradNegative: "unsatisfying",
      tradNeutral: "neutral",
      tradPositive: "satisfying",
      emailAnonymous:
        "Your email will only be used to contact you about your comment. Leave blank if you wish to remain anonymous.",
      type: "Type",
      bug: "Bug",
      feedback: "Feedback"
    },
    fr: {
      panelTitle: "Feedback produit",
      labelBtnPopup: "Feedback",
      labelHeaderPopup: "Envoyer un feedback",
      labelDescPopup: "Comment jugez-vous votre expérience avec notre outil ?",
      labelNotation: "Comment jugeriez-vous votre expérience ?",
      labelCommentNegative: "Quel a été le problème ?",
      labelCommentNeutral:
        "Que pouvons-nous faire pour vous rendre plus heureux ?",
      labelCommentPositif: "Qu'avez-vous aimé ?",
      labelEmail: "Votre e-mail",
      labelBtnSend: "Envoyer mon feedback",
      feedbackSuccess: "Votre feedback a bien été envoyé.",
      closeFeedback: "Fermer",
      labelCapture: "Envoyer une capture d'écran",
      tradNegative: "insatisfaisante",
      tradNeutral: "neutre",
      tradPositive: "satisfaisante",
      emailAnonymous:
        "Votre email sera utilisée uniquement pour vous contacter à propos de votre commentaire. Laisser vide si vous souhaitez rester anonyme.",
      type: "Type de retour",
      bug: "Bug",
      feedback: "Feedback"
    }
  };

  var templates = {
    btnPopup:
      '<div data-html2canvas-ignore data-action="openFeedback" id="feedback-btn" class="wid-indy-button--feedback btn_container" data-y="bottom"><div id="feedback-btn-background" class="btn_background"></div><div class="btn_label" id="feedback-btn-label">#trads:labelBtnPopup#</div></div>',
    //btnPopup: '<span class="wid-indy-button--feedback wid-indy-button--feedback_container"><span class="wid-indy-button--feedback_content"></span></span>',
    popup:
      '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">' +
      '<symbol id="star" viewBox="214.7 0 182.6 792">' +
      "</symbol>" +
      "</svg>" +
      '<div data-html2canvas-ignore data-popup="feedback" id="wid-indy-w-container" class="wid-indy-w-container">' +
      '<div data-step-feedback="1" class="step-feedback-1">' +
      '<div class="wid-indy-form-group">' +
      '<div class="wid-indy-label wid-indy-label--light wid-indy-label-stars">' +
      "#trads:labelNotation#" +
      "</div>" +
      '<div id="full-stars-example-two">' +
      '<div class="rating-group">' +
      '<input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">' +
      '<label aria-label="1 star" class="rating__label" data-note="-2" for="rating3--2">' +
      '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star"  width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      "<defs>" +
      '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>' +
      "</defs>" +
      '<use xlink:href="#a" fill-rule="evenodd"/>' +
      "</svg>" +
      "</label>" +
      '<input class="rating__input  rating__input--none" name="rating3" id="rating3--2" value="-2" type="radio">' +
      '<label aria-label="2 stars" data-note="-1" class="rating__label" for="rating3--1">' +
      '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      "<defs>" +
      '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>' +
      "</defs>" +
      '<use xlink:href="#a" fill-rule="evenodd"/>' +
      "</svg>" +
      "</label>" +
      '<input class="rating__input  rating__input--none" name="rating3" id="rating3--1" value="-1" type="radio">' +
      '<label aria-label="3 stars" data-note="0" class="rating__label" for="rating3-0">' +
      '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      "<defs>" +
      '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>' +
      "</defs>" +
      '<use xlink:href="#a" fill-rule="evenodd"/>' +
      "</svg>" +
      "</label>" +
      '<input class="rating__input  rating__input--none" name="rating3" id="rating3-0" value="0" type="radio">' +
      '<label aria-label="4 stars" data-note="1" class="rating__label" for="rating3-1">' +
      '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      "<defs>" +
      '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>' +
      "</defs>" +
      '<use xlink:href="#a" fill-rule="evenodd"/>' +
      "</svg>" +
      "</label>" +
      '<input class="rating__input  rating__input--none" name="rating3" id="rating3-1" value="1" type="radio">' +
      '<label aria-label="5 stars" data-note="2" class="rating__label" for="rating3-2">' +
      '<svg viewBox="0 0 16 16" class=" rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
      "<defs>" +
      '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>' +
      "</defs>" +
      '<use xlink:href="#a" fill-rule="evenodd"/>' +
      "</svg>" +
      "</label>" +
      '<input class="rating__input rating__input--none" name="rating3" id="rating3-2" value="2" type="radio">' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="wid-indy-form-group">' +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note-1 wid-indy-label--light is-shown wid-indy-label-comment">' +
      "#trads:labelCommentPositif#" +
      "</label>" +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note-0 wid-indy-label--light wid-indy-label-comment">' +
      "#trads:labelCommentNeutral#" +
      "</label>" +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note--1 wid-indy-label--light wid-indy-label-comment">' +
      "#trads:labelCommentNegative#" +
      "</label>" +
      "<div>" +
      '<textarea name="" id="comment" rows="3" class="wid-indy-input wid-indy-comment"></textarea>' +
      "</div>" +
      "</div>" +
      '<div class="wid-indy-form-group">' +
      '<div class="">' +
      '<input type="checkbox" class="wid-indy-capture" name="capture" value="true" checked id="capture"><label for="capture"> #trads:labelCapture#</label><br>' +
      "</div>" +
      "</div>" +
      '<div class="wid-indy-form-group wid-indy-form-group_email">' +
      '<div class="">' +
      '<label for="email" class="wid-indy-label wid-indy-label--light wid-indy-label-email">#trads:labelEmail#</label>' +
      "<div>" +
      '<input type="email" id="email" class="wid-indy-input wid-indy-email" value="#userConfig.email#">' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="wid-indy-w-footer">' +
      '<span class="wid-indy-button wid-indy-button--primary wid-indy-button--small wid-indy-close-feedback">#trads:closeFeedback#</span>' +
      '<span class="wid-indy-button wid-indy-button--success wid-indy-button--small wid-indy-send-feedback">' +
      '<span class="wid-indy-button-label">#trads:labelBtnSend#</span>' +
      '<div class="sk-folding-cube wid-indy-button-spinner"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>' +
      "</span>" +
      "</div>" +
      "</div>" +
      '<div data-step-feedback="success" class="wid-indy-center wid-indy-feedback-success is-hide">' +
      '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      "<title>" +
      "Success" +
      "</title>" +
      '<path d="M32 0C14.327 0 0 14.327 0 32c0 17.674 14.327 32 32 32 17.674 0 32-14.326 32-32C64 14.327 49.674 0 32 0zm.427 60.587c-15.528 0-28.16-12.682-28.16-28.192S16.9 4.267 32.427 4.267c15.527 0 28.16 12.618 28.16 28.128s-12.633 28.192-28.16 28.192zm12.79-40.365L26.403 39.434l-8.473-8.598c-.784-.794-2.053-.794-2.836 0-.783.794-.783 2.082 0 2.876l9.92 10.066c.783.794 2.05.794 2.835 0 .09-.09.167-.19.237-.294L48.054 23.1c.78-.795.78-2.083 0-2.878-.784-.794-2.053-.794-2.836 0z" fill-rule="nonzero" fill="#10CFBD"/>' +
      "</svg>" +
      "<p>#trads:feedbackSuccess#</p>" +
      "</div>" +
      "</div>"
  };

  var gec = function(id, array) {
    id = id.replace(".", "");
    var e = document.getElementsByClassName(id);
    if (array) {
      return e;
    } else {
      return e[0] || {};
    }
  };
  var addEvent = function(element, evtType, callback, capture) {
    if (element.addEventListener instanceof Function) {
      element.addEventListener(evtType, callback, capture);
    } else {
      element.attachEvent("on" + evtType, callback);
    }
  };

  var addElem = function(elemType, attrs, elemText, parent) {
    parent = parent || document.body;
    var b = document.createElement(elemType);

    if (attrs) {
      for (var a in attrs) {
        b[a] = attrs[a];
      }
    }
    if (elemText) {
      b.innerHTML = elemText;
    }
    parent.appendChild(b);
    return b;
  };
  var isArray = function(what) {
    return typeof what === "object" && what.length !== undefined;
  };

  var removeAllClass = function(elements, className) {
    elements = isArray(elements) ? elements : [elements];
    for (var i = 0; i < elements.length; i++) {
      removeClass(elements[i], className);
    }
  };

  var removeClass = function(element, className) {
    if (element.className && element.className.indexOf(className) !== -1) {
      element.className = element.className.replace(className, "");
    }

    return element;
  };

  function addActionPopup() {
    addEvent(gec("wid-indy-button--feedback", false), "click", actionOpenPopup);
  }

  function actionOpenPopup() {
    gec("wid-indy-button--feedback", false).classList.add("is-hide");
    gec("wid-indy-w-container", false).classList.add(
      "wid-indy-w-container--open"
    );
    gec("wid-indy-w-container", false).classList.remove("is-hide");
    gec("wid-indy-feedback-success", false).classList.add("is-hide");

    //gec('wid-indy-input-email').focus();

    //TODO
    var notes = gec("rating__label", true);
    notes = Array.prototype.slice.call(notes);

    notes.map(function(n) {
      addEvent(n, "click", function(e) {
        //note = Number(n.className.match(/wid-indy-note-([\-\d]+)/)[1]);
        note = n.getAttribute("data-note");

        if (note < 0) {
          removeAllClass(gec("wid-indy-label-note", true), "is-shown");
          gec("wid-indy-label-note--1", false).classList.add("is-shown");
        } else if (note == 0) {
          removeAllClass(gec("wid-indy-label-note", true), "is-shown");
          gec("wid-indy-label-note-0", false).classList.add("is-shown");
        } else if (note > 0) {
          removeAllClass(gec("wid-indy-label-note", true), "is-shown");
          gec("wid-indy-label-note-1", false).classList.add("is-shown");
        }
      });
    });

    addEvent(gec("wid-indy-close-feedback", false), "click", actionClosePopup);
  }

  var clearForm = function() {
    gec("wid-indy-comment", false).value = "";
    note = false;
    gec("wid-indy-button-spinner").classList.add("is-hide");
    gec("wid-indy-button-label").classList.remove("is-hide");
    document.getElementById("rating3-none").checked = true;
    var commentLabel = gec('wid-indy-label-comment', true);
    for(var i = 0; i < commentLabel.length; i++) {
      commentLabel[i].classList.remove("wid-indy-label--error");
    };
  };

  function actionClosePopup() {
    gec("wid-indy-w-container", false).classList.add("is-hide");
    gec("wid-indy-w-container", false).classList.remove(
      "wid-indy-w-container--open"
    );
    gec("wid-indy-button--feedback", false).classList.remove("is-hide");
    clearForm();
  }

  function actionSendPopup() {
    data["noteGlobale"] = note;
    data["description"] = comment;
    data["email"] = email;
    data["userID"] = userConfig.userID;

    var canCapture = document.querySelector(".wid-indy-capture").checked;
    if (canCapture) {
      getScreenShot(function(screenshot) {
        data.capture = screenshot;
        sendToAPI(data, function(err) {
          if (!err) {
            //showNotification('successFeedback');
            actionClosePopup();
          } else {
            console.error(err);
          }
        });
      });
    } else {
      data.capture = "";
      sendToAPI(data, function(err) {
        if (!err) {
          //showNotification('successFeedback');
          actionClosePopup();
        } else {
          console.error(err);
        }
      });
    }
  }

  function getScreenShot(callback) {
    html2canvas(divToCapture).then(function(canvas) {
      base64 = canvas.toDataURL();
      callback(base64);
    });
  }

  function getBrowser() {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null)
        return tem
          .slice(1)
          .join(" ")
          .replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(" ");
  }

  function sendToAPI(data) {
    gec("wid-indy-button-spinner").classList.remove("is-hide");
    gec("wid-indy-button-label").classList.add("is-hide");
    

    data["timestamp"] = new Date().getTime();
    data["isArchive"] = false;

    data["url"] = window.location.href;

    data["browser"] = getBrowser();

    var dataToSend = {
      noteGlobale: data.noteGlobale,
      browser: data.browser,
      email: data.email,
      capture: data.capture,
      url: data.url,
      userID: data.userID,
      ftimestamp: data.timestamp,
      tags: userConfig.tags,
      description: data.description,
      source: "widget",
      customFields: userConfig.customFields
    };
    
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.open("POST", apiUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var success = '{"result":"success"}';

        if (xmlhttp.responseText === success) {
          sendSuccess();
        }
      }
    };
    xmlhttp.send(JSON.stringify(dataToSend));

    return true;
  }

  function sendSuccess() {
    gec("wid-indy-close-feedback", false).classList.remove("sending");
    gec("wid-indy-send-feedback", false).classList.remove("sending");
    clearForm();
    gec("step-feedback-1", false).classList.add("is-hide");

    setTimeout(function() {
      gec("step-feedback-1", false).style.display = "none";
    }, 100);

    setTimeout(function() {
      gec("wid-indy-feedback-success", false).classList.remove("is-hide");
    }, 100);

    setTimeout(function() {
      actionClosePopup();
      setTimeout(function() {
        gec("wid-indy-feedback-success", false).classList.add("is-hide");

        gec("step-feedback-1", false).style.display = "block";
        gec("step-feedback-1", false).classList.remove("is-hide");
      }, 500);
    }, 2000);

    gec("wid-indy-comment", false).classList.remove("wid-indy-input--error");
    gec("wid-indy-email", false).classList.remove("wid-indy-input--error");
    //gec("wid-indy-btn-group").classList.remove("wid-indy-btn-group--error");
  }

  var translateTemplate = function(source, lang) {
    var matches = source.match(/#trads:([^#]*)#/gi);
    var result = source;

    for (var m = 0; m < matches.length; m++) {
      var tradkey = matches[m].replace(/#/g, "").replace("trads:", ""),
        trad = trads[lang][tradkey] || trads["en"][tradkey];
      result = result.replace(new RegExp(matches[m], "ig"), trad);
    }
    return result;
  };
  var translateTemplates = function(lang) {
    var result = {},
      keys = Object.keys(templates);
    for (var i = 0; i < keys.length; i++) {
      var lbl = keys[i];
      result[lbl] = translateTemplate(templates[lbl], lang);
    }
    return result;
  };

  var _configure = function(config) {
    config = config || {};
    if (!config.language || !trads[config.language]) {
      config.language = "en";
    }
    userConfig = userConfig || {};
    var k = Object.keys(config);
    for (var i = 0; i < k.length; i++) {
      userConfig[k[i]] = config[k[i]];
    }
    translatedTemplates = translateTemplates(config.language);

    apiUrl = "https://widget.crowdmap.io/feedbacks/" + userConfig.team;
    translatedTemplates.popup = translatedTemplates.popup.replace(
      "#userConfig.email#",
      userConfig.email
    );
  };

  function validateEmail(email) {
    var re = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    return re.test(email.toLowerCase());
  }
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  function setLabelColor(hexTripletColor) {
    var color = hexTripletColor,
      colorArray = [],
      brightness;

    colorArray = hexToRgb(color);

    brightness = Math.round(
      (parseInt(colorArray.r) * 299 +
        parseInt(colorArray.g) * 587 +
        parseInt(colorArray.b) * 114) /
        1000
    );

    color = brightness > 125 ? "#011627" : "#ffffff";
    return color;
  }

  function _init(config) {
    _configure(config);

    if (typeof userConfig.email === "undefined") {
      userConfig.email = "";
    }

    divToAppend = userConfig.divToAppend
      ? gec(userConfig.divToAppend, false)
      : document.body;
    divToCapture = userConfig.divToCapture
      ? gec(userConfig.divToCapture, false)
      : document.body;

    if (containers.button) {
      containers.button.innerHTML = translatedTemplates.btnPopup;
    } else {
      containers.button = addElem(
        "span",
        {},
        translatedTemplates.btnPopup,
        divToAppend
      );
    }
    if (containers.popup) {
      containers.popup.innerHTML = translatedTemplates.popup;
    } else {
      containers.popup = addElem(
        "span",
        {},
        translatedTemplates.popup,
        divToAppend
      );
    }
    (element = document.getElementById("feedback-btn")),
      (window.btnFeedback = document.getElementById("feedback-btn")),
      (label = document.getElementById("feedback-btn-label")),
      (background = document.getElementById("feedback-btn-background")),
      (spacing = "8px"),
      (perspective = "100px"),
      (positionAside = userConfig.positionAside || false),
      (positionX = userConfig.positionX || "right"),
      (backgroundColor = userConfig.btnBackgroundColor || "#31E6CE"),
      (backgroundColor =
        backgroundColor.indexOf("#") >= 0 ? backgroundColor : "#31E6CE");

    element.style.setProperty("--width-btn-container", "88px");
    element.style.setProperty("--height-btn-container", "38px");
    element.style.setProperty("--padding-btn-label", "10px");
    element.style.setProperty("--perspective", perspective);
    element.style.setProperty("--rotateX", "24deg");
    element.style.setProperty("--rotateY", "0");
    element.style.setProperty("--right-position", spacing);
    element.style.setProperty("--bottom-position", "0px");

    background.style.setProperty("--background-color-btn", backgroundColor);

    label.style.setProperty("--rotate-label", "0px");
    label.style.setProperty("--label-top-position", "0px");
    label.style.setProperty("--label-color", setLabelColor(backgroundColor));

    if (positionAside) {
      element.style.setProperty("--height-btn-container", "105px");
      element.style.setProperty("--width-btn-container", "42px");
      element.style.setProperty("--perspective", perspective);
      element.style.setProperty("--rotateX", "0deg");
      background.style.setProperty("--background-color-btn", backgroundColor);

      if (positionX === "right") {
        element.style.setProperty("--right-position", "0px");
        element.style.setProperty("--left-position", "inherit");
        element.style.setProperty("--bottom-position", "24px");
        element.style.setProperty("--left-position", "inherit");
        element.style.setProperty("--rotateY", "-24deg");

        label.style.setProperty("--rotate-label", "-90deg");
        label.style.setProperty("--label-top-position", "42px");
      } else if (positionX === "left") {
        element.style.setProperty("--left-position", "0px");
        element.style.setProperty("--right-position", "inherit");
        element.style.setProperty("--bottom-position", spacing);
        element.style.setProperty("--rotateY", "24deg");

        label.style.setProperty("--rotate-label", "90deg");
        label.style.setProperty("--label-top-position", "14px");
      }
    } else {
      element.style.setProperty("--perspective", perspective);
      element.style.setProperty("--rotateX", "24deg");
      element.style.setProperty("--rotateY", "0deg");

      label.style.setProperty("--rotate-label", "0");
      label.style.setProperty("--label-top-position", "0");

      if (positionX === "right") {
        element.style.setProperty("--right-position", spacing);
        element.style.setProperty("--left-position", "inherit");
        element.style.setProperty("--bottom-position", "0px");
        element.style.setProperty("--left-position", "inherit");
        element.style.setProperty("--rotateX", "24deg");
        element.style.setProperty("--rotateY", "0deg");
      } else if (positionX === "left") {
        element.style.setProperty("--left-position", spacing);
        element.style.setProperty("--right-position", "inherit");
        element.style.setProperty("--bottom-position", "0px");
        element.style.setProperty("--left-position", "inherit");
      }
    }
    var theme = userConfig.theme || "dark";

    if (theme === "light") {
      gec("wid-indy-w-container", false).classList.add(
        "wid-indy-w-container--light"
      );
    }

    addEvent(gec("wid-indy-close-feedback", false), "click", function() {
      gec("wid-indy-close-feedback", false).classList.add("fadeOutDown");
      gec("wid-indy-close-feedback", false).classList.remove("fadeInUp");

      setTimeout(function() {
        gec("wid-indy-close-feedback", false).classList.remove("fadeOutDown");
        gec("wid-indy-close-feedback", false).classList.remove("is-shown");
        gec("wid-indy-close-feedback", false).classList.remove("fadeInUp");
      }, 7000);
    });

    addActionPopup();
    addEvent(gec("wid-indy-send-feedback", false), "click", function(event) {
      event.stopPropagation();
      event.preventDefault();

      comment = gec("wid-indy-comment", false).value;
      email = gec("wid-indy-email", false).value;

      if (email === "") {
        email = "anonymous customer";
      }

      var commentLabel = gec("wid-indy-label-comment", true);

      if(!note) {
        gec("wid-indy-label-stars", false).classList.add("wid-indy-label--error"); 
      } else {
        gec("wid-indy-label-stars", false).classList.remove("wid-indy-label--error"); 
      }
      
      if (comment === "") {
        gec("wid-indy-comment", false).classList.add("wid-indy-input--error");
        for(var i = 0; i < commentLabel.length; i++) {
          commentLabel[i].classList.add("wid-indy-label--error");
        };
      } else {
        gec("wid-indy-comment", false).classList.remove("wid-indy-input--error");
        for(var i = 0; i < commentLabel.length; i++) {
          commentLabel[i].classList.remove("wid-indy-label--error");
        };
      }

      if(note && comment != "") {
        if (email != "anonymous customer" && !validateEmail(email)) {
          gec("wid-indy-email", false).classList.add("wid-indy-input--error");
          gec("wid-indy-comment", false).classList.remove(
            "wid-indy-input--error"
          );

          for(var i = 0; i < commentLabel.length; i++) {
            commentLabel[i].classList.remove("wid-indy-label--error");
          };
        } else {
          gec("wid-indy-close-feedback", false).classList.add("sending");
          gec("wid-indy-send-feedback", false).classList.add("sending");
          actionSendPopup();
        }
      }
    });
    gec("wid-indy-button-spinner").classList.add("is-hide");
    window.btnFeedback.classList.add("wid-indy-is-hide");
    initReady = true;
  }

  function _showWidget() {
    if (!initReady && nbRetryInitShow <= MAX_RETRY) {
      setTimeout(_showWidget, WAIT_FOR_RETRY);
      nbRetryInitShow++;
      return;
    } else {
      window.btnFeedback.classList.remove("wid-indy-is-hide");
    }
  }

  function _hideWidget() {
    if (!initReady && nbRetryInitHide <= MAX_RETRY) {
      setTimeout(_hideWidget, WAIT_FOR_RETRY);
      nbRetryInitHide++;
      return;
    } else {
      window.btnFeedback.classList.add("wid-indy-is-hide");
    }
  }

  function _addTag(tag) {
    setTimeout(function() {
      if (!userConfig.tags) {
        userConfig.tags = [];
      }
      userConfig.tags.push(tag);
    }, WAIT_FOR_RETRY);
  }

  function _removeTag(tag) {
    setTimeout(function() {
      if (!userConfig.tags) {
        userConfig.tags = [];
      }
      var tags = userConfig.tags;
      var index = tags.indexOf(tag);
      if (index > -1) {
        tags.splice(index, 1);
      }
      userConfig.tags = tags;
    }, WAIT_FOR_RETRY);
  }

  function _setEmail(newEmail) {
    setTimeout(function() {
      document.getElementById("email").value = newEmail;
    }, WAIT_FOR_RETRY);
  }

  window["cmWidget"] = {
    conf: function() {
      return userConfig;
    },
    configure: _configure,
    init: function(conf) {
      if (document.readyState === "complete") {
        _init(conf);
      } else {
        document.addEventListener("readystatechange", function(event) {
          _init(conf);
        });
      }
    },
    showWidget: _showWidget,
    hideWidget: _hideWidget,
    addTag: function(tag) {
      _addTag(tag);
    },
    removeTag: function(tag) {
      _removeTag(tag);
    },
    setEmail: function(newEmail) {
      _setEmail(newEmail);
    }
  };
  window.jcssReg = function(path, content) {
    var s = document.createElement("style");
    s.innerText = content;
    document.getElementsByTagName("head")[0].appendChild(s);
    //        console.log(arguments)
  };
})();

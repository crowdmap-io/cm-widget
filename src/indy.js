(function() {
  var userConfig,
    apiUrl,
    application,
    containers = {},
    translatedTemplates;
  var trads = {
    en: {
      panelTitle: 'Product feedback',
      labelBtnPopup: 'Feedback',
      labelHeaderPopup: 'Send a feedback',
      labelDescPopup: 'How would you rate your experience on our tool ?',
      labelNotation: 'How was your experience today?',
      labelCommentNegative: 'What was the issue  ?',
      labelCommentNeutral: 'What can we do to make you happy ?',
      labelCommentPositif: 'What did you like ?',
      labelEmail: 'Your e-mail',
      labelBtnSend: 'Send my feedback',
      feedbackSuccess: 'Your feedback was successfully sent.',
      closeFeedback: 'Close',
      labelCapture: 'Send a screenshot',
      tradNegative: 'unsatisfying',
      tradNeutral: 'neutral',
      tradPositive: 'satisfying',
      emailAnonymous: 'Your email will only be used to contact you about your comment. Leave blank if you wish to remain anonymous.'
    },
    fr: {
      panelTitle: 'Feedback produit',
      labelBtnPopup: 'Feedback',
      labelHeaderPopup: 'Envoyer un feedback',
      labelDescPopup: 'Comment jugez-vous votre expérience avec notre outil ?',
      labelNotation: 'Comment jugeriez-vous votre expérience ?',
      labelCommentNegative: 'Quel a été le problème ?',
      labelCommentNeutral: 'Que pouvons-nous faire pour vous rendre plus heureux ?',
      labelCommentPositif: 'Qu\'avez-vous aimé ?',
      labelEmail: 'Votre e-mail',
      labelBtnSend: 'Envoyer mon feedback',
      feedbackSuccess: 'Votre feedback a bien été envoyé.',
      closeFeedback: 'Fermer',
      labelCapture: 'Envoyer une capture d\'écran',
      tradNegative: 'insatisfaisante',
      tradNeutral: 'neutre',
      tradPositive: 'satisfaisante',
      emailAnonymous: 'Votre email sera utilisée uniquement pour vous contacter à propos de votre commentaire. Laisser vide si vous souhaitez rester anonyme.'
    }
  };

  //'#trads:labelShortcut = 'you can press your <span class="u-font--bold">F</span> touch to open this#' panel.'

  var note = '',
    email = '',
    comment = '',
    data = [],
    base64 = '';

  var templates = {
    btnPopup: '<div data-html2canvas-ignore data-action="openFeedback" id="feedback-btn" class="wid-indy-button--feedback btn_container" data-y="bottom"><div id="feedback-btn-background" class="btn_background"></div><div class="btn_label" id="feedback-btn-label">#trads:labelBtnPopup#</div></div>',
    //btnPopup: '<span class="wid-indy-button--feedback wid-indy-button--feedback_container"><span class="wid-indy-button--feedback_content"></span></span>',
    popup: '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">'+
  '<symbol id="star" viewBox="214.7 0 182.6 792">'+
  '</symbol>' +
'</svg>'+
      '<div data-html2canvas-ignore data-popup="feedback" id="wid-indy-w-container" class="wid-indy-w-container">' +
      '<div data-step-feedback="1" class="step-feedback-1">' +
      '<div class="wid-indy-form-group">' +
      '<div class="wid-indy-label wid-indy-label--light">' +
      '#trads:labelNotation#' +
      '</div>' +
      '<div class="wid-indy-w-sentiment is-hide">' +
      '<div class="wid-indy-btn-group">' +
      '<a class="wid-indy-btn-group-item wid-indy-btn-group-item--inactive wid-indy-note wid-indy-note-1" data-input="note" data-note="1" title="#trads:trad5#">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g fill="none" fill-rule="evenodd"><circle class="emo-background" cx="12.375" cy="12.375" r="12.375"/><path fill="#5A5A5A" fill-rule="nonzero" d="M20.444 20.444a11.334 11.334 0 0 1-8.068 3.342 11.334 11.334 0 0 1-8.068-3.342 11.334 11.334 0 0 1-3.341-8.068c0-3.048 1.186-5.912 3.341-8.068A11.334 11.334 0 0 1 12.376.967c3.048 0 5.913 1.186 8.068 3.341a11.334 11.334 0 0 1 3.341 8.068c0 3.048-1.186 5.913-3.341 8.068m.683-16.819A12.294 12.294 0 0 0 12.377 0a12.294 12.294 0 0 0-8.752 3.625A12.294 12.294 0 0 0 0 12.376c0 3.306 1.287 6.414 3.625 8.751a12.294 12.294 0 0 0 8.751 3.625c3.306 0 6.414-1.286 8.751-3.625a12.294 12.294 0 0 0 3.625-8.75c0-3.306-1.286-6.414-3.625-8.752m-2.829 9.57H6.454a.484.484 0 0 0-.484.484 6.413 6.413 0 0 0 6.406 6.405 6.413 6.413 0 0 0 6.406-6.405.484.484 0 0 0-.484-.484m-9.866-1.764c.855 0 1.55-.696 1.55-1.55 0-.855-.695-1.55-1.55-1.55-.854 0-1.55.695-1.55 1.55 0 .854.696 1.55 1.55 1.55m7.926 0c.855 0 1.55-.696 1.55-1.55 0-.855-.695-1.55-1.55-1.55-.855 0-1.55.695-1.55 1.55 0 .854.695 1.55 1.55 1.55"/></g></svg>' +
      '<span class="wid-indy-btn-group-item-legend">#trads:tradPositive#</span>' +
      '</a>' +
      '<a class="wid-indy-btn-group-item wid-indy-btn-group-item--inactive wid-indy-note wid-indy-note-0" data-input="note" data-note="0" title="#trads:trad3#">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g fill="none" fill-rule="evenodd"><circle cx="12.375" cy="12.375" r="12.375" class="emo-background"/><path fill="#011627" fill-rule="nonzero" d="M20.648 20.648a11.447 11.447 0 0 1-8.148 3.375 11.447 11.447 0 0 1-8.149-3.375A11.447 11.447 0 0 1 .976 12.5c0-3.078 1.199-5.972 3.375-8.149A11.447 11.447 0 0 1 12.5.977c3.078 0 5.972 1.198 8.148 3.374a11.447 11.447 0 0 1 3.375 8.149c0 3.078-1.198 5.972-3.375 8.148m.69-16.987A12.417 12.417 0 0 0 12.5 0C9.161 0 6.022 1.3 3.661 3.661A12.417 12.417 0 0 0 0 12.5c0 3.339 1.3 6.477 3.661 8.839A12.417 12.417 0 0 0 12.5 25c3.339 0 6.477-1.3 8.839-3.661A12.417 12.417 0 0 0 25 12.5c0-3.339-1.3-6.478-3.661-8.839m-4.06 11.972H7.76a.488.488 0 0 0 0 .977h9.52a.488.488 0 1 0 0-.977m-6.59-5.964a.488.488 0 0 0-.977 0c0 .665-.541 1.206-1.205 1.206A1.207 1.207 0 0 1 7.3 9.67a.488.488 0 0 0-.977 0c0 1.204.979 2.183 2.183 2.183a2.184 2.184 0 0 0 2.182-2.183m7.499-.488a.488.488 0 0 0-.489.488c0 .665-.54 1.206-1.206 1.206a1.207 1.207 0 0 1-1.205-1.206.488.488 0 0 0-.976 0c0 1.204.978 2.183 2.181 2.183a2.184 2.184 0 0 0 2.183-2.183.488.488 0 0 0-.488-.488"/></g></svg>' +
      '<span class="wid-indy-btn-group-item-legend">#trads:tradNeutral#</span>' +
      '</a>' +
      '<a class="wid-indy-btn-group-item wid-indy-btn-group-item--inactive wid-indy-note wid-indy-note--1" data-input="note" data-note="-1" title="#trads:trad2#">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g fill="none" fill-rule="evenodd"><circle cx="12.375" cy="12.375" r="12.375" class="emo-background"/><path fill="#011627" fill-rule="nonzero" d="M12.5 0C5.603 0 0 5.603 0 12.5S5.603 25 12.5 25 25 19.397 25 12.5 19.397 0 12.5 0zm.05 1C18.936 1 24.1 6.164 24.1 12.55c0 6.386-5.164 11.55-11.55 11.55A11.541 11.541 0 0 1 1 12.55C1 6.164 6.164 1 12.55 1zM7.778 7.222a1.667 1.667 0 1 0 0 3.334 1.667 1.667 0 0 0 0-3.334zm9.444 0a1.667 1.667 0 1 0 .001 3.334 1.667 1.667 0 0 0 0-3.334zM12.5 14.167c-2.724 0-5.13 1.419-6.571 3.576a.555.555 0 1 0 .92.616c1.251-1.87 3.314-3.081 5.651-3.081 2.337 0 4.4 1.21 5.651 3.081a.558.558 0 0 0 .794.191.555.555 0 0 0 .126-.807c-1.442-2.157-3.847-3.576-6.57-3.576H12.5z"/></g></svg>' +
      '<span class="wid-indy-btn-group-item-legend">#trads:tradNegative#</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div id="full-stars-example-two">'+
          '<div class="rating-group">'+
              '<input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">'+
              '<label aria-label="1 star" class="rating__label" data-note="-2" for="rating3--2">'+
              '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star"  width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                '<defs>'+
                  '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>'+
                '</defs>'+
                '<use xlink:href="#a" fill-rule="evenodd"/>'+
              '</svg>'+
              '</label>'+
              '<input class="rating__input  rating__input--none" name="rating3" id="rating3--2" value="-2" type="radio">'+
              '<label aria-label="2 stars" data-note="-1" class="rating__label" for="rating3--1">'+
              '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                '<defs>'+
                  '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>'+
                '</defs>'+
                '<use xlink:href="#a" fill-rule="evenodd"/>'+
              '</svg>'+
              '</label>'+
              '<input class="rating__input  rating__input--none" name="rating3" id="rating3--1" value="-1" type="radio">'+
              '<label aria-label="3 stars" data-note="0" class="rating__label" for="rating3-0">'+
              '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                '<defs>'+
                  '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>'+
                '</defs>'+
                '<use xlink:href="#a" fill-rule="evenodd"/>'+
              '</svg>'+
              '</label>'+
              '<input class="rating__input  rating__input--none" name="rating3" id="rating3-0" value="0" type="radio">'+
              '<label aria-label="4 stars" data-note="1" class="rating__label" for="rating3-1">'+
              '<svg viewBox="0 0 16 16" class="rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                '<defs>'+
                  '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>'+
                '</defs>'+
                '<use xlink:href="#a" fill-rule="evenodd"/>'+
              '</svg>'+
              '</label>'+
              '<input class="rating__input  rating__input--none" name="rating3" id="rating3-1" value="1" type="radio">'+
              '<label aria-label="5 stars" data-note="2" class="rating__label" for="rating3-2">'+
              '<svg viewBox="0 0 16 16" class=" rating__icon rating__icon--star" width="16" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
                '<defs>'+
                  '<path d="M8 0c.448 0 .856.244 1.045.626l1.811 3.633 4.163.598c.428.062.783.344.921.73a1.04 1.04 0 0 1-.268 1.105L12.62 9.64l.708 4.086c.072.412-.113.824-.474 1.065a1.217 1.217 0 0 1-1.225.063L8 12.963l-3.63 1.89a1.214 1.214 0 0 1-1.223-.063 1.063 1.063 0 0 1-.474-1.065l.707-4.086L.33 6.692a1.04 1.04 0 0 1-.27-1.104c.139-.386.494-.669.922-.73l4.164-.6L6.955.627C7.144.244 7.551 0 8 0z" id="a"/>'+
                '</defs>'+
                '<use xlink:href="#a" fill-rule="evenodd"/>'+
              '</svg>'+
              '</label>'+
              '<input class="rating__input rating__input--none" name="rating3" id="rating3-2" value="2" type="radio">'+
              '</div>'+
            '</div>'+
      '</div>' +


      '<div class="wid-indy-form-group">' +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note-1 wid-indy-label--light is-shown">' +
      '#trads:labelCommentPositif#' +
      '</label>' +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note-0 wid-indy-label--light">' +
      '#trads:labelCommentNeutral#' +
      '</label>' +
      '<label for="comment" class="wid-indy-label wid-indy-label-note wid-indy-label-note--1 wid-indy-label--light">' +
      '#trads:labelCommentNegative#' +
      '</label>' +
      '<div>' +
      '<textarea name="" id="comment" rows="3" class="wid-indy-input wid-indy-comment"></textarea>' +
      '</div>' +
      '</div>' +
      '<div class="wid-indy-form-group">' +
      '<div class="">' +
      '<input type="checkbox" class="wid-indy-capture" name="capture" value="true" checked id="capture"><label for="capture"> #trads:labelCapture#</label><br>' +
      '</div>' +
      '</div>' +
      '<div class="wid-indy-form-group wid-indy-form-group_email">' +
      '<div class="">' +
      '<label for="email" class="wid-indy-label wid-indy-label--light">#trads:labelEmail#</label>' +
      '<div>' +
      '<input type="email" id="email" class="wid-indy-input wid-indy-email" value="#userConfig.email#">' +
      '<span class="indy-detail">#trads:emailAnonymous#</span>'+
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="wid-indy-w-footer">' +
      '<span class="wid-indy-button wid-indy-button--primary wid-indy-button--small wid-indy-close-feedback">#trads:closeFeedback#</span>' +
      '<span class="wid-indy-button wid-indy-button--success wid-indy-button--small wid-indy-send-feedback">#trads:labelBtnSend#</span>' +
      '</div>' +
      '<div class="wid-indy-w-powered">' +
      '<a href="https://crowdmap.io" class="wid-indy-w-powered-link" title="Powered by Crowdmap" target="_blank">' +

      '<svg style="width: 16px; height: 16px; margin-right: 4px;" id="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">' +
      '<defs><style>.cls-4{fill:#011627}.cls-3{fill:#26938c}</style></defs>' +
      '<title>Powered by Crowdmap</title>' +
      '<circle cx="80" cy="80" r="80" fill="#31e6ce"/>' +
      '<path d="M86.46 93.63c-4.86 1.94-4.86 7.77-18.46 8.74a21.37 21.37 0 0 1 0-42.74c13.6 1 13.6 6.8 18.46 8.74 3.65 1.46 9.65 1.88 13.6 1.94a34 34 0 1 0 0 21.37c-3.96.09-9.95.49-13.6 1.95z" fill-rule="evenodd" fill="#011627"/>' +
      '<path class="cls-3" d="M122.4 91.69h-7.77l-14.57-21.38h7.77l14.57 21.38zM136.97 91.69h-7.77l-14.57-21.38h7.77l14.57 21.38z"/>' +
      '<path class="cls-4" d="M100.06 70.31h7.77v21.37h-7.77zM114.63 70.31h7.77v21.37h-7.77z"/>' +
      '</svg>' +
      'Powered by Crowdmap.io' +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div data-step-feedback="success" class="wid-indy-center wid-indy-feedback-success is-hide">' +
      '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      '<title>' + 'Success' + '</title>' +
      '<path d="M32 0C14.327 0 0 14.327 0 32c0 17.674 14.327 32 32 32 17.674 0 32-14.326 32-32C64 14.327 49.674 0 32 0zm.427 60.587c-15.528 0-28.16-12.682-28.16-28.192S16.9 4.267 32.427 4.267c15.527 0 28.16 12.618 28.16 28.128s-12.633 28.192-28.16 28.192zm12.79-40.365L26.403 39.434l-8.473-8.598c-.784-.794-2.053-.794-2.836 0-.783.794-.783 2.082 0 2.876l9.92 10.066c.783.794 2.05.794 2.835 0 .09-.09.167-.19.237-.294L48.054 23.1c.78-.795.78-2.083 0-2.878-.784-.794-2.053-.794-2.836 0z" fill-rule="nonzero" fill="#10CFBD"/>' +
      '</svg>' +
      '<p>#trads:feedbackSuccess#</p>' +
      '</div>' +
      '</div>'

  };

  var gec = function(id, array) {
    id = id.replace('\.', '');
    var e = document.getElementsByClassName(id);
    if (array) {
      return e
    } else {
      return e[0] || {};
    }
  };
  var addEvent = function(element, evtType, callback, capture) {
    if (element.addEventListener instanceof Function) {
      element.addEventListener(evtType, callback, capture);
    } else {
      element.attachEvent('on' + evtType, callback);
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
    return (typeof(what) === 'object' && what.length !== undefined)
  };

  var addClass = function(elements, className) {
    elements = isArray(elements) ?
      elements :
      [elements];
    for (var i = 0; i < elements.length; i++) {
      addElementClass(elements[i], className);
    }
  };

  var removeAllClass = function(elements, className) {

    elements = isArray(elements) ?
      elements :
      [elements];
    for (var i = 0; i < elements.length; i++) {
      removeClass(elements[i], className);
    }
  };

  var addElementClass = function(element, className) {
    if (element.className && element.className.indexOf(className) == -1) {
      element.className += ' ' + className;
    }

    return element;
  };
  var removeClass = function(element, className) {

    if (element.className && element.className.indexOf(className) !== -1) {
      element.className = element.className.replace(className, '');
    }

    return element;
  };

  function addActionPopup() {
    addEvent(gec('wid-indy-button--feedback'), 'click', actionOpenPopup)
  }

  function actionOpenPopup() {
    addClass(gec('wid-indy-button--feedback'), 'is-hide');
    addClass(gec('wid-indy-w-container'), 'wid-indy-w-container--open');
    removeClass(gec('wid-indy-w-container'), 'is-hide');
    addClass(gec('wid-indy-feedback-success'), 'is-hide');

    //gec('wid-indy-input-email').focus();

    //TODO
    var notes = gec('rating__label', true);
    notes = Array.prototype.slice.call(notes);

    notes.map(function(n) {

      addEvent(n, 'click', function(e) {
        //note = Number(n.className.match(/wid-indy-note-([\-\d]+)/)[1]);
        note = n.getAttribute('data-note');

        if(note < 0) {
          removeAllClass(gec('wid-indy-label-note', true), 'is-shown');
          addClass(gec('wid-indy-label-note--1'), 'is-shown');
        } else if(note == 0) {
          removeAllClass(gec('wid-indy-label-note', true), 'is-shown');
          addClass(gec('wid-indy-label-note-0'), 'is-shown');
        } else if(note > 0) {
          removeAllClass(gec('wid-indy-label-note', true), 'is-shown');
          addClass(gec('wid-indy-label-note-1'), 'is-shown');
        }
        //removeAllClass(gec('wid-indy-label-note', true), 'is-shown');
        /*addClass(gec('wid-indy-label-note-' + note), 'is-shown');
        addClass(gec('wid-indy-note', true), 'wid-indy-btn-group-item--inactive');
        removeClass(n, 'wid-indy-btn-group-item--inactive');*/
      })
    });

    addEvent(gec('wid-indy-close-feedback'), 'click', actionClosePopup)

  }

  var clearForm = function() {
    gec('wid-indy-comment').value = '';
    addClass(gec('wid-indy-note-' + note), 'wid-indy-btn-group-item--inactive');
    note = undefined;
    document.getElementById("rating3-none").checked = true;
  };

  function actionClosePopup() {
    addClass(gec('wid-indy-w-container'), 'is-hide');
    removeClass(gec('wid-indy-w-container'), 'wid-indy-w-container--open');
    removeClass(gec('wid-indy-button--feedback'), 'is-hide');
    clearForm();
  }

  function actionSendPopup() {

    data['noteGlobale'] = note;
    data['description'] = comment;
    data['email'] = email;
    data['userID'] = userConfig.userID;

    var canCapture = document.querySelector('.wid-indy-capture').checked;
    if (canCapture) {
      getScreenShot(function(screenshot) {
        data.capture = screenshot;
        sendToAPI(data, function(err) {
          if (!err) {
            //showNotification('successFeedback');
            actionClosePopup();
          } else {
            console.error(err)
          }

        });
      });
    } else {
      data.capture = '';
      sendToAPI(data, function(err) {
        if (!err) {
          //showNotification('successFeedback');
          actionClosePopup();
        } else {
          console.error(err)
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
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (
        tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null)
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ?
      [
        M[1], M[2]
      ] :
      [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null)
      M.splice(1, 1, tem[1]);
    return M.join(' ');
  }

  function sendToAPI(data) {

    data['timestamp'] = new Date().getTime();
    data['isArchive'] = false;

    data['url'] = window.location.href;

    data['browser'] = getBrowser();

    var mydata = {
      noteGlobale: data.noteGlobale,
      browser: data.browser,
      email: data.email,
      capture: data.capture,
      url: data.url,
      userID: data.userID,
      ftimestamp: data.timestamp,
      tags: userConfig.tags,
      description: data.description,
      source: 'widget',
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
    xmlhttp.send(JSON.stringify(mydata));

    return true;
  }

  function sendSuccess() {
    gec('wid-indy-close-feedback').classList.remove("sending");
    gec('wid-indy-send-feedback').classList.remove("sending");
    clearForm();
    addClass(gec('step-feedback-1'), 'is-hide');

    setTimeout(function() {
      gec('step-feedback-1').style.display = 'none';
    }, 100);

    setTimeout(function() {
      removeClass(gec('wid-indy-feedback-success'), 'is-hide');
    }, 100);

    setTimeout(function() {
      actionClosePopup();
      setTimeout(function() {
        addClass(gec('wid-indy-feedback-success'), 'is-hide');

        gec('step-feedback-1').style.display = 'block';
        removeClass(gec('step-feedback-1'), 'is-hide');

      }, 500);
    }, 2000);

    removeClass(gec('wid-indy-comment'), 'wid-indy-input--error');
    removeClass(gec('wid-indy-email'), 'wid-indy-input--error');
    removeClass(gec('wid-indy-btn-group'), 'wid-indy-btn-group--error');
  }

  var translateTemplate = function(source, lang) {
    var matches = source.match(/#trads:([^#]*)#/gi);
    var result = source;

    for (var m = 0; m < matches.length; m++) {
      var tradkey = matches[m].replace(/#/g, '').replace('trads:', ''),
        trad = trads[lang][tradkey] || trads['en'][tradkey];
      result = result.replace(new RegExp(matches[m], 'ig'), trad);
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
      config.language = 'en'
    }
    userConfig = userConfig || {};
    var k = Object.keys(config);
    for (var i = 0; i < k.length; i++) {
      userConfig[k[i]] = config[k[i]];
    }
    translatedTemplates = translateTemplates(config.language);

    apiUrl = 'https://widget.crowdmap.io/feedbacks/' + userConfig.team;
    translatedTemplates.popup = translatedTemplates.popup.replace('#userConfig.email#', userConfig.email);

  };

  function validateEmail(email) {
    var re = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    return re.test(email.toLowerCase());
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }


  function setLabelColor(hexTripletColor) {
    var color = hexTripletColor,
    colorArray = [],
    brightness;

    colorArray = hexToRgb(color);

    brightness = Math.round(((parseInt(colorArray.r) * 299) +
                      (parseInt(colorArray.g) * 587) +
                      (parseInt(colorArray.b) * 114)) / 1000);

    color = (brightness > 125) ? '#011627' : '#ffffff';
    return color;
  }

  function _init(config) {
    /*
       shortcuts : 'F' mess with inputs
       $(document).keyup(function (e) {
       if (e.keyCode == 27) {
       actionClosePopup();
       }
       });
       */
    _configure(config);


    if (typeof userConfig.email === 'undefined') {
      userConfig.email = '';
    }

    divToAppend = userConfig.divToAppend ?
      gec(userConfig.divToAppend) :
      document.body;
    divToCapture = userConfig.divToCapture ?
      gec(userConfig.divToCapture) :
      document.body;

    if (containers.button) {
      containers.button.innerHTML = translatedTemplates.btnPopup;
    } else {
      containers.button = addElem('span', {}, translatedTemplates.btnPopup, divToAppend);
    }
    if (containers.popup) {
      containers.popup.innerHTML = translatedTemplates.popup
    } else {
      containers.popup = addElem('span', {}, translatedTemplates.popup, divToAppend);
    }
    var element = document.getElementById("feedback-btn"),
      label = document.getElementById("feedback-btn-label"),
      background = document.getElementById("feedback-btn-background")
      spacing = "8px",
      perspective = "100px",
      positionAside = userConfig.positionAside || false,
      positionX = userConfig.positionX || 'right',
      backgroundColor = userConfig.btnBackgroundColor || '#31E6CE',
      backgroundColor = backgroundColor.indexOf("#") >=0 ? backgroundColor : '#31E6CE';

    element.style.setProperty("--width-btn-container", "88px");
    element.style.setProperty("--height-btn-container", "38px");
    element.style.setProperty("--padding-btn-label", "10px");
    element.style.setProperty("--perspective", perspective);
    element.style.setProperty("--rotateX", "24deg");
    element.style.setProperty("--rotateY", "0");
    element.style.setProperty("--right-position", spacing)
    element.style.setProperty("--bottom-position", "0px")

    background.style.setProperty('--background-color-btn', backgroundColor)

    label.style.setProperty("--rotate-label", "0px")
    label.style.setProperty("--label-top-position", "0px")
    label.style.setProperty("--label-color", setLabelColor(backgroundColor));

    if (positionAside) {
      element.style.setProperty("--height-btn-container", "105px");
      element.style.setProperty("--width-btn-container", "42px");
      element.style.setProperty("--perspective", perspective)
      element.style.setProperty("--rotateX", "0deg")
      background.style.setProperty('--background-color-btn', backgroundColor)

      if (positionX === 'right') {
        element.style.setProperty("--right-position", "0px")
        element.style.setProperty("--left-position", "inherit")
        element.style.setProperty("--bottom-position", '24px')
        element.style.setProperty("--left-position", "inherit")
        element.style.setProperty("--rotateY", "-24deg")

        label.style.setProperty("--rotate-label", "-90deg")
        label.style.setProperty("--label-top-position", "42px")
      } else if (positionX === 'left') {
        element.style.setProperty("--left-position", "0px")
        element.style.setProperty("--right-position", "inherit")
        element.style.setProperty("--bottom-position", spacing)
        element.style.setProperty("--rotateY", "24deg")

        label.style.setProperty("--rotate-label", "90deg")
        label.style.setProperty("--label-top-position", "14px")
      }
    } else {

      element.style.setProperty("--perspective", perspective);
      element.style.setProperty("--rotateX", "24deg")
      element.style.setProperty("--rotateY", "0deg");

      label.style.setProperty("--rotate-label", "0")
      label.style.setProperty("--label-top-position", "0")

      if (positionX === 'right') {
        element.style.setProperty("--right-position", spacing)
        element.style.setProperty("--left-position", "inherit")
        element.style.setProperty("--bottom-position", "0px")
        element.style.setProperty("--left-position", "inherit")
        element.style.setProperty("--rotateX", "24deg")
        element.style.setProperty("--rotateY", "0deg")
      } else if (positionX === 'left') {
        element.style.setProperty("--left-position", spacing);
        element.style.setProperty("--right-position", "inherit");
        element.style.setProperty("--bottom-position", "0px");
        element.style.setProperty("--left-position", "inherit");
      }
    }
    var theme = userConfig.theme || 'dark';

    if (theme === 'light') {
      addClass(gec('wid-indy-w-container'), 'wid-indy-w-container--light');
    }

    addEvent(gec('wid-indy-close-feedback'), 'click', function() {
      addClass(gec('wid-indy-close-feedback'), 'fadeOutDown');
      removeClass(gec('wid-indy-close-feedback'), 'fadeInUp');

      setTimeout(function() {
        removeClass(gec('wid-indy-close-feedback'), 'fadeOutDown');
        removeClass(gec('wid-indy-close-feedback'), 'is-shown');
        removeClass(gec('wid-indy-close-feedback'), 'fadeInUp');

      }, 7000);
    });
    addActionPopup();
    addEvent(gec('wid-indy-send-feedback'), 'click', function(event) {

      event.stopPropagation();
      event.preventDefault();

      comment = gec('wid-indy-comment').value;
      email = gec('wid-indy-email').value;

      if(email === '') {
        email = 'anonymous customer';
      }
      console.log(comment, email, note);
      if (note === '' && comment === '') {
        addClass(gec('wid-indy-comment'), 'wid-indy-input--error');
        addClass(gec('wid-indy-btn-group'), 'wid-indy-btn-group--error');
      } else if (note === '') {
        addClass(gec('wid-indy-btn-group'), 'wid-indy-btn-group--error');
      } else if (comment === '') {
        addClass(gec('wid-indy-comment'), 'wid-indy-input--error');
      } else {
        if (email != 'anonymous customer' && !validateEmail(email)) {
          addClass(gec('wid-indy-email'), 'wid-indy-input--error');
          removeClass(gec('wid-indy-comment'), 'wid-indy-input--error');
          removeClass(gec('wid-indy-btn-group'), 'wid-indy-btn-group--error');
        } else {
          gec('wid-indy-close-feedback').classList.add("sending");
          gec('wid-indy-send-feedback').classList.add("sending");
          actionSendPopup();
        }
      }
    });
  }
  window['cmWidget'] = {
    'conf': function() {
      return userConfig
    },
    'configure': _configure,
    'init': function(conf) {
      if (document.readyState === "complete") {
        _init(conf);
      } else {
        document.addEventListener("readystatechange", function(event) {
          _init(conf);
        });
      }
    }
  };
  window.jcssReg = function(path, content) {
    var s = document.createElement('style');
    s.innerText = content;
    document.getElementsByTagName('head')[0].appendChild(s);
    //        console.log(arguments)
  }
}());

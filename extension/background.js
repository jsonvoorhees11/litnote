// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.contextMenus.create({
    id: "add-note-command",
    title: "Add new note",
    contexts: ["all"]
  });
  /* The function that finds and returns the selected text */
  var funcToInject = function () {
    var selection = window.getSelection();
    const value = (selection.rangeCount > 0) ? selection.toString() : '';
    return value;
  };

  function getJsCodeStr(func) {
    return ';(' + func + ')();';
  }

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "add-note-command") {
      const jsCodeStr = getJsCodeStr(funcToInject);
      chrome.tabs.executeScript({
        code: jsCodeStr,
        allFrames: true
      }, function (text) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { content: text });
        });
      });
    }
  });

  chrome.runtime.onMessage.addListener(function (request,sender, sendResponse) {
    if(request.populated) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if(!tabs?.length) {
          return;
        }
        chrome.tabs.sendMessage(tabs[0].id, { contentPopulated: true });
      });
    }
    else{
      if(request.closeFrame) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if(!tabs?.length) {
            return;
          }
          chrome.tabs.sendMessage(tabs[0].id, { hideFrame: true });
        });
      }
    }
  })
});

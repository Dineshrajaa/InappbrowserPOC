/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    openThemedBrowser: function() {
        // To Open Browser window
        var browserOptions = {
             title: {
                 color: '#003264ff',
                 staticText:'Price'
             },
            closeButton: {
                wwwImage: 'img/close.png',
                imagePressed: 'close_pressed',
                align: 'left',
                event: 'closePressed'
            },
            menu: {
                wwwImage: 'img/menu.png',
                //imagePressed: 'menu_pressed',
                title: 'Price Options',
                cancel: 'Cancel',
                align: 'right',
                items: [{
                    event: 'takeMeHome',
                    label: 'Back to home'
                }]
            },
            backButtonCanClose: true

        };
        var CustomHeader = {
            css: '#customheader { width:100%;height:50px;background-color:black;color:white; }',
            html: function() {
                var code = 'var div = document.createElement("div");';
                code += 'div.id = "customheader";';
                code += 'if (document.body.firstChild) {';
                code += 'document.body.insertBefore(div, document.body.firstChild);';
                code += '}';
                code += 'else {';
                code += 'document.body.appendChild(div);';
                code += '}';
                code+='div.innerHTML = "Price";'
                return code;
            }
        };
        var ref = cordova.ThemeableBrowser.open('http://www.amazon.in/Apple-Macbook-MD101HN-Mavericks-Graphics/dp/B00DKMCB20', '_blank', browserOptions);
        ref.addEventListener('loadstart', function(event) {
            alert("loadstart" + event.url);
        });
        ref.addEventListener('loadstop', function(event) {
            code = CustomHeader.html();
            // Inject your JS code!
            ref.executeScript({
                code: code
            }, function() {
                console.log("injected (callback).");
            });
            // Inject CSS!
            ref.insertCSS({
                code: CustomHeader.css
            }, function() {
                console.log("CSS inserted!");
            });
            alert("loadstop:" + event.url);
        });
        ref.addEventListener('exit', function(event) {
            alert("exit:" + event.url);
        });
        ref.addEventListener('takeMeHome', function(event) {
            ref.close();
        })

    }
};

app.initialize();

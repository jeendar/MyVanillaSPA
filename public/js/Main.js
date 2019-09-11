var menu;

function Main() {
    menu = new Menu('HomePage');

    //NAVBAR
    //Get the container element
    var btnContainer = document.getElementById("nav");
    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("nav-item");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }

    // Search Box
    var acData = [{
        "group": "Web / Application Server",
        "tags": ["Apache Tomcat", "Jetty", "Undertow"]
    }, {
        "group": "software Testing",
        "tags": ["Selenium", "JUnit"]
    }, {
        "group": "Programming Languages",
        "tags": ["Javascript"]
    }, {
        "group": "Build tools",
        "tags": ["Apache Maven", "Ant", "Gradle"]
    }];

    var opts = {
        data: acData,
        numResults: 10,
        searchPath: '/search?q=',
        directPath: '#',
        container: document.querySelectorAll('.search-container')[0]
    };

    var autocomplete = function(options) {
        var doc = document,
            data = options.data,
            contEl = options.container,
            resultNodes = contEl.getElementsByTagName('A'),
            cache = {},
            handlers = {
                'enter': function(e) {
                    if (e.target.parentNode === contEl && contEl.children[0].value) {
                        window.location = options.searchPath + encodeURIComponent(contEl.children[0].value);
                    }
                },
                'up': function(e) {
                    e.preventDefault();
                    if (e.target.previousElementSibling && e.target.previousElementSibling.hasAttribute('href')) {
                        e.target.previousElementSibling.focus();
                    } else if (!e.target.previousElementSibling && e.target.parentNode === contEl.lastElementChild) {
                        contEl.children[0].focus();
                    }
                },
                'down': function(e) {
                    e.preventDefault();
                    if (e.target === contEl.children[0]) {
                        contEl.lastElementChild.children[0].focus();
                    } else if (e.target.nextElementSibling && e.target.nextElementSibling.hasAttribute('href')) {
                        e.target.nextElementSibling.focus();
                    }
                },
                'input': function(e) {
                    var val = e.target.value.trim().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                    return val ? insert(cacheFn(val, check)) : insert();
                }
            };

        function setEls() {
            var wrapEl = contEl.querySelectorAll('.results-wrapper')[0];
            var i = options.numResults;
            while (i--) {
                var anchorEl = document.createElement('a');
                anchorEl.href = '#';
                anchorEl.innerHTML = 'a<i>i</i>';
                wrapEl.appendChild(anchorEl);
            }
        }

        function cacheFn(q, fn) {
            return cache[q] ? cache[q] : cache[q] = fn(q), cache[q];
        }

        function check(q) {
            var rxFn = function(s) {
                    return '\\b(' + s + ')(.*)';
                },
                rx = new RegExp(q.replace(/(\S+)/g, rxFn).replace(/\s+/g, ''), 'gi'),
                arr = [],
                i = data.length;

            function testFn(obj) {
                var j = obj.tags.length;
                while (j--) {
                    if (rx.test(obj.tags[j])) {
                        arr.push({
                            'tag': obj.tags[j],
                            'group': obj.group
                        });
                    }
                }
            }
            while (i--) {
                testFn(data[i]);
            }
            return arr;
        }

        function insert(d) {
            var i = options.numResults;
            while (i--) {
                if (d && d[i]) {
                    resultNodes[i].style.display = 'block';
                    resultNodes[i].firstChild.nodeValue = d[i].tag;
                    resultNodes[i].href = options.directPath + encodeURIComponent(d[i].tag);
                    resultNodes[i].firstElementChild.firstChild.nodeValue = d[i].group;
                } else if (!d || !d[i]) {
                    resultNodes[i].style.display = 'none';
                }
            }
        }

        function multiHandler(e) {
            var k = e.keyCode,
                //assign a value to k if the up, down enter keys are pressed, or if the event is an input
                meth = k === 13 ? 'enter' : k === 38 ? 'up' : k === 40 ? 'down' : e.type === 'input' ? 'input' : null;
            //if 'meth' was assigned a value earlier, return the associated function and pass the event to it
            return meth ? handlers[meth](e) : null;

        }

        function changeHandler(e) {
            window.setTimeout(function() {
                return doc.activeElement.parentNode === contEl || doc.activeElement.parentNode === contEl.lastElementChild ? null : insert();
            }, 50);
        }
        setEls();
        contEl.addEventListener('input', multiHandler);
        contEl.addEventListener('keydown', multiHandler);
        contEl.firstElementChild.addEventListener('change', changeHandler);
    };

    autocomplete(opts);

    // Courses Page : listing content dynamically with JSON and ES6 Template Literals 

    const coursesData = [{
            name: "Javascript (ES6)",
            category: "Programming Language",
            photo: "https://i.imgur.com/CquSSS8.png",
            desc: "JavaScript is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed language used for both client-side and server-side scripting. Its primary use is in rendering and performing manipulation of web pages.",
            id: "Javascript"
        },
        {
            name: "Apache Tomcat",
            category: "Web / Application Servers",
            photo: "https://i.imgur.com/0lZbRfD.png",
            id: "Tomcat"
        },
        {
            name: "Apache Maven",
            category: "Build tools",
            photo: "https://i.imgur.com/1liZEdw.png",
            id: "Maven"
        },
        {
            name: "Software Testing",
            category: "DevOps",
            photo: "https://i.imgur.com/YSuVYXz.png",
            id: "Testing"
        },
        {
            name: "Apache Ant",
            category: "Build tools",
            photo: "https://i.imgur.com/nmEAOPu.png",
            id: "Ant"
        },
        {
            name: "Apache Gradle",
            category: "Build tools",
            photo: "https://i.imgur.com/uepgbXI.png",
            id: "Gradle"
        },
        {
            name: "Web Services",
            category: "Methodologies",
            photo: "https://i.imgur.com/M36ZJqh.png",
            id: "WebServices"
        },
        {
            name: "Design Patterns",
            category: "Methodologies",
            photo: "https://i.imgur.com/Decr6lz.png",
            id: "DesignPatterns"
        },
        {
            name: "Jetty",
            category: "Web / Application Servers",
            photo: "https://i.imgur.com/xjJd9Ya.png",
            id: "Jetty"
        },
        {
            name: "Logging Solutions",
            category: "DevOps",
            photo: "https://i.imgur.com/gFh5XDt.png",
            id: "Logging"
        }
    ];

    function coursesTemplate(course) {
        return `
			<div id="MyCourse" class="grid-item" onclick="menu.show('${course.id}')">
				<img  src="${course.photo}" />
				<h3>${course.name} </h3>
				<h4>Category : ${course.category} </h4>
			</div>
	  `
    }
    document.getElementById("CoursesTemplate").innerHTML = `
	  ${coursesData.map(coursesTemplate).join('')}
	  `

}
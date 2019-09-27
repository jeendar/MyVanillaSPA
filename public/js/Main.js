//END
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
            id: "Javascript",
            name: "Javascript (ES6)",
            category: "Programming Language",
            photo: "https://i.imgur.com/CquSSS8.png",
            desc: "JavaScript (JS) est un langage de programmation léger, interprété ou compilé just-in-time avec des fonctions de première classe. Bien qu'il soit plus connu comme langage de script pour les pages Web, de nombreux environnements autres que les navigateurs l'utilisent également, tels que Node.js, Apache CouchDB et Adobe Acrobat. JavaScript est un langage dynamique basé sur le prototype, comportant plusieurs paradigmes et supporte les styles orienté-objet, impératif et déclaratif (par exemple, programmation fonctionnelle).",
            report : "https://docs.google.com/document/d/e/2PACX-1vQDmHqvA0qXhq9dK_JenSByi5czp6efeIx9Lueu2a7E2wHSgso1HiSWrKZa_FvK1ikzW7bontrXDVyD/pub?embedded=true" 
        },
        {
            id: "Tomcat",
            name: "Apache Tomcat",
            category: "Web / Application Servers",
            photo: "https://i.imgur.com/0lZbRfD.png",
            desc:" Apache Tomcat est un conteneur web libre de servlets et JSP. Issu du projet Jakarta, c'est un des nombreux projets de l’Apache Software Foundation. Il implémente les spécifications des servlets et des JSP du Java Community Process6, est paramétrable par des fichiers XML et des propriétés, et inclut des outils pour la configuration et la gestion. Il comporte également un serveur HTTP. ",
            report :"https://docs.google.com/document/d/e/2PACX-1vR_v0MtK0UOzUCuD3Zul2Z1GY56VHFwBAFzBoH-Jk043gYA1a9YtcN9QfasIVQXcw7rfUD-mrGqXeig/pub?embedded=true" ,
        },
        {
            id: "Maven",
            name: "Apache Maven",
            category: "Build tools",
            photo: "https://i.imgur.com/1liZEdw.png",
            desc : "",
            report : ""
        },
        {
            id: "Testing",
            name: "Software Testing",
            category: "DevOps",
            photo: "https://i.imgur.com/YSuVYXz.png",
            desc : "Le test de logiciel est un processus qui évalue la fonctionnalité d'une application logicielle dans le but de déterminer si le logiciel développé répond ou non aux exigences spécifiées et d'identifier les défauts afin de garantir que le produit est exempt de défauts afin de produire un produit de qualité.",
            report : "https://docs.google.com/document/d/e/2PACX-1vT76uJLrbhL_lDFVNYSXMyClyZiYHHGoZahpydsPum21fPpyoMESJ5HcWBRS_0YqXkv9XPlSfzwSBvH/pub?embedded=true",
        },
        {
            id: "Ant",
            name: "Apache Ant",
            category: "Build tools",
            photo: "https://i.imgur.com/nmEAOPu.png",
            desc: "",
            report : ""
        },
        {
            id: "Gradle",
            name: "Apache Gradle",
            category: "Build tools",
            photo: "https://i.imgur.com/uepgbXI.png",
            desc : "",
            report : ""
        },
        {
            id: "WebServices", 
            name: "Web Services",
            category: "Methodologies",
            photo: "https://i.imgur.com/M36ZJqh.png",
            desc : "Il s'agit d'une technologie permettant à des applications de dialoguer à distance via Internet, et ceci indépendamment des plates-formes et des langages sur lesquelles elles reposent. Pour ce faire, les services Web s'appuient sur un ensemble de protocoles Internet très répandus (XML, HTTP), afin de communiquer. Cette communication est basée sur le principe de demandes et réponses, effectuées avec des messages XML.</p>",
            report : "https://docs.google.com/document/d/e/2PACX-1vTXqtx9AJddfNURx_kN5g--bzXQDibLEYSHac6yF0VvWbxnLTSyWg-s1o1Nm4BqdAdKQj0jIuuPhuow/pub?embedded=true"
        },
        {
            id: "DesignPatterns",
            name: "Design Patterns",
            category: "Methodologies",
            photo: "https://i.imgur.com/Decr6lz.png",
            desc : "",
            report : ""
        },
        {
            id: "Jetty",
            name: "Jetty",
            category: "Web / Application Servers",
            photo: "https://i.imgur.com/xjJd9Ya.png",
            desc : "",
            report : ""
        },
        {
            id: "Logging",
            name: "Logging Solutions",
            category: "DevOps",
            photo: "https://i.imgur.com/gFh5XDt.png",
            desc : "",
            report : ""
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
      
    function ContentTemplate(course) {
        return `
  
        <div class="Hidden ContentPage" id="${course.id}">
        <div class="Path">
        <a onclick="menu.show('Courses')">Courses</a>/
        <a class="PathActive" onclick="menu.show('${course.id}')">${course.name}</a>
    </div>
        <header id="CourseHeader">
            <img src="${course.photo}" width="200px" height="200px" style="float:left; margin-right:30px;" />
            <h2>${course.name}</h2>
            <p>${course.desc}</p>
            <button class="btn"><i class="fa fa-download"></i> Version Word</button>
            <div class="clear"></div>
        </header>

        <div class="Report">
            <iframe class="doc" src="${course.report}"></iframe>
        </div>
    </div>

	  `
    }
    
    document.getElementById("CoursesContent").innerHTML = `
	  ${coursesData.map(ContentTemplate).join('')}
      `
    
}
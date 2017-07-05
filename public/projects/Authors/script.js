(function(){
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('template');

    Array.prototype.slice.call(templates).forEach(function(tmpl) {
        Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
    });


    document.body.innerHTML = Handlebars.templates.authors ({
        "authors": [
            {
                "name": "Kahlil Gibran",
                "born": 1883,
                "died": 1931,
                "selectedWritings": [
                    "The Prophet",
                    "Sand and Foam",
                    "The Earth Gods"
                ],
                "quote": "We live only to discover beauty. All else is a form of waiting.",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/8/87/Khalil_Gibran.jpg"
            },
            {
                "name": "Oscar Wilde",
                "born": 1854,
                "died": 1900,
                "selectedWritings": [
                    "The Picture of Dorian Gray",
                    "The Importance of Being Earnest",
                    "De Profundis"
                ],
                "quote": "The bureaucracy is expanding to meet the needs of the expanding bureaucracy.",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Oscar_Wilde_Sarony.jpg/800px-Oscar_Wilde_Sarony.jpg"
            },
            {
                "name": "Franz Kafka",
                "born": 1883,
                "died": 1924,
                "selectedWritings": [
                    "The Trial",
                    "The Metamorphosis",
                    "The Castle"
                ],
                "quote": "There is an infinite amount of hope in the universe ... but not for us.",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Kafka1906_cropped.jpg"
            }
        ]
    });

})();

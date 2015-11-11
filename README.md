# linker

Lightweight javascript linker to register HTMLElements within to a javascript instance


## Install

`bower install linker --save`


## Current usage example


```javascript
    var registry = new Linker.Registry({
        "modal": function ($element, $children, $items) {
            console.log("modal instance", $element, $children, $items);
        }
    });

    registry.publish("list", function ($element, $children, $items) {
        console.log("list instance", $element, $children, $items);
    });

    registry.publish("child-item", function ($element, $children, $items) {
        console.log("child instance", $element, $children, $items);
    });


    window.addEventListener("DOMContentLoaded", function ($element, $children, $items) {
        var appContainer = document.getElementById("app");

        Linker.link(appContainer, "data-component", registry);
    });
```


```html
<body>

    <div id="app">

        <div data-component="modal"></div>

        <ul data-component="list">

            <li data-item="first" data-component="child-item">1</li>
            <li data-item="second" data-component="child-item">2</li>
            <li data-item="third" data-component="child-item">3</li>

        </ul>

    </div>

</body>
```

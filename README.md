# linker

A JS helper to register HTMLElements to an js instance


## Install

`bower install linker --save`


## Current usage example


```javascript
// init.js
var registry = new Linker.Registry({

    /**
     * Register an id to a constructor function. The given function will be
     * instantiated by `new registry["modal"]($element, $children, $items)
     * 
     * @param  {HTMLElement} $element   - DOM Node matching the selector in `linker.link`
     * @param  {Array} $children        - an array of js instances of direct children (based on selected node)
     * @param  {Object} $items          - Child DOM Nodes assigned to their `id` in attribute `data-item`
     */
    "modal": function ($element, $children, $items) {
        console.log("modal instance", $element, $children, $items);
    }
});

registry.add("list", function ($element, $children, $items) {
    // $element = <ul data-component="list">
    // $children = [instanceOf ChildConstructor]
    // $items = {"data-item-value": HTMLLIElement}
    //  i.e. $items.second = <li data-item="second" data-component="child-item">2</li>
    console.log("list instance", $element, $children, $items);
});

registry.add("child-item", function ChildConstructor($element, $children, $items) {
    console.log("child instance", $element, $children, $items);
});


window.addEventListener("DOMContentLoaded", function ($element, $children, $items) {
    var appContainer = document.getElementById("app");
    /**
     * From appContainer, link any node with an attribute `data-component` = "id".
     * 
     * Registry is an Object with a method `linkTask`. You could also asign
     * your custom registry, i.e. an dependency injector container:
     *
     * {
     *  linkTask: function (id, node) {
     *      var scope = injector.createChildScope();
     *      scope.register("$element", node.getElement());
     *      scope.register("$children", node.getChildren());
     *      scope.register("$items", node.getItems());
     *
     *      // must return the instance in order to support list of `$children`
     *      return scope.get(id);
     *  }
     * }
     */
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

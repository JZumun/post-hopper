# PostHopper
Javascript function for animated scrolling between elements in a web page using IntersectionObserver. Check out the [demo page](https://jzumun.github.io/post-hopper/demo/) for an example.

# Usage
`PostHopper` can be used both in node and in the browser.

Sample usage follows:
```javascript
  const hopperInstance = new PostHopper({
    container: "#scrollable-element", //optional selector string or element, defaults to window
    posts: ".element-selector", //selector string or array of elements
    onChangeActive: function(activeElement,previousActiveElement, hopperInstance) {
      //...
    }
  });

  /* INSTANCE PROPERTIES */
  hopperInstance.observer     // IntersectionObserver instance being used.
  hopperInstance.container    // undefined if window, otherwise is scrollable element from params
  hopperInstance.posts        // array of elements to jump between, based from params
  hopperInstance.active       // element in posts array currently in viewport
  hopperInstance.activeIndex  // index of active element in posts array
  hopperInstance.previous     // previous element in array if partially in viewport, otherwise is active element
  hopperInstance.next         // next element in array

  /* INSTANCE METHODS */
  hopperInstance.goToNext() // scrolls to next post
  hopperInstance.goToPrev() // scrolls to top of current post
                            //   or to previous post if previous post is partially in viewport.
  hopperInstance.destroy()  // disconnects IntersectionObserver instance and removes references to container and posts.
```

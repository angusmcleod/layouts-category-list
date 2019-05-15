import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import DiscourseURL from 'discourse/lib/url';

export default createWidget('layouts-category-list', {
  tagName: 'div.layouts-category-list.widget-container',
  buildKey: () => 'layouts-category-list',

  defaultState() {
    const categories = this.site.categories;
    let children = {};
    let parents = [];

    categories.forEach(function(c) {
      let parent = c.get('parentCategory');
      if (parent) {
        let siblings = children[parent.get('slug')] || []
        siblings.push(c);
        children[parent.get('slug')] = siblings;
      } else {
        parents.push(c);
      }
    });

    return {
      parents,
      children
    };
  },

  html(attrs, state) {
    const { category } = attrs;
    const { parents, children } = state;

    return h('ul.parents', parents.map(parent => {
      let contents = [];
      contents.push(
        this.attach('category-link', {
          category: parent
        })
      );
      if (category &&
          (category.slug == parent.slug ||
          (category.parentCategory && category.parentCategory.slug == parent.slug)) &&
          children[parent.slug]) {
        contents.push(
          h('ul.children',
            children[parent.slug].map(child => {
              return h('li',
                this.attach('category-link', {
                  category: child
                })
              );
            })
          )
        )
      }
      return h('li', contents);
    }));
  }
});

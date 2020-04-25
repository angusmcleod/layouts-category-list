# name: layouts-category-list
# about: A category list widget for use with Discourse Layouts
# version: 0.1
# authors: Angus McLeod

register_asset 'stylesheets/layouts-category-list.scss'

DiscourseEvent.on(:layouts_ready) do
  DiscourseLayouts::Widget.add('layouts-category-list',
    position: 'right',
    order: '1'
  )
end

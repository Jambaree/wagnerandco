# React Gravity Forms

## Supported Inputs

With the exception of multiple pages, all Standard Fields are supported. Advanced Fields are mostly planned, but would benefit more from 

In all cases, the inputs would benefit more from wrappers that allow you to hand them off to another React component: for example, it would make sense to let you chose your own date picker, and this library should only wrap the default browser input.

Post fields are not necessarily more complicated, but have the significant additional overhead of requiring WordPress user support on the front-end. Pricing is obviously also more complicated.

### Standard Fields

- [x] text
- [x] textarea
- [x] select
- [x] multiselect
- [x] number
- [x] checkbox
- [x] radio
- [x] hidden (basic support)
- [x] html
- [x] section
- [ ] page

### Advanced Fields

- [ ] name
- [ ] date
- [ ] time
- [ ] phone
- [ ] address
- [ ] website
- [x] email
- [ ] file upload
- [ ] captcha
- [ ] list

### Post Fields

- [ ] title
- [ ] body
- [ ] excerpt
- [ ] tags
- [ ] cateogry
- [ ] post image
- [ ] custom field

### Pricing Fields

- [ ] product
- [ ] quantity
- [ ] option
- [ ] shipping
- [ ] total

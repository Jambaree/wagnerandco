Adding an API User to WordPress for Gatsby

## Edit

Note as of March 2020, the latest version of the Gravity Forms plugin has the REST API component built in, which has its own API key system. So while it’s still necessary to do the rest for reading the initial data, the Gravity Forms user permissions, it’s possible to manage the GF permissions without the code aspects here.

---

0. Probably get everything working with Basic Auth for dev purposes
1. Install the Application Passwords plugin
1. Create an API User account
1. Write an API User plugin, or use an existing User Role Editor plugin and set their permissions, ex:

```php
'read' => true,
'read_private_posts' => true,
'read_private_pages' => true,
'edit_posts' => false,
'delete_posts' => false,
'gravityforms_edit_forms' => true
```

Mine has access to edit users so users can be read, but maybe that’s a bad idea. I also added access to edit Gravity Forms (as in the forms, not the entries) so that I can read the forms themselves when building the site, but not actually read the entries or do anything else with the data.

3. Generate an “Application Password” / token for that user
4. Add their token to the environment variables
5. TODO Change username and password for this token, not sure if that’s possible within Gatsby Source WordPress yet without modifications

6. Add another API User for submitting to forms only

This one should have reduced permissions, really only:

- gravityforms_edit_forms
- gravityforms_view_entries
- gravityforms_edit_entries
- gravityforms_delete_entries
- gravityforms_system_status

Experiment, maybe even some of these aren’t necessary for you.

7. Build your base64 key for that again (this is not more secure, it just turns it into one string and at least keeps it from being plain text in the code, the important part is what we’ve made the application password revokable).

```sh
# Note Application Password space at end
echo "api_user_username:ABC1 234 ASDF "
```

8. Pass its token to the front-end as `GATSBY_`, ex. `GATSBY_WP_KEY`
9. Use that in fetch rather than the current username and password

```js
let headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', `Basic ${process.env.GATSBY_WP_KEY}`)

fetch(`https://example.com/endpoint`, {
  method: 'POST',
  headers: headers,
  body: { msg: 'Hello' },
})
```

Ideally would also limit to certain domains.

## Further reading

- https://codex.wordpress.org/Roles_and_Capabilities
- https://ryanbenhase.com/giving-editors-access-to-gravity-forms/

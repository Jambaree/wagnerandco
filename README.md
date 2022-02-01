# Wagner & Co. frontend

## Getting started

```
# Install dependencies
npm install
```

Create your environment variables to login to WordPress:

```
# Rename the example .env file
cp .env.example .env.development
cp .env.example .env.production
```

Now, fill in the details with the WordPress API user account (not your own credentials).

To keep the environment variables as minimal as possible, the remainder of the WordPress config is handled conditionally in `gatsby-config.js`.

If you are developing everything locally, you could also remove the `auth` config in that file to disable Basic Auth, but that would also prevent you accessing certain parts of the WordPress REST API that you’ll likely need to build the site.

After starting the WordPress server…

```
# Run Gatsby in development mode, pulling from production data
npm start
```

## Using a local WordPress site as the backend

In this Gatsby site, the `WP_ENV` environment variable controls whether to pull data from the production site, or from the local WordPress site. It defaults to production. To switch it to your local WordPress site, start it in another Terminal tab:

```
cd ~/path-to-your-site/
wp server -p 8080
```

And then when starting the Gatsby site, set the `WP_ENV=development`:

```sh
WP_ENV=development npm start
```

## Build

```
npm run build
```

## Additional WordPress configuration

### Adding an API User to WordPress for Gatsby

1. Probably get everything working with Basic Auth for dev purposes
2. Install the Application Passwords plugin
3. Create an API User account
4. Write an API User plugin, or use an existing User Role Editor plugin and set their permissions, ex:
  ```php
  'read' => true,
  'read_private_posts' => true,
  'read_private_pages' => true,
  'edit_posts' => false,
  'delete_posts' => false,
  'gravityforms_edit_forms' => true
  ```
  Mine has access to edit users so users can be read, but maybe that’s a bad idea. I also added access to edit Gravity Forms (as in the forms, not the entries) so that I can read the forms themselves when building the site, but not actually read the entries or do anything else with the data.
4. Generate an “Application Password” / token for that user
5. Add their token to the environment variables
6. TODO Change username and password for this token, not sure if that’s possible within Gatsby Source WordPress yet without modifications
7. Add another API User for submitting to forms only. This one should have reduced permissions, really only:
  - `gravityforms_edit_forms`
  - `gravityforms_view_entries`
  - `gravityforms_edit_entries`
  - `gravityforms_delete_entries`
  - `gravityforms_system_status`
  Experiment, maybe even some of these aren’t necessary for you.
8. Build your base64 key for that again (this is not more secure, it just turns it into one string and at least keeps it from being plain text in the code, the important part is what we’ve made the application password revokable).
  ```sh
  # Note Application Password space at end
  echo "api_user_username:ABC1 234 ASDF "
  ```
9. Pass its token to the front-end as `GATSBY_`, ex. `GATSBY_WP_KEY`
10. Use that in fetch rather than the current username and password 
  ```js
  // This is just a demo, it has already been done in <GravityForm />
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

#### Further reading

  - https://codex.wordpress.org/Roles_and_Capabilities
  - https://ryanbenhase.com/giving-editors-access-to-gravity-forms/

## References

Portions of the configuration and approach to querying WordPress are based on [Gatsby Starter WordPress](https://github.com/ericwindmill/gatsby-starter-wordpress) by Ruben Harutyunyan, and available under the [MIT License](https://github.com/ericwindmill/gatsby-starter-wordpress/blob/master/LICENSE).

## License

Copyright © [Kenneth Ormandy Inc.](https://kennethormandy.com)

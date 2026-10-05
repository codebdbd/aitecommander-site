# Deployment

Aite Commander site builds to a fully static `dist/` directory.

## Staging

Current staging URL:

`https://4173842.xyz`

Build environment:

```
SITE_URL=https://4173842.xyz
DEPLOY_ENV=staging
GITHUB_REPO=codebdbd/aitecommander
```

In staging mode `robots.txt` blocks indexing.

GitHub Actions validates the project, builds the static site, checks internal links and uploads the complete `dist/` directory as the `aitecommander-site-staging` artifact.

The artifact can be deployed to any static host without changing application code.

## Production

For production set:

```
SITE_URL=https://<permanent-domain>
DEPLOY_ENV=production
GITHUB_REPO=codebdbd/aitecommander
```

Production mode allows indexing and publishes the configured sitemap URL.

Do not switch `DEPLOY_ENV` to `production` until the permanent domain, legal text and production hosting are approved.

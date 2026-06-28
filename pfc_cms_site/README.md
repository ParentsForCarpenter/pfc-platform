# Parents for Carpenter Editable Website

This is a no-build static website with an admin editor using Netlify + Decap CMS.

## What can be edited without code
- Page titles
- Hero text
- Body text
- Buttons and links
- Photos
- Cards/links
- Footer image/message
- Logo
- Email, address, EIN, Member Portal link

## Deploy in Netlify
1. Create a free GitHub account or use an existing one.
2. Create a new GitHub repository named `parents-for-carpenter-website`.
3. Upload all files in this folder to the repository.
4. Go to Netlify and choose **Add new site → Import an existing project**.
5. Connect GitHub and select the repository.
6. Build settings:
   - Build command: leave blank
   - Publish directory: `.`
7. Deploy.

## Enable the editor
1. In Netlify, open the site.
2. Go to **Identity** and click **Enable Identity**.
3. Under Identity settings, enable **Git Gateway**.
4. Invite yourself as a user.
5. Visit `https://your-site.netlify.app/admin`.
6. Log in and edit pages.

## Connect your domain
In Netlify, go to Domain settings and add `parentsforcarpenter.org`.
Netlify will give DNS records. Add those records wherever the domain DNS is managed.

## Photo size guide
- Hero/banner photos: 2400 x 1350 px recommended; minimum 1600 x 900.
- Program cards: 1200 x 900 px recommended.
- People photos: 800 x 800 px square.
- Sponsor logos: PNG or SVG with transparent background.

## Future layout changes
Ask ChatGPT:
"Please update the Parents for Carpenter static Netlify/Decap CMS website. Change the layout of [page] so that [describe layout]. Keep all content editable in the admin panel and return an updated ZIP."

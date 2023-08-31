# Mekhi's Blog build by Astro

> [!WARNING]
> Just upgraded to astro3.x, use it with caution.

This repository hosts the source code for a personal blog system built using Astro. The system leverages GitHub workflows to automate the build process and utilizes GitHub Pages for deployment. Blog articles are managed in separate repositories and synchronized using Git submodules. Whenever new commits are made to the blog article repository, it triggers an automatic build and deployment process for this repository.

Features:

Astro-Powered Blogging: This system is built on top of the Astro framework, allowing for efficient rendering and delivery of blog content.

Automated Build and Deployment: GitHub Actions workflows have been set up to automatically trigger the build process whenever changes are pushed to this repository. The generated output is then deployed using GitHub Pages.

Git Submodule Integration: The blog articles themselves reside in separate repositories, which are linked to this main repository as submodules. This ensures that article updates trigger the build process here.

Easy Customization: The codebase is designed to be customizable, enabling you to tailor the look and feel of your blog to your preferences.

Responsive Design: The blog system is designed with responsiveness in mind, ensuring optimal viewing experiences across various devices and screen sizes.

**Features**:
- **Astro-Powered Blogging**: This system is built on top of the Astro framework, allowing for efficient rendering and delivery of blog content.
- **Automated Build and Deployment**: GitHub Actions workflows have been set up to automatically trigger the build process whenever changes are pushed to this repository. The generated output is then deployed using GitHub Pages.
- **Git Submodule Integration**: The blog articles themselves reside in separate repositories, which are linked to this main repository as submodules. This ensures that article updates trigger the build process here.
- **Easy Customization**: The codebase is designed to be customizable, enabling you to tailor the look and feel of your blog to your preferences.
- **Responsive Design**: The blog system is designed with responsiveness in mind, ensuring optimal viewing experiences across various devices and screen sizes.

**Automated Build and Deployment**:
> GitHub Actions workflows are set up to automatically build and deploy the blog system whenever changes are detected in the main repository or in the linked submodule repository. The deployment target is GitHub Pages, configured to serve content from the main branch.

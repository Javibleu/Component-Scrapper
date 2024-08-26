# Web Component Builder Automation

## Description

This project automates the process of purging unused CSS and copying HTML files to an output directory. It can be use to isolate web components with the local css to be used to compose web pages on on Astro, Angular etc.
It uses [PurgeCSS](https://purgecss.com/) along with [PostCSS](https://postcss.org/) to remove unused CSS and [glob](https://www.npmjs.com/package/glob) to match files.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Javibleu/Component-Scrapper
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run the process:
    ```sh
    npm run dev
    ```

## Folders

Copy the files on input folder, the optimized code will be in dist folder


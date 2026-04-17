# USAREUR-AF ODT Development Process Documentation

This repository contains the interactive documentation and implementation guides for the USAREUR-AF Operational Data Team (ODT) Development Process, utilizing Scaled Agile Framework (SAFe) practices.

## Project Structure
- `docs/`
  - `index.html`: The main dashboard containing the process pipeline, organizational chart, meeting formats, and implementation guide.
  - `capability_lifecycle_process.html`: A high-level visual workflow of the Capability Lifecycle process.
  - `styles.css` / `main.js`: Extracted presentation and logic files for easier maintenance.
  - `assets/`: Contains graphics and presentations associated with the documentation.
- `app.yaml`: Google App Engine deployment configuration.

## Local Development
To run this documentation locally, serve the project files using a local web server (since it's a static site). From the root directory:

**Using Python:**
```bash
python -m http.server
```
Then open `http://localhost:8000/docs/index.html` in your browser.

**Using Node.js/npx:**
```bash
npx serve
```
Then navigate to `http://localhost:3000/docs/index.html`.

## Deployment
This project is configured to deploy to **Google App Engine**.

### Manual Deployment
If you are authenticated via Google Cloud CLI:
```bash
gcloud app deploy --quiet
```

### Automated CI/CD
A GitHub Actions workflow is located at `.github/workflows/deploy.yml`. 
To activate automated deployments on push to `main`, you must uncomment the authentication configuration inside the `deploy.yml` file and set up a Google Cloud Service Account with either **Workload Identity Federation** or a **Credentials JSON** secret in your GitHub Repository settings.

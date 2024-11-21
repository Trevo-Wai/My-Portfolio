# Cypress Installation Guide

This guide outlines the steps to install and set up Cypress, a modern end-to-end testing framework, for your project.

---

## Prerequisites

 **Node.js**: Ensure that Node.js (version 12 or higher) is installed on your system. Download and install it from [Node.js Official Website](https://nodejs.org/).
 
 **Install VS code** (https://code.visualstudio.com/download)

---

## Installation Steps

### 1. Create a New Project (If Needed) 
-If you don’t have an existing project, create one:
-If you have Cypress skip below step and paste cy.js files to your test folder.

### 2. Install Cypress in your created folder
-Open VS Code and route to your folder and open terminal and paste the below command.
```bash
npm install cypress --save-dev
```
### 3. Open Cypress for the First Time
```bash
npx cypress open
```
-This will install necessary Cypress binaries.
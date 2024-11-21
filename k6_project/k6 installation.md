# How to Install and Run k6 on Windows

Follow these steps to install and set up k6, then execute your scripts in VS Code.

## 1. Download k6
Download the latest k6 MSI installer from the following link:  
[Download k6 MSI](https://dl.k6.io/msi/k6-latest-amd64.msi)

## 2. Install k6
Run the downloaded `.msi` file and follow the on-screen instructions to install k6.

## 3. Verify Installation
1. Open **Command Prompt** (CMD).
2. Type the following command to verify k6 is installed:
   ```bash
   k6.exe

## 4. Configure VS Code to Run k6
1. Open VS Code
2. In the Terminal paste the following command to add k6 to your environment path
   ```bash
   $env:PATH += ";C:\Program Files\k6"

3. To run k6 file....
   ```bash
   k6 run example.js
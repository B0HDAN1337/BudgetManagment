# 💰 BudgetManagment

## Built with the tools and technologies:

![NuGet](https://img.shields.io/badge/NuGet-004880.svg?style=flat&logo=NuGet&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399.svg?style=flat&logo=CSS&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26.svg?style=flat&logo=HTML5&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031.svg?style=flat&logo=Angular&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120.svg?style=flat&logo=c-sharp&logoColor=white)
![ASP.NET MVC](https://img.shields.io/badge/ASP.NET_MVC-5C2D91.svg?style=flat&logo=dotnet&logoColor=white)


## Overview

**BudgetManagment** is a personal finance management application that allows users to manage multiple wallets, track income and expenses, convert currencies, and visualize financial data.  
Frontend is built with **Angular**, backend with **ASP.NET Core Web API**.

## 🚀 Features

- **User Management**
  - Register and login users
  - Each user has wallets and transactions linked automatically
  - Update user information
- **Wallet Management**
  - Add, edit, delete wallets
  - Assign currency to wallets
  - Automatic currency conversion between wallets
- **Transactions**
  - Full CRUD (Create, Read, Update, Delete) operations
  - Filter by date, category or currency
  - Pagination for transaction listss
- **Analytics**
  - Charts for spending by category, wallet, or date
  - Reports and summaries for selected periods


## 🛠️ Technology Stack

- **Frontend:** Angular, TypeScript  
- **Backend:** ASP.NET Core Web API, C#  
- **Database:** SQLite 
- **ORM:** Entity Framework Core  
- **Authentication:** JWT  
- **Charts:** Chart.js / ngx-charts  


## 📦 Installation

### Clone the repository:
```sh
    git clone https://github.com/B0HDAN1337/BudgetManagment.git
```

---

### Running Backend (ASP.NET Core Web API)

1. **Navigate to the project directory:**
   ```bash
   cd BudgetManagement-server
   ```

2. **Install the dependencies:**
   ```bash
   dotnet restore
   ```

3. **Run the project with:**

   ```bash
   dotnet run
   ```
Swagger UI will be available at: https://localhost:5142/swagger

---

### Frontend (Angular)

1. **Open a second terminal and navigate to the frontend folder:**

    ```bash
    cd BudgetManagment-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the Angular application:**

    ```bash
    ng serve
    ```
    
The frontend will be available at: http://localhost:4200

---


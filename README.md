# 🚀 The Updated $SHOOP Shop Website

Welcome to the **$SHOOP Shop**! Our mission is to build a fun, engaging, and interactive community around the $SHOOP token. Whether you’re here to buy $SHOOP, connect with other $SHOOPers, or explore our Roadmap, we’ve got everything in one place. Here’s what’s next for the site:

---

## 🎯 Next Steps

### 🛒 **Integrate Pump.fun iframe or Purchase Link**

- **Objective**: Let users easily purchase $SHOOP via pump.fun or directly through the website.
- **Implementation**:
  - **Purchase Button**: Add a "Buy $SHOOP" button linking to pump.fun.
  - **Exploration**: If iframe integration is tricky, fallback to a clean, styled link.

---

### 💬 **Focus on Community Engagement**

- **Objective**: Strengthen community involvement, retain members, and drive more buyers.
- **Implementation**:
  - Find key **whales** and **connectors** in our community and provide incentives.
  - Set up tools for community-driven growth, like **meeting schedulers** and **referral systems**.

---

### 🔗 **Update Website Name and Favicon**

- **Objective**: Rebrand to "**The $SHOOP Shop**" and add a custom favicon for better recognition.
- **Implementation**:
  - Change the website title and update branding across all pages.
  - Add a favicon representing the $SHOOP meme or a rocket icon.

---

### 📊 **Develop Dynamic Feeds & Animations**

- **Objective**: Create cool-looking, dynamic elements that showcase live $SHOOP activity.
- **Implementation**:
  - **Scrolling Ticker**: Show the latest 100 $SHOOP buys in a scrolling ticker at the bottom of the site.
  - **Top 10 Holders**: Display the top holders with $SHOOP amounts, % of supply, and USD value.

---

### ✉️ **Enhance the Contact Page**

- **Objective**: Allow users to reach out via a functional contact form.
- **Implementation**:
  - Use **Formspree**, **GHL**, or backend integration to handle form submissions and notifications.

---

### 📅 **Create and Display a Roadmap**

- **Objective**: Showcase the future goals and milestones of the $SHOOP project.
- **Implementation**:
  - **Roadmap Design**: Create a visually appealing roadmap with retro/arcade themes.
  - Display it prominently on a dedicated page or section.

---

### 🚀 **Deploy to Netlify or Vercel**

- **Objective**: Get the site live by deploying it via Netlify or Vercel.
- **Steps**:
  - Connect GitHub repository to the deployment platform.
  - Connect custom domain for accessibility.
  - Ensure security by setting up SSL certificates.

---

## 🛠️ **QuickNode RPC Methods for Solana**

- **getSignaturesForAddress**: Fetches recent transaction signatures for a specific address.
- **getParsedTransaction**: Provides parsed transaction details, helpful for human-readable transaction data.
- **getTokenLargestAccounts**: Displays the largest token holders.
- **getTokenSupply**: Shows the total supply of a given token.
  
### Sample Call to Fetch Recent Purchases

```javascript
const recentPurchases = await connection.getParsedTransaction('signature', { maxSupportedTransactionVersion: 0 });


## General RPC Methods

- `getAccountInfo`
- `getBalance`
- `getBlock`
- `getSignaturesForAddress`
- `getTransaction`
- `getParsedTransaction`
- `getTokenLargestAccounts`
- `getTokenSupply`

### Method Descriptions

**`getSignaturesForAddress`**: Fetches a list of signatures from confirmed transactions for a given address.

- Parameters: Address (PublicKey), options such as `limit`, `before`, `until`.
- Useful for pulling a batch of recent transactions.

**`getParsedTransaction`**: Returns the transaction details in a parsed JSON format.

- Parameters: Transaction signature (Base-58 encoded), options such as `commitment` level and `maxSupportedTransactionVersion`.
- Useful for pulling detailed information on a transaction, such as token transfers.

**`getTransaction`**: Returns raw transaction details (less human-readable, but more information).

See the Solana RPC documentation for more details.

### $SHOOP-Specific Instructions

To fetch transactions involving $SHOOP tokens, we’ll focus on `getSignaturesForAddress` and `getParsedTransaction` methods, filtering the instructions for those involving the $SHOOP token mint address.

Example call:

```javascript

const recentPurchases = await connection.getParsedTransaction('signature', { maxSupportedTransactionVersion: 0 });

```

### What's Next?

Keep checking this README for updates and future Roadmap details. Stay connected, stay $SHOOPtified.

TG = [@ShoopDaWhoopSol](https://t.me/ShoopDaWhoopSol)

- as in: Telegram = [https://t.me/ShoopDaWhoopSol](https://t.me/ShoopDaWhoopSol)

Dev is doxxed, TG and X, and growing Community. Check it out for yourself. I did after getting rugged (again)… prob from one of those dudes that went to—— [pump.fun/$shoop](https://pump.fun/3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump)

- ca: 3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump

## 📁 Project Structure

/root: 'shoop-react-website'
    /node_modules
    /public
    /quicknode-tests
        /node_modules
        getParsedTransactions.js
        getTransactions.js
        index.js
        package-lock.json
        package.json
    /scripts
        /quicknode-scripts
            getParsedTransactions.js
        
    /src
        /components
            Layout.js
            ScrollingTicker.js
            ScrollingTicker.css
            ShoopDashboard.js
        /pages 
            About.js
            Contact.js
            DApp.js
            FAQ.js
            Home.js
App.css
App.js
App.test.js
index.css
index.js
logo.svg
Navbar.js
reportWebVitals.js
setupTests.js
solanaUtils.js
    /test-alchemy
        /node_modules
    index.js
    package-lock.json
    package.json
.gitignore
config-overrides.js
LICENSE
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
